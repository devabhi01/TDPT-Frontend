import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../lib/utils';

interface CardProps extends HTMLMotionProps<'div'> {
  variant?: 'default' | 'elevated' | 'glass' | 'interactive';
  glow?: boolean;
}

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  glow = false,
  className,
  children,
  ...props
}) => {
  const variantClasses = {
    default: 'bg-dark-900 border border-white/10 rounded-none',
    elevated: 'bg-dark-850 border border-white/15 rounded-none',
    glass: 'glass-card rounded-none',
    interactive: 'glass-card glass-card-hover rounded-none cursor-pointer',
  };

  return (
    <motion.div
      className={cn(
        'relative overflow-hidden transition-colors duration-300',
        variantClasses[variant],
        glow && 'hover:border-brand-500/40 hover:shadow-glow-sm',
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
};
