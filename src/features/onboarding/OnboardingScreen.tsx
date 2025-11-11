import {
  useEffect,
  useMemo,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type TouchEvent as ReactTouchEvent,
} from 'react';
import { ZewaButton } from '@/shared/ui';
import * as S from './OnboardingScreen.styles';
import { applyNbsp } from '@/utils';
import { DEFAULT_ONBOARDING_STEPS, OnboardingScreenProps } from './config';
import { useTelegram } from '@/contexts/TelegramContext';

const SWIPE_THRESHOLD = 40;

function useTelegramCloseButton(enabled: boolean | undefined) {
  const { isTelegramWebApp, service } = useTelegram();

  useEffect(() => {
    if (!enabled || !isTelegramWebApp) {
      return;
    }

    const webApp = service.getWebApp();
    const backButton = webApp?.BackButton;
    if (!backButton) {
      return;
    }

    const handleClose = () => {
      webApp?.close?.();
    };

    backButton.show?.();
    backButton.onClick?.(handleClose);

    return () => {
      backButton.offClick?.(handleClose);
      backButton.hide?.();
    };
  }, [enabled, isTelegramWebApp, service]);
}

export function OnboardingScreen({
  onFinish,
  steps = DEFAULT_ONBOARDING_STEPS,
  forceCloseButton,
}: OnboardingScreenProps) {
  useTelegramCloseButton(forceCloseButton);
  const content = steps.length > 0 ? steps : DEFAULT_ONBOARDING_STEPS;
  const [step, setStep] = useState(0);
  const [dragOffsetPercent, setDragOffsetPercent] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const swipeStartXRef = useRef<number | null>(null);
  const slidesRef = useRef<HTMLDivElement | null>(null);
  const currentStep = content[Math.min(step, content.length - 1)];
  const slideOffset = useMemo(() => -(step * 100) + dragOffsetPercent, [dragOffsetPercent, step]);

  const requestSmoothReset = () => {
    const raf = typeof window !== 'undefined' ? window.requestAnimationFrame : null;
    if (!raf) {
      setDragOffsetPercent(0);
      return;
    }
    raf(() => raf(() => setDragOffsetPercent(0)));
  };

  const getSlideWidth = () => slidesRef.current?.offsetWidth ?? window.innerWidth ?? 1;

  const handleNext = () => {
    if (step < content.length - 1) {
      setStep(step + 1);
    } else {
      onFinish();
    }
  };

  const beginDrag = (clientX: number) => {
    swipeStartXRef.current = clientX;
    setIsDragging(true);
  };

  const updateDrag = (clientX: number) => {
    if (swipeStartXRef.current === null) return;
    const deltaX = clientX - swipeStartXRef.current;
    const width = getSlideWidth();
    setDragOffsetPercent((deltaX / width) * 100);
  };

  const finishDrag = (clientX: number) => {
    if (swipeStartXRef.current === null) return;
    const deltaX = clientX - swipeStartXRef.current;
    if (deltaX <= -SWIPE_THRESHOLD) {
      if (step < content.length - 1) {
        setStep(step + 1);
        setIsDragging(false);
        requestSmoothReset();
      } else {
        setIsDragging(false);
        setDragOffsetPercent(0);
        onFinish();
      }
    } else if (deltaX >= SWIPE_THRESHOLD) {
      if (step > 0) {
        setStep(step - 1);
        setIsDragging(false);
        requestSmoothReset();
      } else {
        setIsDragging(false);
        requestSmoothReset();
      }
    } else {
      setIsDragging(false);
      requestSmoothReset();
    }
    swipeStartXRef.current = null;
  };

  const cancelDrag = () => {
    setIsDragging(false);
    requestSmoothReset();
    swipeStartXRef.current = null;
  };

  const handlePointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    beginDrag(event.clientX);
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    updateDrag(event.clientX);
  };

  const handlePointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch') return;
    finishDrag(event.clientX);
  };

  const handleTouchStart = (event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.touches[0];
    if (!touch) return;
    beginDrag(touch.clientX);
  };

  const handleTouchMove = (event: ReactTouchEvent<HTMLDivElement>) => {
    if (swipeStartXRef.current === null) return;
    const touch = event.touches[0];
    if (!touch) return;
    updateDrag(touch.clientX);
    event.preventDefault();
  };

  const handleTouchEnd = (event: ReactTouchEvent<HTMLDivElement>) => {
    const touch = event.changedTouches[0];
    if (!touch) {
      cancelDrag();
      return;
    }
    finishDrag(touch.clientX);
  };

  const handleTouchCancel = () => {
    cancelDrag();
  };

  if (!currentStep) {
    return null;
  }

  return (
    <S.Wrapper>
      <S.SlidesViewport
        ref={slidesRef}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={cancelDrag}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchCancel}
      >
        <S.SlideTrack $offset={slideOffset} $isDragging={isDragging}>
          {content.map((item, index) => (
            <S.Slide key={`${item.header}-${index}`}>
              <S.Image src={item.image} alt="onboarding" />
              <S.Header>{item.header}</S.Header>
              <S.Text>{applyNbsp(item.text)}</S.Text>
            </S.Slide>
          ))}
        </S.SlideTrack>
      </S.SlidesViewport>
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
