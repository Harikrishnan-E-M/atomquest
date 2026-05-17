import { useEffect, useState } from 'react';
import { AppLayout } from '../layouts/AppLayout';
import { approveGoalRequest, fetchReviewGoals, rejectGoalRequest } from '../api/manager';
import type { GoalRecord } from '../api/goals';

export function ManagerPage() {
  const [goals, setGoals] = useState<GoalRecord[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    void fetchReviewGoals().then(setGoals);
  }, []);

  const refreshGoals = async () => {
    setGoals(await fetchReviewGoals());
  };

  const handleApprove = async (goalId: string) => {
    await approveGoalRequest(goalId, 'Approved from manager board');
    setMessage('Goal approved');
    await refreshGoals();
  };

  const handleReject = async (goalId: string) => {
    await rejectGoalRequest(goalId, 'Returned for revision');
    setMessage('Goal rejected');
    await refreshGoals();
  };

  return (
    <AppLayout>
      <main>
        <h1>Manager Review</h1>
        {message ? <p>{message}</p> : null}
        <div>
          {goals.map((goal) => (
            <article key={goal._id}>
              <h2>{goal.title}</h2>
              <p>{goal.description}</p>
              <p>Status: {goal.status}</p>
              <button type="button" onClick={() => handleApprove(goal._id)}>
                Approve
              </button>
              <button type="button" onClick={() => handleReject(goal._id)}>
                Reject
              </button>
            </article>
          ))}
        </div>
      </main>
    </AppLayout>
  );
}
