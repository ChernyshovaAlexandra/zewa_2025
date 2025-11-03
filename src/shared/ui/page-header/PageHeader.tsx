import { HeaderWrapper, Title } from './PageHeader.styles';

interface PageHeaderProps {
  title?: string;
  onBack?: () => void;
}

export function PageHeader({ title }: PageHeaderProps) {
  return (
    <HeaderWrapper>
      <Title>{title}</Title>
    </HeaderWrapper>
  );
}
