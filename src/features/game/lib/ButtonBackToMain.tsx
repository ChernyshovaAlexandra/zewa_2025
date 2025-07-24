import { ZewaButton } from '@/shared/ui';
import { FC } from 'react';
import { NavigateFunction } from 'react-router-dom';

type ButtonBackToMainProps = {
  navigate: NavigateFunction;
};

export const ButtonBackToMain: FC<ButtonBackToMainProps> = ({ navigate }) => {
  return (
    <ZewaButton onClick={() => navigate('/')} style={{ margin: '1rem auto 0' }} variant="blue-b">
      На главную
    </ZewaButton>
  );
};
