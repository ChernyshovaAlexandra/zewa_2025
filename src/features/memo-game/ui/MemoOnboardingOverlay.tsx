import { useEffect, useMemo, useState, type CSSProperties } from 'react';
import { createPortal } from 'react-dom';
import { useMemoOnboardingStore } from '../model/memoOnboardingStore';
import { useMemoGameStore } from '../model/memoGameStore';
import { getMemoLevelConfig } from '../config/memoLevelsConfig';
import type { MemoLevel } from '../types';
import {
  ArrowSvg,
  ArrowWrapper,
  IntroItem,
  ClubHint,
  Content,
  ContentInner,
  HintText,
  Mascot,
  Overlay,
  PhoneSection,
  TimerBubble,
  TimerSection,
  TopRow,
} from './styles';
import { TimerValue } from '../MemoGameScreen.styles';
import { ZewaButton } from '@/shared/ui';

const LEVEL_REWARDS: Record<MemoLevel, number> = {
  1: 6,
  2: 10,
  3: 15,
};

const formatTime = (timeLimitSeconds: number) => {
  const minutes = Math.floor(timeLimitSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeLimitSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

const INTRO_SEQUENCE = [
  'top',
  'arrowTop',
  'timer',
  'arrowBottom',
  'phone',
  'club',
  'mascot',
  'button',
] as const;

type IntroKey = (typeof INTRO_SEQUENCE)[number];
const INTRO_STAGGER = 140;

export function MemoOnboardingOverlay() {
  const isVisible = useMemoOnboardingStore((s) => s.isVisible);
  const hideOnboarding = useMemoOnboardingStore((s) => s.hide);
  const selectedLevel = useMemoGameStore((s) => s.selectedLevel);
  const [introReady, setIntroReady] = useState(false);

  const container = typeof document !== 'undefined' ? document.body : null;

  const { timeLimitSeconds } = getMemoLevelConfig(selectedLevel);
  const reward = LEVEL_REWARDS[selectedLevel];
  const formattedTime = formatTime(timeLimitSeconds);
  const introDelays = useMemo(() => {
    return INTRO_SEQUENCE.reduce<Record<IntroKey, number>>(
      (acc, key, index) => {
        acc[key] = index * INTRO_STAGGER;
        return acc;
      },
      {} as Record<IntroKey, number>,
    );
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') {
      setIntroReady(true);
      return;
    }
    const frame = window.requestAnimationFrame(() => setIntroReady(true));
    return () => window.cancelAnimationFrame(frame);
  }, []);

  interface CustomCSSProperties extends CSSProperties {
    '--intro-delay'?: string;
  }

  const getDelayStyle = (key: IntroKey): CustomCSSProperties => ({
    '--intro-delay': `${introDelays[key]}ms`,
  });

  if (!isVisible) return null;
  if (!container) return null;

  return createPortal(
    <Overlay role="dialog" aria-modal="true" aria-label="Онбординг игры Мемо">
      <Content>
        <ContentInner>
          <IntroItem $introReady={introReady} style={getDelayStyle('top')}>
            <TopRow>
              <img
                src="/assets/images/memo/onboarding/1.webp"
                alt="Игра Мемо"
                width={117}
                height={90}
              />
              <HintText>
                Откройте все пары одинаковых картинок — и получите{' '}
                <strong>{reward} снежинок</strong>
              </HintText>
            </TopRow>
          </IntroItem>

          <IntroItem $introReady={introReady} style={getDelayStyle('arrowTop')}>
            <ArrowWrapper
              style={{
                position: 'relative',
                marginTop: '-60px',
              }}
            >
              <ArrowSvg style={{ transform: 'rotate(71.8deg)' }} />
            </ArrowWrapper>
          </IntroItem>

          <IntroItem $introReady={introReady} style={getDelayStyle('timer')}>
            <TimerSection>
              <TimerBubble>
                <img src="/assets/images/memo/timer-icon.png" width={32} height={32} alt="таймер" />
                <TimerValue>{formattedTime}</TimerValue>
              </TimerBubble>
              <HintText>У вас всего {timeLimitSeconds} секунд, но сколько угодно попыток</HintText>
            </TimerSection>
          </IntroItem>

          <IntroItem $introReady={introReady} style={getDelayStyle('arrowBottom')}>
            <ArrowWrapper
              style={{
                marginTop: '20px',
              }}
            >
              <ArrowSvg style={{ transform: 'rotate(152.8deg)' }} />
            </ArrowWrapper>
          </IntroItem>

          <IntroItem $introReady={introReady} style={getDelayStyle('phone')}>
            <PhoneSection>
              <img src="/assets/images/memo/onboarding/2.webp" alt="Игра Мемо" width={108} />
              <HintText>Загрузите больше чеков с Zewa и откройте новый уровень</HintText>
            </PhoneSection>
          </IntroItem>

          <IntroItem $introReady={introReady} style={getDelayStyle('club')}>
            <ClubHint>Играйте каждый день, чтобы попасть в Клуб помощников Домовёнка</ClubHint>
          </IntroItem>
        </ContentInner>

        <IntroItem $introReady={introReady} style={getDelayStyle('button')}>
          <ZewaButton onClick={hideOnboarding} style={{ margin: '5px auto 0' }} variant="blue-b">
            Играть
          </ZewaButton>
        </IntroItem>
        <IntroItem $introReady={introReady} style={getDelayStyle('mascot')}>
          <Mascot src="/assets/images/memo/onboarding/domovenok.webp" alt="Домовёнок" />
        </IntroItem>
      </Content>
    </Overlay>,
    container,
  );
}
