import { useState } from 'react';
import { Text, ZewaButton } from '@/shared/ui';
import * as S from './OnboardingScreen.styles';
import { applyNbsp } from '@/utils';

interface OnboardingScreenProps {
  onFinish: () => void;
}

const steps = [
  {
    image: './assets/images/onboarding/main/img1.jpg',
    header: `Добро пожаловать, ` /*${user.name}*/,
    text: 'Помните меня? Я Домовёнок. Расскажу вам, как играть и получать призы.',
  },
  {
    image: './assets/images/onboarding/main/img2.jpg',
    header: `Начните заполнять шкалу призов`,
    text: `Проходите игру «Снова в школу» неограниченное количество раз даже без загрузки чеков. Ловите больше предметов! Лучший игрок недели получит подарок.`,
  },
  {
    image: './assets/images/onboarding/main/img3.jpg',
    header: `Продвигайтесь по шкале, чтобы участвовать в розыгрыше призов`,
    text: 'Для этого покупайте товары Zewa в магазинах «Магнит» или приложении «Магнит: акции и доставка», загружайте чеки, ловите монеты в игре и приглашайте друзей.',
  },
  {
    image: './assets/images/onboarding/main/img4.jpg',
    header: `Заполняйте шкалу призов полностью`,
    text: 'Это увеличивает шансы на получение ценных подарков — от скидок и годового запаса Zewa до техники и Главного приза. Каждую неделю шкала обнуляется — начните с чистого листа и побеждайте снова!',
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
