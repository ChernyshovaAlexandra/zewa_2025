import { useState } from 'react';
import { ZewaButton } from '@/shared/ui';
import * as S from './OnboardingScreen.styles';
import { applyNbsp } from '@/utils';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const steps = [
  {
    image: './assets/images/onboarding/1_christmas.webp',
    header: 'Скучали? Я вернулся!',
    text: applyNbsp(
      'Перед Новым годом дел невпроворот. Но с Zewa дом сияет! Добавим немного волшебства. Поможете разобрать игрушки и нарядить ёлку?',
    ),
  },
  {
    image: './assets/images/onboarding/2_christmas.webp',
    header: 'Не проЗЕВАй праздник!',
    text: applyNbsp(
      'Покупайте Zewa в «Магните», побеждайте в игре, зарабатывайте снежинки, чтобы продвинуться по шкале призов, и получайте ценные подарки.',
    ),
  },
  {
    image: './assets/images/onboarding/3_christmas.webp',
    header: 'Встречайте новую игру!',
    text: applyNbsp(
      'Переверните все парные карточки, чтобы получить снежинки. Количество попыток не ограничено.',
    ),
  },
  {
    image: './assets/images/onboarding/4_christmas.webp',
    header: 'Продвигайтесь по шкале призов',
    text: applyNbsp(
      'Загружайте чеки с товарами Zewa, проходите 3 уровня игры каждую неделю и вступайте в Клуб помощников Домовёнка.',
    ),
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
      <S.Header>{steps[step].header}</S.Header>
      <S.Text>{applyNbsp(steps[step].text)}</S.Text>
      <ZewaButton
        style={{
          marginTop: 'auto',
          width: '180px',
          fontSize: '18px',
          fontWeight: 700,
          textTransform: 'none',
        }}
        variant="white"
        onClick={handleNext}
      >
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
