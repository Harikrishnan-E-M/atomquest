import type { Request, Response } from 'express';
import { goalFormSchema } from '@atomquest/shared/schemas/goal';
import { GoalModel } from '../models/Goal.model';
import { logAuditAction } from '../services/audit.service';
import { createNotification } from '../services/notification.service';

function getEmployeeId(req: Request) {
  return req.auth?.userId;
}

export async function listGoals(req: Request, res: Response) {
  const employeeId = getEmployeeId(req);
  if (!employeeId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const goals = await GoalModel.find({ employeeId }).sort({ createdAt: -1 }).lean();
  return res.json({ data: goals });
}

export async function createGoal(req: Request, res: Response) {
  const employeeId = getEmployeeId(req);
  if (!employeeId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const parsed = goalFormSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid goal payload', issues: parsed.error.flatten() });
  }

  const goalCount = await GoalModel.countDocuments({ employeeId });
  if (goalCount >= 8) {
    return res.status(400).json({ message: 'Maximum 8 goals allowed per employee' });
  }

  const totalWeightage = await GoalModel.aggregate([
    { $match: { employeeId: req.auth?.userId } },
    { $group: { _id: null, total: { $sum: '$weightage' } } },
  ]);
  const currentTotal = totalWeightage[0]?.total ?? 0;
  if (currentTotal + parsed.data.weightage > 100) {
    return res.status(400).json({ message: 'Total weightage cannot exceed 100%' });
  }

  const goal = await GoalModel.create({
    employeeId,
    ...parsed.data,
    status: 'draft',
    locked: false,
    submitted: false,
  });

  await logAuditAction({
    userId: employeeId,
    action: 'Created Goal',
    entityType: 'Goal',
    entityId: String(goal._id),
    afterData: goal,
  });

  return res.status(201).json({ message: 'Goal created', data: goal });
}

export async function updateGoal(req: Request, res: Response) {
  const employeeId = getEmployeeId(req);
  if (!employeeId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const goal = await GoalModel.findOne({ _id: req.params.goalId, employeeId });
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  if (goal.locked || goal.submitted) {
    return res.status(400).json({ message: 'Goal is locked and cannot be edited' });
  }

  const parsed = goalFormSchema.partial().safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid goal payload', issues: parsed.error.flatten() });
  }

  const beforeData = goal.toObject();

  Object.assign(goal, parsed.data);
  await goal.save();

  await logAuditAction({
    userId: employeeId,
    action: 'Updated Goal',
    entityType: 'Goal',
    entityId: String(goal._id),
    beforeData,
    afterData: goal,
  });

  return res.json({ message: 'Goal updated', data: goal });
}

export async function submitGoal(req: Request, res: Response) {
  const employeeId = getEmployeeId(req);
  if (!employeeId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const goal = await GoalModel.findOne({ _id: req.params.goalId, employeeId });
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  if (goal.locked) {
    return res.status(400).json({ message: 'Goal is already locked' });
  }

  goal.status = 'submitted';
  goal.submitted = true;
  await goal.save();

  await logAuditAction({
    userId: employeeId,
    action: 'Submitted Goal',
    entityType: 'Goal',
    entityId: String(goal._id),
    afterData: goal,
  });

  await createNotification({
    userId: employeeId,
    title: 'Goal submitted',
    message: `Your goal "${goal.title}" was submitted successfully.`,
  });

  return res.json({ message: 'Goal submitted', data: goal });
}
