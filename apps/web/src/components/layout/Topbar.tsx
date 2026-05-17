type TopbarProps = {
  theme: 'light' | 'dark';
  onToggleTheme: () => void;
};

export function Topbar({ theme, onToggleTheme }: TopbarProps) {
  return (
    <header className="topbar">
      <div>
        <p className="topbar__eyebrow">In-House Goal Setting & Tracking Portal</p>
        <strong>Employee, manager, and admin operations</strong>
      </div>
      <button type="button" className="topbar__theme-toggle" onClick={onToggleTheme}>
        {theme === 'light' ? 'Dark mode' : 'Light mode'}
      </button>
    </header>
  );
}
