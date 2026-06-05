import { Spin } from 'antd';
import { cn } from '../../utils';

interface LoadingProps {
  className?: string;
}

export function Loading({ className }: LoadingProps) {
  return (
    <div className={cn('flex justify-center items-center h-screen', className)}>
      <Spin size="large" />
    </div>
  );
}
