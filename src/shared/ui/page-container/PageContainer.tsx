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
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
}

export const PageContainer = ({
  title,
  onBack,
  children,
  withPadding = true,
  scrollable = true,
  fullscreen = false,
  onScroll,
}: PageContainerProps) => {
  return (
    <Wrapper $fullscreen={fullscreen}>
      <PageHeader title={title} onBack={onBack} />
      {scrollable ? (
        <ScrollArea $withPadding={withPadding} onScroll={onScroll}>
          {children}
        </ScrollArea>
      ) : (
        children
      )}
    </Wrapper>
  );
};
