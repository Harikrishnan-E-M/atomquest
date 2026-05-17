import { useEffect, useState } from 'react';
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import { AppLayout } from '../layouts/AppLayout';
import { fetchDashboard, type DashboardPayload } from '../api/dashboard';
import { useAppSelector } from '../hooks/useAppSelector';

export function DashboardPage() {
  const role = useAppSelector((state) => state.auth.user?.role ?? 'employee');
  const [dashboard, setDashboard] = useState<DashboardPayload | null>(null);

  useEffect(() => {
    void fetchDashboard(role).then(setDashboard);
  }, [role]);

  return (
    <AppLayout>
      <main>
        <h1>Dashboard</h1>
        <section>
          {dashboard ? (
            Object.entries(dashboard.summary).map(([label, value]) => (
              <article key={label}>
                <strong>{label}</strong>
                <p>{value}</p>
              </article>
            ))
          ) : (
            <p>Loading dashboard...</p>
          )}
        </section>
        <section style={{ height: 320 }}>
          {dashboard ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={dashboard.series}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#0f172a" />
              </BarChart>
            </ResponsiveContainer>
          ) : null}
        </section>
      </main>
    </AppLayout>
  );
}
