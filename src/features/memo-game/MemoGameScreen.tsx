import { useEffect, useMemo, useState, type SyntheticEvent } from 'react';
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

interface CardSlot {
  pairId: number;
  imageIndex: number;
  instance: number;
}

export function MemoGameScreen() {
  useMemoHowToPlayEntry();
  const selectedLevel = useMemoGameStore((s) => s.selectedLevel);
  const currentImageSetId = useMemoGameStore((s) => s.currentImageSetId);
  const navigate = useNavigate();
  const { rows, columns, pairs } = getMemoLevelConfig(selectedLevel);
  const imageSet =
    MEMO_IMAGE_SETS.find((set) => set.id === currentImageSetId) ?? getWeeklyMemoImageSet();
  const totalCards = rows * columns;

  const cardDeck = useMemo<CardSlot[]>(() => {
    return Array.from({ length: pairs }, (_, pairId) => {
      const imageIndex = pairId % CARD_IMAGE_COUNT;
      return [
        { pairId, imageIndex, instance: 0 },
        { pairId, imageIndex, instance: 1 },
      ];
    })
      .flat()
      .slice(0, totalCards);
  }, [pairs, totalCards]);

  const [flippedCards, setFlippedCards] = useState<boolean[]>(() => Array(totalCards).fill(false));

  useEffect(() => {
    setFlippedCards(Array(totalCards).fill(false));
  }, [selectedLevel, currentImageSetId, totalCards]);

  useEffect(() => {
    const uniqueImageIndexes = Array.from(new Set(cardDeck.map((card) => card.imageIndex)));
    uniqueImageIndexes.forEach((imageIndex) => {
      const img = new Image();
      img.src = `${CARD_IMAGE_BASE_PATH}/${imageIndex + 1}.png`;
    });
  }, [cardDeck]);

  const handleCardClick = (index: number) => {
    setFlippedCards((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  };

  const getCardImageSrc = (imageIndex: number) => `${CARD_IMAGE_BASE_PATH}/${imageIndex + 1}.png`;

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

  return (
    <>
      <PageContainer fullscreen title="Мемо" onBack={() => navigate(-1)}>
        <S.GameWrapper>
          <S.InfoBlock>
            <Heading size="h3">Уровень {selectedLevel}</Heading>
          </S.InfoBlock>
          <S.CardsGrid $columns={columns}>
            {cardDeck.map((card, cardIndex) => (
              <S.Card
                key={`${imageSet.id}-lvl${selectedLevel}-pair${card.pairId}-inst${card.instance}-slot${cardIndex}`}
                type="button"
                aria-label={`Карточка ${cardIndex + 1}`}
                onClick={() => handleCardClick(cardIndex)}
              >
                <S.CardInner $flipped={flippedCards[cardIndex]}>
                  <S.CardBack aria-hidden="true" />
                  <S.CardFront>
                    <S.CardFrontImage
                      src={getCardImageSrc(card.imageIndex)}
                      loading="lazy"
                      alt=""
                      onLoad={handleFrontImageLoad}
                      onError={handleFrontImageError}
                      draggable={false}
                    />
                  </S.CardFront>
                </S.CardInner>
              </S.Card>
            ))}
          </S.CardsGrid>
        </S.GameWrapper>
      </PageContainer>
      <MemoOnboardingOverlay />
    </>
  );
}
