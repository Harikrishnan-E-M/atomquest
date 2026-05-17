import { apiClient } from './client';

export type AuditLogRecord = {
  _id: string;
  userId: string;
  action: string;
  entityType: string;
  entityId: string;
  timestamp: string;
};

export async function fetchAuditLogs() {
  const response = await apiClient.get<{ data: AuditLogRecord[] }>('/audit-logs');
  return response.data.data;
}
