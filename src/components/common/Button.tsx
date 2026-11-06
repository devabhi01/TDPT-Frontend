import React, { forwardRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, HTMLMotionProps } from 'framer-motion';
import { ArrowRight, Loader2 } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'glow';
  size?: 'sm' | 'md' | 'lg';
  to?: string;
  href?: string;
  isLoading?: boolean;
  withArrow?: boolean;
  children: React.ReactNode;
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(({
  className,
  variant = 'primary',
  size = 'md',
  to,
  href,
  isLoading = false,
  withArrow = false,
  children,
  disabled,
  ...props
}, ref) => {
  const baseClasses = "relative inline-flex items-center justify-center font-medium rounded-none transition-colors duration-200 cursor-pointer select-none disabled:opacity-50 disabled:pointer-events-none group outline-none focus-visible:ring-2 focus-visible:ring-brand-500 focus-visible:ring-offset-2 focus-visible:ring-offset-dark-950";

  const sizeClasses = {
    sm: "px-3.5 py-1.5 text-xs gap-1.5",
    md: "px-5 py-2.5 text-sm gap-2",
    lg: "px-7 py-3.5 text-base gap-2.5",
  };

  const variantClasses = {
    primary: "bg-brand-500 text-dark-950 font-semibold hover:bg-brand-400",
    secondary: "bg-white/5 text-white hover:bg-white/10 border border-white/15",
    outline: "border border-white/25 text-white hover:border-brand-500/60 hover:text-brand-400 bg-transparent",
    ghost: "text-slate-300 hover:text-white hover:bg-white/5 active:scale-[0.98]",
    glow: "bg-brand-500 text-dark-950 font-semibold hover:bg-brand-400",
  };

  const content = (
    <>
      {isLoading ? (
        <Loader2 className="w-4 h-4 animate-spin mr-2" />
      ) : null}
      <span>{children}</span>
      {withArrow && (
        <ArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
      )}
    </>
  );

  if (to) {
    return (
      <Link to={to} className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}>
        {content}
      </Link>
    );
  }

  if (href) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}>
        {content}
      </a>
    );
  }

  return (
    <motion.button
      ref={ref}
      whileTap={{ scale: 0.98 }}
      className={cn(baseClasses, sizeClasses[size], variantClasses[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {content}
    </motion.button>
  );
});

Button.displayName = 'Button';
