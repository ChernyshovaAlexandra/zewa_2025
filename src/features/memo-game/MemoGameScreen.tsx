import { useEffect, useMemo, useRef, useState, type SyntheticEvent } from 'react';
import { PageContainer, Heading } from '@/shared/ui';
import * as S from './MemoGameScreen.styles';
import { MemoOnboardingOverlay } from './ui/MemoOnboardingOverlay';
import { useMemoHowToPlayEntry } from './lib/useMemoHowToPlayEntry';
import { useMemoGameStore } from './model/memoGameStore';
import { useNavigate } from 'react-router-dom';
import {
  getMemoLevelConfig,
  getWeeklyMemoImageSet,
  MEMO_IMAGE_SETS,
} from './config/memoLevelsConfig';

const CARD_IMAGE_BASE_PATH = '/assets/images/memo/cards';
const CARD_IMAGE_COUNT = 6;
const CARD_REVEAL_DELAY_MS = 900;
const HUE_SHIFT_STEP = 45;

interface CardSlot {
  pairId: number;
  imageSrc: string;
  instance: number;
  hueShift: number;
}

const shuffleDeck = <T,>(items: T[]): T[] => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export function MemoGameScreen() {
  useMemoHowToPlayEntry();

  const selectedLevel = useMemoGameStore((s) => s.selectedLevel);
  const currentImageSetId = useMemoGameStore((s) => s.currentImageSetId);
  const completeLevel = useMemoGameStore((s) => s.completeLevel);
  const navigate = useNavigate();

  const { rows, columns, pairs } = getMemoLevelConfig(selectedLevel);
  const imageSet =
    MEMO_IMAGE_SETS.find((set) => set.id === currentImageSetId) ?? getWeeklyMemoImageSet();
  const totalCards = rows * columns;

  const cardDeck = useMemo<CardSlot[]>(() => {
    const basePairs = Array.from({ length: pairs }, (_, pairId) => {
      const imageIndex = pairId % CARD_IMAGE_COUNT;
      const variant = Math.floor(pairId / CARD_IMAGE_COUNT);
      const imageSrc = `${CARD_IMAGE_BASE_PATH}/${imageIndex + 1}.png`;
      const hueShift = (variant * HUE_SHIFT_STEP) % 360;

      return [
        { pairId, imageSrc, instance: 0, hueShift },
        { pairId, imageSrc, instance: 1, hueShift },
      ];
    }).flat();

    return shuffleDeck(basePairs).slice(0, totalCards);
  }, [pairs, totalCards]);

  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<boolean[]>(() =>
    Array(cardDeck.length).fill(false),
  );
  const [isResolvingPair, setIsResolvingPair] = useState(false);
  const [isLevelComplete, setIsLevelComplete] = useState(false);

  const resolutionTimeoutRef = useRef<number | null>(null);

  useEffect(() => {
    setActiveIndexes([]);
    setMatchedCards(Array(cardDeck.length).fill(false));
    setIsResolvingPair(false);
    setIsLevelComplete(false);

    if (resolutionTimeoutRef.current) {
      window.clearTimeout(resolutionTimeoutRef.current);
      resolutionTimeoutRef.current = null;
    }
  }, [selectedLevel, currentImageSetId, totalCards, cardDeck.length]);

  useEffect(() => {
    const imageSources = Array.from(new Set(cardDeck.map((card) => card.imageSrc)));
    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [cardDeck]);

  useEffect(
    () => () => {
      if (resolutionTimeoutRef.current) {
        window.clearTimeout(resolutionTimeoutRef.current);
      }
    },
    [],
  );

  const handleCardClick = (index: number) => {
    if (isResolvingPair) return;
    if (matchedCards[index]) return;
    if (activeIndexes.includes(index)) return;

    if (activeIndexes.length === 0) {
      setActiveIndexes([index]);
      return;
    }

    if (activeIndexes.length === 1) {
      const [firstIndex] = activeIndexes;
      const nextActive = [...activeIndexes, index];
      setActiveIndexes(nextActive);
      setIsResolvingPair(true);

      const firstCard = cardDeck[firstIndex];
      const secondCard = cardDeck[index];
      const isMatch = firstCard?.pairId === secondCard?.pairId;

      resolutionTimeoutRef.current = window.setTimeout(() => {
        if (isMatch) {
          setMatchedCards((prev) => {
            const updated = [...prev];
            updated[firstIndex] = true;
            updated[index] = true;
            return updated;
          });
        }
        setActiveIndexes([]);
        setIsResolvingPair(false);
        resolutionTimeoutRef.current = null;
      }, CARD_REVEAL_DELAY_MS);
    }
  };

  const handleFrontImageLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    target.style.opacity = '1';
    target.removeAttribute('aria-hidden');
  };

  const handleFrontImageError = (event: SyntheticEvent<HTMLImageElement>) => {
    const target = event.currentTarget;
    target.onerror = null;
    target.style.opacity = '0';
    target.setAttribute('aria-hidden', 'true');
  };

  useEffect(() => {
    if (!matchedCards.length || isLevelComplete) return;
    if (matchedCards.every(Boolean) && matchedCards.length > 0) {
      setIsLevelComplete(true);
      completeLevel(selectedLevel);
    }
  }, [matchedCards, isLevelComplete, completeLevel, selectedLevel]);

  return (
    <>
      <PageContainer fullscreen title="Мемо" onBack={() => navigate(-1)}>
        <S.GameWrapper>
          <S.InfoBlock>
            <Heading size="h3">Уровень {selectedLevel}</Heading>
          </S.InfoBlock>
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
