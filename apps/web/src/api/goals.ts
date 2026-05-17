import { apiClient } from './client';
import type { GoalFormInput } from '@atomquest/shared/schemas/goal';

export type GoalRecord = GoalFormInput & {
  _id: string;
  employeeId: string;
  status: 'draft' | 'submitted' | 'approved' | 'rejected' | 'locked';
  locked: boolean;
  submitted: boolean;
};

export async function fetchGoals() {
  const response = await apiClient.get<{ data: GoalRecord[] }>('/goals');
  return response.data.data;
}

export async function createGoalRequest(payload: GoalFormInput) {
  const response = await apiClient.post<{ data: GoalRecord }>('/goals', payload);
  return response.data.data;
}
