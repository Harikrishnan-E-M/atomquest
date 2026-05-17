import { z } from 'zod';

export const sharedGoalSchema = z.object({
  title: z.string().min(3),
  target: z.string().min(1),
  weightage: z.number().min(10).max(100),
  linkedEmployees: z.array(z.string().min(1)).min(1),
  syncEnabled: z.boolean(),
});

export type SharedGoalInput = z.infer<typeof sharedGoalSchema>;
