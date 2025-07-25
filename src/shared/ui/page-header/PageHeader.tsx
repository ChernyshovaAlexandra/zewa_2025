import { useNavigate, useNavigationType } from 'react-router-dom';
import { HeaderWrapper, BackButton, Title } from './PageHeader.styles';
import { BackIcon } from '@/shared/ui/icons';

interface PageHeaderProps {
  title?: string;
  onBack?: () => void;
}

export function PageHeader({ title, onBack }: PageHeaderProps) {
  const navigate = useNavigate();
  const navigationType = useNavigationType();

  const handleBack = () => {
    if (onBack) {
      return onBack();
    }

    if (navigationType === 'PUSH') {
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
