import { apiClient } from './client';
import type { SharedGoalInput } from '@atomquest/shared/schemas/sharedGoal';

export type SharedGoalRecord = SharedGoalInput & {
  _id: string;
  goalId: string;
  primaryOwner: string;
};

export async function fetchSharedGoals() {
  const response = await apiClient.get<{ data: SharedGoalRecord[] }>('/shared-goals');
  return response.data.data;
}

export async function createSharedGoalRequest(payload: SharedGoalInput) {
  const response = await apiClient.post<{ data: SharedGoalRecord }>('/shared-goals', payload);
  return response.data.data;
}
