import { type ReactNode } from 'react';
import { PageHeader } from '@/shared/ui/page-header';
import { ScrollArea, Wrapper } from './PageContainer.style';
import { useTelegram, useTelegramService } from '@/contexts/TelegramContext';

interface PageContainerProps {
  title?: string;
  onBack?: () => void;
  children?: ReactNode;
  withPadding?: boolean;
  scrollable?: boolean;
  fullscreen?: boolean;
  onScroll?: (e: React.UIEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export const PageContainer = ({
  title,
  onBack,
  children,
  withPadding = true,
  scrollable = true,
  fullscreen = false,
  onScroll,
  style,
}: PageContainerProps) => {
  const { safeAreaInsetTop } = useTelegram();
  const webApp = useTelegramService();
  const tg_top = webApp?.tg?.safeAreaInset?.top;
  console.info(webApp?.tg?.safeAreaInset?.top);

  return (
    <Wrapper
      $fullscreen={fullscreen}
      style={{ ...style, paddingTop: `calc(${(tg_top || 0) + safeAreaInsetTop + 10}px)` }}
    >
      {title ? <PageHeader title={title} onBack={onBack} /> : <></>}
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
