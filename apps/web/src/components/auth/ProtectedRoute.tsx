import { Navigate } from 'react-router-dom';
import { useAppSelector } from '../../hooks/useAppSelector';

type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, bootstrapped } = useAppSelector((state) => state.auth);

  if (!bootstrapped) {
    return <div>Loading session...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
