import { NotificationModel } from '../models/Notification.model';

export async function createNotification(input: {
  userId: string;
  title: string;
  message: string;
}) {
  await NotificationModel.create({
    userId: input.userId,
    title: input.title,
    message: input.message,
    read: false,
  });
}
