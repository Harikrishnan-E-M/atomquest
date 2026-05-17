import { apiClient } from './client';
import type { GoalRecord } from './goals';

export async function fetchReviewGoals() {
  const response = await apiClient.get<{ data: GoalRecord[] }>('/manager/goals');
  return response.data.data;
}

export async function approveGoalRequest(goalId: string, managerComment?: string) {
  const response = await apiClient.post<{ data: GoalRecord }>(`/manager/goals/${goalId}/approve`, {
    managerComment,
  });
  return response.data.data;
}

export async function rejectGoalRequest(goalId: string, managerComment?: string) {
  const response = await apiClient.post<{ data: GoalRecord }>(`/manager/goals/${goalId}/reject`, {
    managerComment,
  });
  return response.data.data;
}
