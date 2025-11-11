import { createPortal } from 'react-dom';
import { useMemoOnboardingStore } from '../model/memoOnboardingStore';
import { useMemoGameStore } from '../model/memoGameStore';
import { getMemoLevelConfig } from '../config/memoLevelsConfig';
import type { MemoLevel } from '../types';
import {
  ArrowSvg,
  ArrowWrapper,
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

export function MemoOnboardingOverlay() {
  const isVisible = useMemoOnboardingStore((s) => s.isVisible);
  const hideOnboarding = useMemoOnboardingStore((s) => s.hide);
  const selectedLevel = useMemoGameStore((s) => s.selectedLevel);
  if (!isVisible) return null;

  const container = typeof document !== 'undefined' ? document.body : null;
  if (!container) return null;

  const { timeLimitSeconds } = getMemoLevelConfig(selectedLevel);
  const reward = LEVEL_REWARDS[selectedLevel];
  const formattedTime = formatTime(timeLimitSeconds);

  return createPortal(
    <Overlay role="dialog" aria-modal="true" aria-label="Онбординг игры Мемо">
      <Content>
        <ContentInner>
          <TopRow>
            <img
              src="/assets/images/memo/onboarding/1.webp"
              alt="Игра Мемо"
              width={117}
              height={90}
            />
            <HintText>
              Откройте все пары одинаковых картинок — и получите <strong>{reward} снежинок</strong>
            </HintText>
          </TopRow>

          <ArrowWrapper
            style={{
              position: 'relative',
              marginTop: '-60px',
            }}
          >
            <ArrowSvg style={{ transform: 'rotate(71.8deg)' }} />
          </ArrowWrapper>

          <TimerSection>
            <TimerBubble>
              <img src="/assets/images/memo/timer-icon.png" width={32} height={32} alt="таймер" />
              <TimerValue>{formattedTime}</TimerValue>
            </TimerBubble>
            <HintText>У вас всего {timeLimitSeconds} секунд, но сколько угодно попыток</HintText>
          </TimerSection>

          <ArrowWrapper
            style={{
              marginTop: '20px',
            }}
          >
            <ArrowSvg style={{ transform: 'rotate(152.8deg)' }} />
          </ArrowWrapper>

          <PhoneSection>
            <img src="/assets/images/memo/onboarding/2.webp" alt="Игра Мемо" width={108} />
            <HintText>Загрузите больше чеков с Zewa и откройте новый уровень</HintText>
          </PhoneSection>

          <ClubHint>Играйте каждый день, чтобы попасть в Клуб помощников Домовёнка</ClubHint>
          <ZewaButton onClick={hideOnboarding} style={{ margin: '19px auto 0' }} variant="blue-b">
            Играть
          </ZewaButton>
        </ContentInner>
        <Mascot src="/assets/images/memo/onboarding/domovenok.webp" alt="Домовёнок" />
      </Content>
    </Overlay>,
    container,
  );
}
