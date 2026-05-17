import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { AppLayout } from '../layouts/AppLayout';
import { goalFormSchema, type GoalFormInput } from '@atomquest/shared/schemas/goal';
import { createGoalRequest } from '../api/goals';

export function GoalsPage() {
  const [message, setMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<GoalFormInput>({
    resolver: zodResolver(goalFormSchema),
    defaultValues: {
      title: '',
      description: '',
      thrustArea: '',
      uomType: 'number',
      target: '',
      weightage: 10,
      deadline: '',
    },
  });

  const onSubmit = async (values: GoalFormInput) => {
    setMessage(null);
    await createGoalRequest(values);
    setMessage('Goal saved');
    reset();
  };

  return (
    <AppLayout>
      <main>
        <h1>Goals</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <label>
            Title
            <input {...register('title')} />
          </label>
          {errors.title ? <p>{errors.title.message}</p> : null}

          <label>
            Description
            <textarea {...register('description')} />
          </label>
          {errors.description ? <p>{errors.description.message}</p> : null}

          <label>
            Thrust Area
            <input {...register('thrustArea')} />
          </label>
          {errors.thrustArea ? <p>{errors.thrustArea.message}</p> : null}

          <label>
            UOM Type
            <select {...register('uomType')}>
              <option value="number">Number</option>
              <option value="percentage">Percentage</option>
              <option value="currency">Currency</option>
              <option value="text">Text</option>
            </select>
          </label>
          {errors.uomType ? <p>{errors.uomType.message}</p> : null}

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
            Deadline
            <input type="date" {...register('deadline')} />
          </label>
          {errors.deadline ? <p>{errors.deadline.message}</p> : null}

          <button type="submit" disabled={isSubmitting}>
            {isSubmitting ? 'Saving...' : 'Save Goal'}
          </button>
        </form>
        {message ? <p>{message}</p> : null}
      </main>
    </AppLayout>
  );
}
