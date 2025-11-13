import { Flex } from 'antd';
import { PageContainer, PauseIcon } from '@/shared/ui';
import * as S from './MemoGameScreen.styles';
import { Outlet, useNavigate, useLocation } from 'react-router-dom';
import { useCallback, useEffect, useRef } from 'react';
import { useMemoGameLogic } from './lib/useMemoGameLogic';
import { getMemoCardImageStyle } from './config/memoCardImageConfig';
import { MemoOnboardingOverlay } from './ui/MemoOnboardingOverlay';
import { useMemoOnboardingStore } from './model/memoOnboardingStore';
import { useMemoGameStore } from './model/memoGameStore';

export function MemoGameScreen() {
  const navigate = useNavigate();
  const location = useLocation();
  const shouldShowPauseOnResume = useMemoGameStore((s) => s.shouldShowPauseOnResume);
  const setShouldShowPauseOnResume = useMemoGameStore((s) => s.setShouldShowPauseOnResume);
  const isRulesRoute = location.pathname.endsWith('/rules');
  const wasRulesRouteRef = useRef(isRulesRoute);
  const handleExit = useCallback(() => {
    navigate('/');
  }, [navigate]);
  const handleOpenRules = useCallback(() => {
    navigate('/game/memo/rules');
  }, [navigate]);

  const isOnboardingVisible = useMemoOnboardingStore((s) => s.isVisible);
  const showOnboarding = useMemoOnboardingStore((s) => s.show);
  const hideOnboarding = useMemoOnboardingStore((s) => s.hide);

  useEffect(() => {
    showOnboarding();
    return () => {
      hideOnboarding();
    };
  }, [showOnboarding, hideOnboarding]);

  const {
    selectedLevel,
    columns,
    minutes,
    seconds,
    timeRemainingSeconds,
    cardDeck,
    matchedCards,
    activeIndexes,
    isResolvingPair,
    imageSet,
    handleCardClick,
    handlePause,
    handleFrontImageLoad,
    handleFrontImageError,
    openPauseModal,
  } = useMemoGameLogic({
    onExit: handleExit,
    onShowRules: handleOpenRules,
    isInteractionLocked: isOnboardingVisible,
  });

  useEffect(() => {
    if (wasRulesRouteRef.current && !isRulesRoute && shouldShowPauseOnResume) {
      openPauseModal();
      setShouldShowPauseOnResume(false);
    }
    wasRulesRouteRef.current = isRulesRoute;
  }, [isRulesRoute, openPauseModal, setShouldShowPauseOnResume, shouldShowPauseOnResume]);

  useEffect(() => {
    setShouldShowPauseOnResume(false);
    return () => setShouldShowPauseOnResume(false);
  }, [setShouldShowPauseOnResume]);
  // todo: check
  return (
    <>
      <PageContainer
        fullscreen
        style={{
          background: "url('/assets/images/memo/bg.webp') no-repeat center",
          backgroundSize: 'cover',
          paddingTop: `var(--twa-safe-area-top, 0px)`,
        }}
      >
        <S.GameWrapper>
          <S.TopRow>
            <S.InfoBlock
              aria-label={`Оставшееся время ${minutes}:${seconds}`}
              data-critical={timeRemainingSeconds <= 5 ? 'true' : undefined}
            >
              <Flex align="center" gap="6px">
                <img width={32} height={32} src="/assets/images/memo/timer-icon.png" />
                <S.TimerValue
                  data-pulse={
                    timeRemainingSeconds <= 5 && timeRemainingSeconds > 0 ? 'true' : undefined
                  }
                  data-critical={timeRemainingSeconds <= 5 ? 'true' : undefined}
                >
                  {minutes}:{seconds}
                </S.TimerValue>
              </Flex>
            </S.InfoBlock>
            <S.InfoGroup>
              <S.PauseButton type="button" onClick={handlePause} aria-label="Пауза">
                <PauseIcon />
              </S.PauseButton>
            </S.InfoGroup>
          </S.TopRow>
          <S.GameTitle>{selectedLevel} уровень</S.GameTitle>
          <S.CardsGrid $columns={columns}>
            {cardDeck.map((card, index) => {
              const isMatched = matchedCards[index];
              const isActive = activeIndexes.includes(index);
              const isFlipped = isMatched || isActive;

              return (
                <S.Card
                  key={`${imageSet.id}-lvl${selectedLevel}-pair${card.pairId}-card${card.instance}-slot${index}`}
                  type="button"
                  aria-label={`Карточка ${index + 1}`}
                  onClick={() => handleCardClick(index)}
                  disabled={isResolvingPair || isMatched}
                >
                  <S.CardInner $flipped={isFlipped} $matched={isMatched}>
                    <S.CardBack aria-hidden="true" />
                    <S.CardFront $matched={isMatched}>
                      <S.CardFrontImage
                        src={card.imageSrc}
                        style={{
                          ...getMemoCardImageStyle(card.imageId),
                          filter: card.hueShift ? `hue-rotate(${card.hueShift}deg)` : 'none',
                        }}
                        loading="lazy"
                        alt=""
                        onLoad={handleFrontImageLoad}
                        onError={handleFrontImageError}
                        draggable={false}
                      />
                    </S.CardFront>
                  </S.CardInner>
                </S.Card>
              );
            })}
          </S.CardsGrid>
        </S.GameWrapper>
      </PageContainer>
      <MemoOnboardingOverlay />
      {isRulesRoute && (
        <S.RulesOverlay>
          <Outlet />
        </S.RulesOverlay>
      )}
    </>
  );
}
