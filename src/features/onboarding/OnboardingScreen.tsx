import { useState } from 'react';
import { Text, ZewaButton } from '@/shared/ui';
import * as S from './OnboardingScreen.styles';
import { applyNbsp } from '@/utils';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const steps = [
  {
    image: './assets/images/onboarding/1_christmas.jpg',
    header: 'Скучали? Я вернулся!',
    text: applyNbsp(
      'Перед Новым годом дел невпроворот. Но с Zewa дом сияет! Добавим немного волшебства. Поможете разобрать игрушки и нарядить ёлку?',
    ),
  },
  {
    image: './assets/images/onboarding/2_christmas.jpg',
    header: 'Не проЗЕВАй праздник!',
    text: applyNbsp(
      'Покупайте Zewa в «Магните», побеждайте в игре, зарабатывайте снежинки, чтобы продвинуться по шкале призов, и получайте ценные подарки.',
    ),
  },
  {
    image: './assets/images/onboarding/3_christmas.jpg',
    header: 'Первый уровень игры доступен без загрузки чеков',
    text: applyNbsp(
      'Второй и третий открываются при заполнении шкалы призов на 30 и 60%. Переверните все парные карточки, чтобы получить снежинки. Количество попыток не ограничено.',
    ),
  },
  {
    image: './assets/images/onboarding/4_christmas.jpg',
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
      <Text weight={700} align="center" color="#fff">
        {steps[step].header}
      </Text>
      <S.Text>{applyNbsp(steps[step].text)}</S.Text>
      <ZewaButton variant="white" onClick={handleNext} style={{ marginTop: 'auto', width: '80%' }}>
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
