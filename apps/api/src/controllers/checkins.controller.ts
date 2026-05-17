import type { Request, Response } from 'express';
import { checkinFormSchema } from '@atomquest/shared/schemas/checkin';
import { GoalModel } from '../models/Goal.model';
import { CheckInModel } from '../models/CheckIn.model';
import { calculateProgress } from '../services/progress.service';

const quarterWindowMonths: Record<string, number[]> = {
  'goal-setting': [4],
  q1: [6],
  q2: [9],
  q3: [0],
  q4: [2, 3],
};

function isQuarterWindowOpen(quarter: string) {
  const allowedMonths = quarterWindowMonths[quarter] ?? [];
  return allowedMonths.includes(new Date().getMonth());
}

export async function listCheckIns(req: Request, res: Response) {
  const employeeId = req.auth?.userId;
  if (!employeeId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const checkIns = await CheckInModel.find({ employeeId }).sort({ updatedAt: -1 }).lean();
  return res.json({ data: checkIns });
}

export async function createCheckIn(req: Request, res: Response) {
  const employeeId = req.auth?.userId;
  if (!employeeId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const parsed = checkinFormSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ message: 'Invalid check-in payload', issues: parsed.error.flatten() });
  }

  if (!isQuarterWindowOpen(parsed.data.quarter)) {
    return res.status(400).json({ message: 'Check-in submissions are closed for this window' });
  }

  const goal = await GoalModel.findOne({ _id: parsed.data.goalId, employeeId });
  if (!goal) {
    return res.status(404).json({ message: 'Goal not found' });
  }

  const progress = calculateProgress('higher-better', parsed.data.achievement, Number(goal.target));

  const checkIn = await CheckInModel.findOneAndUpdate(
    { goalId: parsed.data.goalId, employeeId, quarter: parsed.data.quarter },
    {
      goalId: parsed.data.goalId,
      employeeId,
      quarter: parsed.data.quarter,
      achievement: parsed.data.achievement,
      progress,
      comment: parsed.data.comment ?? '',
      status: parsed.data.status,
    },
    { upsert: true, new: true },
  );

  return res.status(201).json({ message: 'Check-in saved', data: checkIn });
}
