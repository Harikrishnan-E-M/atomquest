import { apiClient, apiBaseUrl } from './client';

export type ReportRow = {
  goalId: string;
  title: string;
  status: string;
  weightage: number;
  checkIns: number;
  progress: number;
};

export async function fetchPlannedVsActualReport() {
  const response = await apiClient.get<{ data: ReportRow[] }>('/reports/planned-vs-actual');
  return response.data.data;
}

export function downloadCsvReport() {
  window.location.href = `${apiBaseUrl}/reports/export/csv`;
}

export function downloadExcelReport() {
  window.location.href = `${apiBaseUrl}/reports/export/excel`;
}
