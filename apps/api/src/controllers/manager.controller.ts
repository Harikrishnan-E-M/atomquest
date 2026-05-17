import type { Request, Response } from 'express';
import { Types } from 'mongoose';
import { GoalModel } from '../models/Goal.model';
import { logAuditAction } from '../services/audit.service';
import { createNotification } from '../services/notification.service';

export async function listReviewGoals(req: Request, res: Response) {
  const status = typeof req.query.status === 'string' ? req.query.status : 'submitted';
  const goals = await GoalModel.find({ status }).sort({ updatedAt: -1 }).lean();
  return res.json({ data: goals });
}

export async function updateReviewGoal(req: Request, res: Response) {
  const goal = await GoalModel.findById(req.params.goalId);
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  const beforeData = goal.toObject();

  const { target, weightage, managerComment } = req.body as {
    target?: unknown;
    weightage?: number;
    managerComment?: string;
  };

  if (target !== undefined) {
    goal.target = target;
  }

  if (typeof weightage === 'number') {
    goal.weightage = weightage;
  }

  if (typeof managerComment === 'string') {
    goal.managerComment = managerComment;
  }

  await goal.save();
  await logAuditAction({
    userId: req.auth?.userId ?? 'unknown',
    action: 'Updated Goal Review',
    entityType: 'Goal',
    entityId: String(goal._id),
    beforeData,
    afterData: goal,
  });
  return res.json({ message: 'Goal review updated', data: goal });
}

export async function approveGoal(req: Request, res: Response) {
  const goal = await GoalModel.findById(req.params.goalId);
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  goal.status = 'approved';
  goal.locked = true;
  goal.submitted = true;
  goal.approvedBy = req.auth?.userId ? new Types.ObjectId(req.auth.userId) : null;
  if (typeof req.body?.managerComment === 'string') {
    goal.managerComment = req.body.managerComment;
  }
  await goal.save();
  await logAuditAction({
    userId: req.auth?.userId ?? 'unknown',
    action: 'Approved Goal',
    entityType: 'Goal',
    entityId: String(goal._id),
    afterData: goal,
  });

  await createNotification({
    userId: String(goal.employeeId),
    title: 'Goal approved',
    message: `Your goal "${goal.title}" has been approved.`,
  });

  return res.json({ message: 'Goal approved', data: goal });
}

export async function rejectGoal(req: Request, res: Response) {
  const goal = await GoalModel.findById(req.params.goalId);
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  goal.status = 'rejected';
  goal.locked = true;
  goal.submitted = true;
  goal.approvedBy = req.auth?.userId ? new Types.ObjectId(req.auth.userId) : null;
  if (typeof req.body?.managerComment === 'string') {
    goal.managerComment = req.body.managerComment;
  }
  await goal.save();
  await logAuditAction({
    userId: req.auth?.userId ?? 'unknown',
    action: 'Rejected Goal',
    entityType: 'Goal',
    entityId: String(goal._id),
    afterData: goal,
  });

  await createNotification({
    userId: String(goal.employeeId),
    title: 'Goal rejected',
    message: `Your goal "${goal.title}" has been rejected.`,
  });

  return res.json({ message: 'Goal rejected', data: goal });
}
