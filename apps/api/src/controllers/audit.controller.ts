import type { Request, Response } from 'express';
import { AuditLogModel } from '../models/AuditLog.model.js';

export async function listAuditLogs(_req: Request, res: Response) {
  const logs = await AuditLogModel.find().sort({ timestamp: -1 }).limit(100).lean();
  return res.json({ data: logs });
}
