import React from 'react';
import { Loader2 } from 'lucide-react';

export const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  disabled = false,
  icon: Icon,
  iconPosition = 'left',
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  const baseStyles =
    'inline-flex items-center justify-center font-medium transition-all duration-150 rounded-lg focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const variants = {
    primary:
      'bg-brand-600 hover:bg-brand-500 text-white shadow-sm hover:shadow focus:ring-brand-500 dark:focus:ring-offset-dark-bg',
    secondary:
      'bg-slate-100 hover:bg-slate-200 text-slate-900 dark:bg-dark-card dark:hover:bg-dark-subtle dark:text-slate-100 border border-slate-200 dark:border-dark-border focus:ring-slate-400',
    outline:
      'border border-slate-300 dark:border-dark-border bg-transparent hover:bg-slate-50 dark:hover:bg-dark-card text-slate-700 dark:text-slate-300 focus:ring-brand-500',
    ghost:
      'bg-transparent hover:bg-slate-100 dark:hover:bg-dark-card text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 focus:ring-slate-400',
    danger:
      'bg-rose-600 hover:bg-rose-500 text-white shadow-sm focus:ring-rose-500 dark:focus:ring-offset-dark-bg',
    accent:
      'bg-indigo-500/10 hover:bg-indigo-500/20 text-brand-600 dark:text-brand-400 border border-indigo-500/20 focus:ring-brand-500',
  };

  const sizes = {
    sm: 'text-xs px-2.5 py-1.5 gap-1.5',
    md: 'text-sm px-4 py-2 gap-2',
    lg: 'text-base px-5 py-2.5 gap-2.5',
    icon: 'p-2 text-sm',
  };

  return (
    <button
      type={type}
      disabled={disabled || isLoading}
      onClick={onClick}
      className={`${baseStyles} ${variants[variant] || variants.primary} ${
        sizes[size] || sizes.md
      } ${className}`}
      {...props}
    >
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin" />
      ) : (
        <>
          {Icon && iconPosition === 'left' && <Icon className="w-4 h-4 shrink-0" />}
          {children}
          {Icon && iconPosition === 'right' && <Icon className="w-4 h-4 shrink-0" />}
        </>
      )}
    </button>
  );
};

export default Button;
