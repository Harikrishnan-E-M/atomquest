import type { Request, Response } from 'express';
import { GoalModel } from '../models/Goal.model';
import { CheckInModel } from '../models/CheckIn.model';

async function buildEmployeeDashboard(userId: string) {
  const goals = await GoalModel.find({ employeeId: userId }).lean();
  const checkIns = await CheckInModel.find({ employeeId: userId }).lean();
  const completedGoals = goals.filter((goal) => goal.status === 'approved').length;

  return {
    summary: {
      goalCount: goals.length,
      completedGoals,
      checkInCount: checkIns.length,
      completionRate: goals.length === 0 ? 0 : Math.round((completedGoals / goals.length) * 100),
    },
    series: [
      { name: 'Goals', value: goals.length },
      { name: 'Check-ins', value: checkIns.length },
      { name: 'Approved', value: completedGoals },
    ],
  };
}

async function buildManagerDashboard() {
  const pendingApprovals = await GoalModel.countDocuments({ status: 'submitted' });
  const approvedGoals = await GoalModel.countDocuments({ status: 'approved' });
  const rejectedGoals = await GoalModel.countDocuments({ status: 'rejected' });

  return {
    summary: {
      pendingApprovals,
      approvedGoals,
      rejectedGoals,
      teamHealth: pendingApprovals === 0 ? 100 : 75,
    },
    series: [
      { name: 'Pending', value: pendingApprovals },
      { name: 'Approved', value: approvedGoals },
      { name: 'Rejected', value: rejectedGoals },
    ],
  };
}

async function buildAdminDashboard() {
  const totalGoals = await GoalModel.countDocuments();
  const totalCheckIns = await CheckInModel.countDocuments();
  const totalApproved = await GoalModel.countDocuments({ status: 'approved' });

  return {
    summary: {
      totalGoals,
      totalCheckIns,
      totalApproved,
      escalationCount: totalGoals - totalApproved,
    },
    series: [
      { name: 'Goals', value: totalGoals },
      { name: 'Check-ins', value: totalCheckIns },
      { name: 'Approved', value: totalApproved },
    ],
  };
}

export async function employeeDashboard(req: Request, res: Response) {
  const userId = req.auth?.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  return res.json(await buildEmployeeDashboard(userId));
}

export async function managerDashboard(_req: Request, res: Response) {
  return res.json(await buildManagerDashboard());
}

export async function adminDashboard(_req: Request, res: Response) {
  return res.json(await buildAdminDashboard());
}
