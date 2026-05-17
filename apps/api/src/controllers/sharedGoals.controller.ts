import type { Request, Response } from 'express';
import { sharedGoalSchema } from '@atomquest/shared/schemas/sharedGoal';
import { GoalModel } from '../models/Goal.model';
import { SharedGoalModel } from '../models/SharedGoal.model';
import { logAuditAction } from '../services/audit.service';

export async function listSharedGoals(req: Request, res: Response) {
  const sharedGoals = await SharedGoalModel.find().sort({ createdAt: -1 }).lean();
  return res.json({ data: sharedGoals });
}

export async function createSharedGoal(req: Request, res: Response) {
  const primaryOwner = req.auth?.userId;
  if (!primaryOwner) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const parsed = sharedGoalSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid shared goal payload', issues: parsed.error.flatten() });
  }

  const goal = await GoalModel.create({
    employeeId: primaryOwner,
    title: parsed.data.title,
    description: 'Shared goal seeded from department KPI',
    thrustArea: 'Shared KPI',
    uomType: 'number',
    target: parsed.data.target,
    weightage: parsed.data.weightage,
    deadline: new Date(),
    status: 'draft',
    locked: false,
    submitted: false,
    quarterData: [],
  });

  const sharedGoal = await SharedGoalModel.create({
    primaryOwner,
    goalId: goal._id,
    title: parsed.data.title,
    target: parsed.data.target,
    weightage: parsed.data.weightage,
    linkedEmployees: parsed.data.linkedEmployees,
    syncEnabled: parsed.data.syncEnabled,
  });

  await logAuditAction({
    userId: primaryOwner,
    action: 'Created Shared Goal',
    entityType: 'SharedGoal',
    entityId: String(sharedGoal._id),
    afterData: sharedGoal,
  });

  return res.status(201).json({ message: 'Shared goal created', data: sharedGoal });
}

export async function syncSharedGoal(req: Request, res: Response) {
  const sharedGoal = await SharedGoalModel.findById(req.params.sharedGoalId);
  if (!sharedGoal) {
    return res.status(404).json({ message: 'Shared goal not found' });
  }

  const { target, weightage } = req.body as { target?: unknown; weightage?: number };
  if (target !== undefined) {
    sharedGoal.target = target;
  }
  if (typeof weightage === 'number') {
    sharedGoal.weightage = weightage;
  }

  await sharedGoal.save();
  await logAuditAction({
    userId: req.auth?.userId ?? 'unknown',
    action: 'Synced Shared Goal',
    entityType: 'SharedGoal',
    entityId: String(sharedGoal._id),
    afterData: sharedGoal,
  });
  return res.json({ message: 'Shared goal synced', data: sharedGoal });
}
