import cron from 'node-cron';
import { UserModel } from '../models/User.model.js';
import { createNotification } from '../services/notification.service.js';

const reminderMonths = new Set([4, 6, 9, 0, 2, 3]);

export function scheduleQuarterlyReminderJob() {
  cron.schedule('0 9 1 * *', async () => {
    const now = new Date();
    if (!reminderMonths.has(now.getMonth())) {
      return;
    }

    const users = await UserModel.find({ isActive: true }).lean();
    await Promise.all(
      users.map((user) =>
        createNotification({
          userId: String(user._id),
          title: 'Quarterly check-in reminder',
          message: 'Please update your quarterly check-in progress in AtomQuest.',
        }),
      ),
    );
  });
}
