import { apiClient } from './client';

export type NotificationRecord = {
  _id: string;
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
};

export async function fetchNotifications() {
  const response = await apiClient.get<{ data: NotificationRecord[] }>('/notifications');
  return response.data.data;
}
