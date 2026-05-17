import { AuditLogModel } from '../models/AuditLog.model.js';

export async function logAuditAction(input: {
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  beforeData?: unknown;
  afterData?: unknown;
}) {
  await AuditLogModel.create({
    userId: input.userId,
    action: input.action,
    entityType: input.entityType,
    entityId: input.entityId,
    beforeData: input.beforeData ?? null,
    afterData: input.afterData ?? null,
    timestamp: new Date(),
  });
}
