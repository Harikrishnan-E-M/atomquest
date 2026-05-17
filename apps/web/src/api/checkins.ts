import { apiClient } from './client';
import type { CheckInFormInput } from '@atomquest/shared/schemas/checkin';

export type CheckInRecord = CheckInFormInput & {
  _id: string;
  employeeId: string;
  progress: number;
};

export async function fetchCheckIns() {
  const response = await apiClient.get<{ data: CheckInRecord[] }>('/checkins');
  return response.data.data;
}

export async function createCheckInRequest(payload: CheckInFormInput) {
  const response = await apiClient.post<{ data: CheckInRecord }>('/checkins', payload);
  return response.data.data;
}
