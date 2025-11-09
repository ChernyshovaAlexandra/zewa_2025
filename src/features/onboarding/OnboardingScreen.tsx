import { useRef, useState, type PointerEvent as ReactPointerEvent } from 'react';
import { ZewaButton } from '@/shared/ui';
import * as S from './OnboardingScreen.styles';
import { applyNbsp } from '@/utils';

export interface OnboardingStep {
  image: string;
  header: string;
  text: string;
}

interface OnboardingScreenProps {
  onFinish: () => void;
  steps?: OnboardingStep[];
}

export const DEFAULT_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    image: '/assets/images/onboarding/1_christmas.webp',
    header: 'Скучали? Я вернулся!',
    text: 'Перед Новым годом дел невпроворот. Но с Zewa дом сияет! Добавим немного волшебства. Поможете разобрать игрушки и нарядить ёлку?',
  },
  {
    image: '/assets/images/onboarding/2_christmas.webp',
    header: 'Не проЗЕВАй праздник!',
    text: 'Покупайте Zewa в «Магните», побеждайте в игре, зарабатывайте снежинки, чтобы продвинуться по шкале призов, и получайте ценные подарки.',
  },
  {
    image: '/assets/images/onboarding/3_christmas.webp',
    header: 'Встречайте новую игру!',
    text: 'Переверните все парные карточки, чтобы получить снежинки. Количество попыток не ограничено.',
  },
  {
    image: '/assets/images/onboarding/4_christmas.webp',
    header: 'Продвигайтесь по шкале призов',
    text: 'Загружайте чеки с товарами Zewa, проходите 3 уровня игры каждую неделю и вступайте в Клуб помощников Домовёнка.',
  },
];

const SWIPE_THRESHOLD = 40;

export function OnboardingScreen({ onFinish, steps = DEFAULT_ONBOARDING_STEPS }: OnboardingScreenProps) {
  const content = steps.length > 0 ? steps : DEFAULT_ONBOARDING_STEPS;
  const [step, setStep] = useState(0);
  const swipeStartXRef = useRef<number | null>(null);
  const currentStep = content[Math.min(step, content.length - 1)];

  const handleNext = () => {
    if (step < content.length - 1) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  const handlePrev = () => {
    if (step > 0) {
      setStep(step - 1);
    }
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    swipeStartXRef.current = event.clientX;
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (swipeStartXRef.current === null) return;
    const deltaX = event.clientX - swipeStartXRef.current;
    if (deltaX <= -SWIPE_THRESHOLD) {
      handleNext();
    } else if (deltaX >= SWIPE_THRESHOLD) {
      handlePrev();
    }
    swipeStartXRef.current = null;
  };

  const handlePointerCancel = () => {
    swipeStartXRef.current = null;
  };

  if (!currentStep) {
    return null;
  }

  return (
    <S.Wrapper
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      onPointerLeave={handlePointerCancel}
      onPointerCancel={handlePointerCancel}
    >
      <S.Image src={currentStep.image} alt="onboarding" />
      <S.Header>{currentStep.header}</S.Header>
      <S.Text>{applyNbsp(currentStep.text)}</S.Text>
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
        {content.map((_, i) => (
          <S.Dot key={i} $active={i === step} />
        ))}
      </S.Pagination>
      <S.SkipButton onClick={onFinish}>Пропустить</S.SkipButton>
    </S.Wrapper>
  );
}
