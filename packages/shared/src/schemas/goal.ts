import { z } from 'zod';

export const GOAL_UOM_TYPES = ['number', 'percentage', 'currency', 'text'] as const;

export const goalStatusValues = ['draft', 'submitted', 'approved', 'rejected', 'locked'] as const;

export const goalFormSchema = z.object({
	title: z.string().min(3, 'Goal title is required'),
	description: z.string().min(10, 'Description is required'),
	thrustArea: z.string().min(2, 'Thrust area is required'),
	uomType: z.enum(GOAL_UOM_TYPES),
	target: z.string().min(1, 'Target is required'),
	weightage: z.number().min(10, 'Minimum weightage per goal is 10%').max(100),
	deadline: z.string().min(1, 'Deadline is required'),
});

export type GoalFormInput = z.infer<typeof goalFormSchema>;
