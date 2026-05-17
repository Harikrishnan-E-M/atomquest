import { useEffect } from 'react';
import { fetchCurrentUser } from '../../api/auth';
import { clearCredentials, setBootstrapped, setCredentials } from '../../features/auth/authSlice';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { useAppSelector } from '../../hooks/useAppSelector';

export function AuthBootstrap() {
  const dispatch = useAppDispatch();
  const token = useAppSelector((state) => state.auth.token);
  const bootstrapped = useAppSelector((state) => state.auth.bootstrapped);

  useEffect(() => {
    if (!token || bootstrapped) {
      dispatch(setBootstrapped(true));
      return;
    }

    void fetchCurrentUser()
      .then((result) => {
        dispatch(setCredentials({ token, user: result.user }));
      })
      .catch(() => {
        dispatch(clearCredentials());
      });
  }, [bootstrapped, dispatch, token]);

  return null;
}
