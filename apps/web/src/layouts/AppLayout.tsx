import { useEffect, useState } from 'react';
import { Sidebar } from '../components/layout/Sidebar';
import { Topbar } from '../components/layout/Topbar';

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    const storedTheme = window.localStorage.getItem('atomquest_theme');
    const nextTheme = storedTheme === 'dark' ? 'dark' : 'light';
    setTheme(nextTheme);
    document.documentElement.dataset.theme = nextTheme;
  }, []);

  const toggleTheme = () => {
    setTheme((currentTheme) => {
      const nextTheme = currentTheme === 'light' ? 'dark' : 'light';
      document.documentElement.dataset.theme = nextTheme;
      window.localStorage.setItem('atomquest_theme', nextTheme);
      return nextTheme;
    });
  };

  return (
    <div className="app-shell">
      <Sidebar />
      <div className="app-shell__content">
        <Topbar theme={theme} onToggleTheme={toggleTheme} />
        <div className="app-shell__page">{children}</div>
      </div>
    </div>
  );
}
