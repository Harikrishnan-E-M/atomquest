export type GoalStatus = 'draft' | 'submitted' | 'approved' | 'rejected' | 'locked';

export type GoalDocument = {
  employeeId: string;
  title: string;
  description: string;
  status: GoalStatus;
};
