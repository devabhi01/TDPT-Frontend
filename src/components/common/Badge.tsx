import React from 'react';
import { cn } from '../../lib/utils';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'brand' | 'accent' | 'neutral' | 'success';
  size?: 'sm' | 'md';
  pulse?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  variant = 'brand',
  size = 'md',
  pulse = false,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    brand: 'bg-brand-500/10 text-brand-400 border-brand-500/20',
    accent: 'bg-brand-accent/10 text-brand-accent border-brand-accent/20',
    neutral: 'bg-white/5 text-slate-300 border-white/10',
    success: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
  };

  const sizeClasses = {
    sm: 'text-xs px-2.5 py-0.5',
    md: 'text-xs px-3 py-1 font-medium',
  };

  return (
    <span
      className={cn(
    'inline-flex items-center gap-1.5 rounded-none border tracking-wide uppercase font-mono',
        variantClasses[variant],
        sizeClasses[size],
        className
      )}
      {...props}
    >
      {pulse && (
        <span className="relative flex h-1.5 w-1.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-brand-500" />
        </span>
      )}
      {children}
    </span>
  );
};
