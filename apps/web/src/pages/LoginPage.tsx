import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { loginRequest } from '../api/auth';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { setCredentials } from '../features/auth/authSlice';

type LoginFormValues = {
  email: string;
  password: string;
};

export function LoginPage() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormValues>();

  const onSubmit = async (values: LoginFormValues) => {
    setErrorMessage(null);
    try {
      const result = await loginRequest(values);
      dispatch(setCredentials({ token: result.token, user: result.user }));
      navigate('/dashboard', { replace: true });
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Login failed');
    }
  };

  return (
    <main>
      <h1>Login</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Email
          <input type="email" {...register('email', { required: 'Email is required' })} />
        </label>
        {errors.email ? <p>{errors.email.message}</p> : null}

        <label>
          Password
          <input type="password" {...register('password', { required: 'Password is required' })} />
        </label>
        {errors.password ? <p>{errors.password.message}</p> : null}

        {errorMessage ? <p>{errorMessage}</p> : null}
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Signing in...' : 'Sign in'}
        </button>
      </form>
    </main>
  );
}
