import { useNavigate } from 'react-router-dom';
import { HeaderWrapper, BackButton, Title } from './PageHeader.styles';
import { BackIcon } from '@/shared/ui/icons';

interface PageHeaderProps {
  title?: string;
  onBack?: () => void;
}

export function PageHeader({ title, onBack }: PageHeaderProps) {
  const navigate = useNavigate();

  const handleBack = () => {
    if (onBack) return onBack();

    const state = window.history.state as { idx?: number } | null;
    const canGoBack =
      state && typeof state.idx === 'number' ? state.idx > 0 : window.history.length > 1;
    if (canGoBack) {
      navigate(-1);
    } else {
      navigate('/');
    }
  };

  return (
    <HeaderWrapper>
      <BackButton onClick={handleBack}>
        <BackIcon />
      </BackButton>
      {title && <Title>{title}</Title>}
    </HeaderWrapper>
  );
}
