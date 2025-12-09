import { cn } from '@/lib/utils';
import { ReactNode } from 'react';
import { Button } from '@/components/ui/button';

interface PageHeaderProps {
  title: string;
  description?: string;
  action?: ReactNode;
  className?: string;
  onTitleClick?: () => void;
  onCreateBundle?: () => void;
  onAISuggested?: () => void;
}

export function PageHeader({ 
  title, 
  description, 
  action, 
  className,
  onTitleClick,
  onCreateBundle,
  onAISuggested
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
      
      {action ? (
        <div className="flex items-center gap-2">
          {action}
        </div>
      ) : (
        // Default action buttons (Create Bundle & AI Suggested Bundles)
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center w-full sm:w-auto gap-3">
          {/* Create Bundle Button */}
          <Button
            variant="pageHeaderSecondary"
            size="pageHeader"
            onClick={onCreateBundle}
            className="min-w-[141px]"
          >
            Create Bundle
          </Button>

          {/* AI Suggested Bundles Button */}
          <Button
            variant="pageHeaderPrimary" 
            size="pageHeader"
            onClick={onAISuggested}
            className="min-w-[222px] gap-2"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              {/* AI Icon - you can replace this with your actual AI icon */}
              <path d="M8 0L10.5 5.5L16 8L10.5 10.5L8 16L5.5 10.5L0 8L5.5 5.5L8 0Z"/>
            </svg>
            AI Suggested Bundles
          </Button>
        </div>
      )}
    </div>
  );
}