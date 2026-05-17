import { NavLink } from 'react-router-dom';

const navItems = [
  { label: 'Dashboard', to: '/dashboard' },
  { label: 'Goals', to: '/goals' },
  { label: 'Check-ins', to: '/check-ins' },
  { label: 'Reports', to: '/reports' },
  { label: 'Manager Review', to: '/manager' },
  { label: 'Shared Goals', to: '/shared-goals' },
  { label: 'Notifications', to: '/notifications' },
  { label: 'Audit Logs', to: '/audit-logs' },
];

export function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="sidebar__brand">
        <span className="sidebar__eyebrow">Enterprise Portal</span>
        <h2>AtomQuest</h2>
      </div>
      <nav className="sidebar__nav">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) => `sidebar__link${isActive ? ' sidebar__link--active' : ''}`}
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
}
