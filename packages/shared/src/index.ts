export const USER_ROLES = ['employee', 'manager', 'admin'] as const;
export const GOAL_STATUSES = ['draft', 'submitted', 'approved', 'rejected', 'locked'] as const;

export type UserRole = (typeof USER_ROLES)[number];
export type GoalStatus = (typeof GOAL_STATUSES)[number];
