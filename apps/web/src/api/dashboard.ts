import { apiClient } from './client';

export type DashboardPayload = {
  summary: Record<string, number>;
  series: Array<{ name: string; value: number }>;
};

export async function fetchDashboard(role: 'employee' | 'manager' | 'admin') {
  const response = await apiClient.get<DashboardPayload>(`/dashboard/${role}`);
  return response.data;
}
