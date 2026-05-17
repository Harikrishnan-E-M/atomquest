import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppLayout } from '../layouts/AppLayout';
import { createSharedGoalRequest } from '../api/sharedGoals';
import { sharedGoalSchema, type SharedGoalInput } from '@atomquest/shared/schemas/sharedGoal';

export function SharedGoalsPage() {
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<SharedGoalInput>({
    resolver: zodResolver(sharedGoalSchema),
    defaultValues: {
      title: '',
      target: '',
      weightage: 10,
      linkedEmployees: [''],
      syncEnabled: true,
    },
  });

  const onSubmit = async (values: SharedGoalInput) => {
    setMessage(null);
    await createSharedGoalRequest(values);
    setMessage('Shared goal created');
    reset();
  };

  return (
    <AppLayout>
      <main>
        <h1>Shared Goals</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Goal Title
            <input {...register('title')} />
          </label>
          {errors.title ? <p>{errors.title.message}</p> : null}

          <label>
            Target
            <input {...register('target')} />
          </label>
          {errors.target ? <p>{errors.target.message}</p> : null}

          <label>
            Weightage
            <input type="number" {...register('weightage', { valueAsNumber: true })} />
          </label>
          {errors.weightage ? <p>{errors.weightage.message}</p> : null}

          <label>
            Linked Employees (comma separated ids)
            <input {...register('linkedEmployees.0')} />
          </label>
          {errors.linkedEmployees ? <p>At least one linked employee is required</p> : null}

          <label>
            Sync Enabled
            <input type="checkbox" {...register('syncEnabled')} />
          </label>

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Shared Goal'}
          </button>
        </form>
        {message ? <p>{message}</p> : null}
      </main>
    </AppLayout>
  );
}
