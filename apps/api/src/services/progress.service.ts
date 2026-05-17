export type ProgressMode = 'higher-better' | 'lower-better' | 'zero-based';

export function calculateProgress(
  mode: ProgressMode,
  achievement: number,
  target: number,
  completedAt?: Date,
  deadline?: Date,
) {
  if (mode === 'zero-based') {
    return target === 0 ? 100 : 0;
  }

  if (mode === 'higher-better') {
    if (target === 0) return 0;
    return Math.round((achievement / target) * 100);
  }

  if (mode === 'lower-better') {
    if (achievement === 0) return 100;
    return Math.round((target / achievement) * 100);
  }

  if (completedAt && deadline) {
    const elapsed = deadline.getTime() - completedAt.getTime();
    return elapsed >= 0 ? 100 : 0;
  }

  return 0;
}
