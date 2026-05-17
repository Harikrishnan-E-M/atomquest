import type { Request, Response } from 'express';
import { NotificationModel } from '../models/Notification.model';

export async function listNotifications(req: Request, res: Response) {
  const userId = req.auth?.userId;
  if (!userId) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  const notifications = await NotificationModel.find({ userId }).sort({ createdAt: -1 }).lean();
  return res.json({ data: notifications });
}
