import { useState } from 'react';
import { Text, ZewaButton } from '@/shared/ui';
import * as S from './OnboardingScreen.styles';
import { applyNbsp } from '@/utils';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const steps = [
  {
    image: './assets/images/onboarding/1.png',
    header: `Добро пожаловать, ` /*${user.name}*/,
    text: 'Помните меня? Я Домовёнок. Расскажу вам, как играть и получать призы.',
  },
  {
    image: './assets/images/onboarding/1.png',
    header: `Продвигайтесь по шкале и собирайте призы и купоны`,
    text: `Покупайте товары Zewa в «Магните» и загружайте чеки. Ловите монеты в игре 
    и приглашайте в приложение друзей. Участвуйте в розыгрышах ценных призов при заполнении от 25 %.
    Каждую неделю шкала призов обнуляется и начинается новое соревнование!`,
  },
  {
    image: './assets/images/onboarding/1.png',
    header: `Проходите игру «Снова в школу» сколько угодно раз.`,
    text: 'Без регистрации чека вы не продвинетесь по шкале призов, но лучший игрок недели получит небольшой подарок.',
  },
  {
    image: './assets/images/onboarding/1.png',
    header: `Покупайте товары Zewa в  магазинах «Магнит».`,
    text: 'Для подтверждения покупки загружайте фото чека или сканируйте его QR-код камерой телефона и  получайте виртуальные монеты  для быстрого продвижения по шкале призов.',
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
