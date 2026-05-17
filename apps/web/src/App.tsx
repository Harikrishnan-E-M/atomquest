import { Navigate, Route, Routes } from 'react-router-dom';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import { RoleRoute } from './components/auth/RoleRoute';
import { CheckInsPage } from './pages/CheckInsPage';
import { DashboardPage } from './pages/DashboardPage';
import { GoalsPage } from './pages/GoalsPage';
import { LoginPage } from './pages/LoginPage';
import { ManagerPage } from './pages/ManagerPage';
import { AuditLogsPage } from './pages/AuditLogsPage';
import { SharedGoalsPage } from './pages/SharedGoalsPage';
import { NotificationsPage } from './pages/NotificationsPage';
import { ReportsPage } from './pages/ReportsPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/dashboard" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <DashboardPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/goals"
        element={
          <ProtectedRoute>
            <GoalsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/check-ins"
        element={
          <ProtectedRoute>
            <CheckInsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/reports"
        element={
          <ProtectedRoute>
            <ReportsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manager"
        element={
          <RoleRoute allowedRoles={['manager', 'admin']}>
            <ManagerPage />
          </RoleRoute>
        }
      />
      <Route
        path="/shared-goals"
        element={
          <RoleRoute allowedRoles={['manager', 'admin']}>
            <SharedGoalsPage />
          </RoleRoute>
        }
      />
      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <NotificationsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/audit-logs"
        element={
          <RoleRoute allowedRoles={['admin']}>
            <AuditLogsPage />
          </RoleRoute>
        }
      />
    </Routes>
  );
}

export default App;
