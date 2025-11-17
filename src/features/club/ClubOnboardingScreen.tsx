import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { OnboardingScreen } from '@/features/onboarding/OnboardingScreen';
import { CLUB_ONBOARDING_KEY } from './constants';
import { OnboardingStep } from '../onboarding/config';

const CLUB_STEPS: OnboardingStep[] = [
  {
    image: '/assets/images/onboarding/club/1.webp',
    header: 'Клуб помощников Домовёнка',
    text: 'Играйте ежедневно, приглашайте друзей или выполните специальное задание недели, чтобы вступить в Клуб, получить новогодний бокс и 5 дополнительных снежинок.',
  }
];

export function ClubOnboardingScreen() {
  const navigate = useNavigate();
  const [shouldRender, setShouldRender] = useState(false);

  const handleFinish = useCallback(() => {
    if (typeof window !== 'undefined') {
      window.localStorage.setItem(CLUB_ONBOARDING_KEY, 'true');
    }
    navigate('/club', { replace: true });
  }, [navigate]);

  useEffect(() => {
    if (typeof window === 'undefined') {
      return;
    }
    const hasSeen = window.localStorage.getItem(CLUB_ONBOARDING_KEY) === 'true';
    if (hasSeen) {
      navigate('/club', { replace: true });
      return;
    }
    setShouldRender(true);
  }, [navigate]);

  if (!shouldRender) {
    return null;
  }

  return <OnboardingScreen steps={CLUB_STEPS} onFinish={handleFinish} />;
}
