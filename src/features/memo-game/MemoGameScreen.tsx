import { Flex } from 'antd';
import { PageContainer, PauseIcon, SnowflakeIcon } from '@/shared/ui';
import * as S from './MemoGameScreen.styles';
import { MemoOnboardingOverlay } from './ui/MemoOnboardingOverlay';
import { useMemoHowToPlayEntry } from './lib/useMemoHowToPlayEntry';
import { useNavigate } from 'react-router-dom';
import { useCallback } from 'react';
import { useMemoGameLogic } from './lib/useMemoGameLogic';

export function MemoGameScreen() {
  useMemoHowToPlayEntry();

  const navigate = useNavigate();
  const handleExit = useCallback(() => {
    navigate('/');
  }, [navigate]);

  const {
    selectedLevel,
    columns,
    pairs,
    minutes,
    seconds,
    matchedPairsCount,
    cardDeck,
    matchedCards,
    activeIndexes,
    isResolvingPair,
    imageSet,
    handleCardClick,
    handlePause,
    handleFrontImageLoad,
    handleFrontImageError,
  } = useMemoGameLogic({ onExit: handleExit });

  return (
    <>
      <PageContainer
        fullscreen
        style={{
          background: "url('/assets/images/memo/bg.webp') no-repeat center",
          backgroundSize: 'cover',
        }}
      >
        <S.GameWrapper>
          <S.TopRow>
            <S.InfoBlock aria-label={`Оставшееся время ${minutes}:${seconds}`}>
              <Flex align="center" gap="6px">
                <img width={32} height={32} src="/assets/images/memo/timer-icon.png" />
                <S.TimerValue>
                  {minutes}:{seconds}
                </S.TimerValue>
              </Flex>
            </S.InfoBlock>
            <S.InfoGroup>
              <S.InfoBlock
                aria-label={`Собрано снежинок ${matchedPairsCount} из ${pairs}`}
                data-testid="memo-topbar-snowflakes"
              >
                <S.SnowflakeRow>
                  <SnowflakeIcon width={22} height={22} color="var(--main-blue)" />
                  <S.SnowflakeCount>
                    {matchedPairsCount}/{pairs}
                  </S.SnowflakeCount>
                </S.SnowflakeRow>
              </S.InfoBlock>
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
                        style={
                          card.hueShift
                            ? { filter: `hue-rotate(${card.hueShift}deg)` }
                            : { filter: 'none' }
                        }
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
    </>
  );
}
