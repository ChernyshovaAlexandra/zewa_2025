import { useState } from 'react';
import { ZewaButton } from '@/shared/ui';
import * as S from './OnboardingScreen.styles';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const steps = [
  {
    image: './assets/images/roll-bg.png',
    text: 'Добро пожаловать в приложение Zewa',
  },
  {
    image: './assets/images/roll-bg.png',
    text: 'Сканируйте чеки и получайте призы',
  },
  {
    image: './assets/images/roll-bg.png',
    text: 'Играйте и участвуйте в турнирах',
  },
];

export function OnboardingScreen({ onFinish }: OnboardingScreenProps) {
  const [step, setStep] = useState(0);

  const handleNext = () => {
    if (step < steps.length - 1) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  return (
    <S.Wrapper>
      <S.Image src={steps[step].image} alt="onboarding" />
      <S.Text>{steps[step].text}</S.Text>
      <ZewaButton variant="blue-b" onClick={handleNext} style={{ marginTop: 'auto' }}>
        Далее
      </ZewaButton>
      <S.Pagination>
        {steps.map((_, i) => (
          <S.Dot key={i} $active={i === step} />
        ))}
      </S.Pagination>
      <S.SkipButton onClick={onFinish}>Пропустить</S.SkipButton>
    </S.Wrapper>
  );
}
