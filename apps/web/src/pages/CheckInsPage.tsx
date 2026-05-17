import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppLayout } from '../layouts/AppLayout';
import { createCheckInRequest } from '../api/checkins';
import { checkinFormSchema, type CheckInFormInput } from '@atomquest/shared/schemas/checkin';

export function CheckInsPage() {
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<CheckInFormInput>({
    resolver: zodResolver(checkinFormSchema),
    defaultValues: {
      goalId: '',
      quarter: 'goal-setting',
      achievement: 0,
      comment: '',
      status: 'Not Started',
    },
  });

  const onSubmit = async (values: CheckInFormInput) => {
    setMessage(null);
    await createCheckInRequest(values);
    setMessage('Check-in saved');
    reset();
  };

  return (
    <AppLayout>
      <main>
        <h1>Quarterly Check-ins</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Goal ID
            <input {...register('goalId')} />
          </label>
          {errors.goalId ? <p>{errors.goalId.message}</p> : null}

          <label>
            Quarter
            <select {...register('quarter')}>
              <option value="goal-setting">Goal Setting</option>
              <option value="q1">Q1</option>
              <option value="q2">Q2</option>
              <option value="q3">Q3</option>
              <option value="q4">Q4</option>
            </select>
          </label>
          {errors.quarter ? <p>{errors.quarter.message}</p> : null}

          <label>
            Achievement
            <input type="number" {...register('achievement', { valueAsNumber: true })} />
          </label>
          {errors.achievement ? <p>{errors.achievement.message}</p> : null}

          <label>
            Status
            <select {...register('status')}>
              <option value="Not Started">Not Started</option>
              <option value="On Track">On Track</option>
              <option value="Completed">Completed</option>
            </select>
          </label>
          {errors.status ? <p>{errors.status.message}</p> : null}

          <label>
            Comment
            <textarea {...register('comment')} />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Check-in'}
          </button>
        </form>
        {message ? <p>{message}</p> : null}
      </main>
    </AppLayout>
  );
}
