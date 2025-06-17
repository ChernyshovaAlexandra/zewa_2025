import { type ReactNode } from 'react';
import { PageHeader } from '@/shared/ui/page-header';
import { ScrollArea, Wrapper } from './PageContainer.style';

interface PageContainerProps {
  title?: string;
  onBack?: () => void;
  children?: ReactNode;
  withPadding?: boolean;
  scrollable?: boolean;
  fullscreen?: boolean;
}

export const PageContainer = ({
  title,
  onBack,
  children,
  withPadding = true,
  scrollable = true,
  fullscreen = false,
}: PageContainerProps) => {
  return (
    <Wrapper $fullscreen={fullscreen}>
      <PageHeader title={title} onBack={onBack} />
      {scrollable ? <ScrollArea $withPadding={withPadding}>{children}</ScrollArea> : children}
    </Wrapper>
  );
};
