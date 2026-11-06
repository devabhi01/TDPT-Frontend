import React from 'react';
import { motion } from 'framer-motion';
import { Badge } from './Badge';
import { cn } from '../../lib/utils';

interface SectionHeadingProps {
  eyebrow?: string;
  title: string;
  highlight?: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export const SectionHeading: React.FC<SectionHeadingProps> = ({
  eyebrow,
  title,
  highlight,
  subtitle,
  align = 'center',
  className,
}) => {
  const isCenter = align === 'center';

  return (
    <div className={cn('mb-12 md:mb-16', isCenter && 'text-center mx-auto max-w-3xl', className)}>
      {eyebrow && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4 }}
          className="mb-4"
        >
          <Badge variant="brand" pulse={true}>{eyebrow}</Badge>
        </motion.div>
      )}

      <motion.h2
        initial={{ opacity: 0, y: 15 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="studio-page-heading text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-white leading-tight"
      >
        {highlight ? (
          <>
            {title.split(highlight)[0]}
            <span className="text-brand-gradient studio-heading-accent">{highlight}</span>
            {title.split(highlight)[1]}
          </>
        ) : (
          title
        )}
      </motion.h2>

      {subtitle && (
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={cn(
            'mt-4 text-base sm:text-lg text-slate-400 leading-relaxed font-normal',
            isCenter && 'mx-auto'
          )}
        >
          {subtitle}
        </motion.p>
      )}
    </div>
  );
};
