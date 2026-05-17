import { z } from 'zod';

export const CHECKIN_QUARTERS = ['goal-setting', 'q1', 'q2', 'q3', 'q4'] as const;
export const CHECKIN_STATUSES = ['Not Started', 'On Track', 'Completed'] as const;

export const checkinFormSchema = z.object({
  goalId: z.string().min(1),
  quarter: z.enum(CHECKIN_QUARTERS),
  achievement: z.number().min(0),
  comment: z.string(),
  status: z.enum(CHECKIN_STATUSES),
});

export type CheckInFormInput = z.infer<typeof checkinFormSchema>;
