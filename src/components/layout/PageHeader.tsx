import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  onTitleClick?: () => void;
}

export function PageHeader({ 
  title, 
  description, 
  action, 
  className,
  onTitleClick
}: PageHeaderProps) {
  return (
    <div className={cn(
      'flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between',
      className
    )}>
      <div className="space-y-1">
        <h1 
          className="text-2xl font-bold tracking-tight sm:text-3xl cursor-pointer"
          onClick={onTitleClick}
        >
          {title}
        </h1>
        {description && (
          <p className="text-sm text-muted-foreground sm:text-base">
            {description}
          </p>
        )}
      </div>
      {action && (
        <div className="flex items-center gap-2">
          {action}
        </div>
      )}
    </div>
  );
}
