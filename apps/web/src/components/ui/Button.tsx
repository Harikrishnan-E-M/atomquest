type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary';
};

export function Button({ variant = 'primary', className, ...props }: ButtonProps) {
  const base = 'rounded-md px-4 py-2 text-sm font-medium';
  const styles =
    variant === 'primary'
      ? 'bg-slate-900 text-white'
      : 'bg-slate-200 text-slate-900';

  return <button className={[base, styles, className].filter(Boolean).join(' ')} {...props} />;
}
