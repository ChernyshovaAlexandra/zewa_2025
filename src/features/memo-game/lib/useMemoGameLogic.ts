import { useCallback, useEffect, useMemo, useRef, useState, type SyntheticEvent } from 'react';
import { apiService } from '@/services';
import { useStartDataStore, useUserStore } from '@/shared/model';
import {
  getMemoLevelConfig,
  getWeeklyMemoImageSet,
  MEMO_IMAGE_SETS,
  type MemoImageSet,
} from '../config/memoLevelsConfig';
import { useMemoGameStore } from '../model/memoGameStore';
import { renderMemoFinishModal } from './renderMemoFinishModal';
import { renderMemoPauseModal } from './renderMemoPauseModal';
import { renderMemoRulesModal } from './renderMemoRulesModal';
import type { MemoLevel } from '../types';

const CARD_IMAGE_BASE_PATH = '/assets/images/memo/cards/upd';
const CARD_IMAGE_COUNT = 10;
const CARD_REVEAL_DELAY_MS = 900;
const HUE_SHIFT_STEP = 45;

export interface MemoCardSlot {
  pairId: number;
  imageId: number;
  imageSrc: string;
  instance: number;
  hueShift: number;
}

interface UseMemoGameLogicParams {
  onExit: () => void;
  isInteractionLocked?: boolean;
}

interface UseMemoGameLogicResult {
  selectedLevel: MemoLevel;
  columns: number;
  pairs: number;
  minutes: string;
  seconds: string;
  timeRemainingSeconds: number;
  matchedPairsCount: number;
  cardDeck: MemoCardSlot[];
  matchedCards: boolean[];
  activeIndexes: number[];
  isResolvingPair: boolean;
  imageSet: MemoImageSet;
  handleCardClick: (index: number) => void;
  handlePause: () => void;
  handleFrontImageLoad: (event: SyntheticEvent<HTMLImageElement>) => void;
  handleFrontImageError: (event: SyntheticEvent<HTMLImageElement>) => void;
}

const shuffleDeck = <T,>(items: T[]): T[] => {
  const array = [...items];
  for (let i = array.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
};

export function useMemoGameLogic({
  onExit,
  isInteractionLocked = false,
}: UseMemoGameLogicParams): UseMemoGameLogicResult {
  const selectedLevel = useMemoGameStore((s) => s.selectedLevel);
  const currentImageSetId = useMemoGameStore((s) => s.currentImageSetId);
  const completeLevel = useMemoGameStore((s) => s.completeLevel);
  const username = useUserStore((s) => s.user?.username ?? '');
  const setUserData = useUserStore((s) => s.setUserData);
  const setStartStoreData = useStartDataStore((s) => s.setStartData);

  const { rows, columns, pairs, timeLimitSeconds } = getMemoLevelConfig(selectedLevel);
  const imageSet =
    MEMO_IMAGE_SETS.find((set) => set.id === currentImageSetId) ?? getWeeklyMemoImageSet();
  const totalCards = rows * columns;

  const [restartToken, setRestartToken] = useState(0);

  const cardDeck = useMemo<MemoCardSlot[]>(() => {
    const basePairs = Array.from({ length: pairs }, (_, pairId) => {
      const imageIndex = pairId % CARD_IMAGE_COUNT;
      const variant = Math.floor(pairId / CARD_IMAGE_COUNT);
      const imageId = imageIndex + 1;
      const imageSrc = `${CARD_IMAGE_BASE_PATH}/${imageId}.webp`;
      const hueShift = (variant * HUE_SHIFT_STEP) % 360;

      return [
        { pairId, imageId, imageSrc, instance: 0, hueShift },
        { pairId, imageId, imageSrc, instance: 1, hueShift },
      ];
    }).flat();

    return shuffleDeck(basePairs).slice(0, totalCards);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pairs, totalCards, restartToken]);

  const [activeIndexes, setActiveIndexes] = useState<number[]>([]);
  const [matchedCards, setMatchedCards] = useState<boolean[]>(() =>
    Array(cardDeck.length).fill(false),
  );
  const [isResolvingPair, setIsResolvingPair] = useState(false);
  const [turnsCount, setTurnsCount] = useState(0);
  const [timeRemaining, setTimeRemaining] = useState(timeLimitSeconds);
  const [gameResult, setGameResult] = useState<'playing' | 'success' | 'timeout'>('playing');
  const [isPaused, setIsPaused] = useState(false);
  const [pendingTimeout, setPendingTimeout] = useState(false);

  const matchedPairsCount = useMemo(
    () => Math.floor(matchedCards.filter(Boolean).length / 2),
    [matchedCards],
  );

  useEffect(() => {
    const startMemoGame = async () => {
      try {
        await apiService.gameStart({ game: 'memo', level: selectedLevel });
      } catch (err) {
        console.error('memo gameStart error', err);
      }
    };

    startMemoGame();
  }, [selectedLevel]);

  const resolutionTimeoutRef = useRef<number | null>(null);
  const timerIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    setActiveIndexes([]);
    setMatchedCards(Array(cardDeck.length).fill(false));
    setIsResolvingPair(false);
    setTurnsCount(0);
    setGameResult('playing');
    setTimeRemaining(timeLimitSeconds);
    setIsPaused(false);
    setPendingTimeout(false);

    if (resolutionTimeoutRef.current) {
      window.clearTimeout(resolutionTimeoutRef.current);
      resolutionTimeoutRef.current = null;
    }

    if (timerIntervalRef.current) {
      window.clearInterval(timerIntervalRef.current);
      timerIntervalRef.current = null;
    }

    return () => {
      if (resolutionTimeoutRef.current) {
        window.clearTimeout(resolutionTimeoutRef.current);
        resolutionTimeoutRef.current = null;
      }
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    };
  }, [
    selectedLevel,
    currentImageSetId,
    totalCards,
    cardDeck.length,
    timeLimitSeconds,
    restartToken,
  ]);

  useEffect(() => {
    const imageSources = Array.from(new Set(cardDeck.map((card) => card.imageSrc)));
    imageSources.forEach((src) => {
      const img = new Image();
      img.src = src;
    });
  }, [cardDeck]);

  useEffect(() => {
    if (gameResult !== 'playing' || isPaused || isInteractionLocked) {
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
      return;
    }

    const intervalId = window.setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          window.clearInterval(intervalId);
          timerIntervalRef.current = null;
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    timerIntervalRef.current = intervalId;

    return () => {
      window.clearInterval(intervalId);
      if (timerIntervalRef.current === intervalId) {
        timerIntervalRef.current = null;
      }
    };
  }, [gameResult, isPaused, isInteractionLocked]);

  useEffect(
    () => () => {
      if (resolutionTimeoutRef.current) {
        window.clearTimeout(resolutionTimeoutRef.current);
      }
      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }
    },
    [],
  );

  const refreshUserData = useCallback(async () => {
    try {
      const response = await apiService.start({ username });
      const nextData = response.data.data;
      setStartStoreData(nextData);
      setUserData(nextData);
    } catch (err) {
      console.error('memo refresh user data error', err);
    }
  }, [setStartStoreData, setUserData, username]);

  const submitGameResult = useCallback(
    async (result: boolean) => {
      try {
        await apiService.gameResult({ game: 'memo', result, level: selectedLevel });
        if (result) {
          await refreshUserData();
        }
      } catch (err) {
        console.error('memo gameResult error', err);
      }
    },
    [refreshUserData, selectedLevel],
  );

  const finishGame = useCallback(
    (result: 'success' | 'timeout') => {
      if (gameResult !== 'playing') return;

      if (resolutionTimeoutRef.current) {
        window.clearTimeout(resolutionTimeoutRef.current);
        resolutionTimeoutRef.current = null;
      }

      if (timerIntervalRef.current) {
        window.clearInterval(timerIntervalRef.current);
        timerIntervalRef.current = null;
      }

      const isSuccess = result === 'success';

      setGameResult(result);
      setIsResolvingPair(false);
      setActiveIndexes([]);
      setIsPaused(false);

      if (isSuccess) {
        completeLevel(selectedLevel);
      }

      const timeSpentSeconds = Math.min(
        timeLimitSeconds,
        Math.max(0, timeLimitSeconds - timeRemaining),
      );

      renderMemoFinishModal({
        level: selectedLevel,
        result,
        totalPairs: pairs,
        matchedPairs: matchedPairsCount,
        turns: turnsCount,
        timeLimitSeconds,
        timeSpentSeconds: result === 'timeout' ? timeLimitSeconds : timeSpentSeconds,
        onRestart: () => {
          setRestartToken((prev) => prev + 1);
        },
        onExit: () => {
          onExit();
        },
      });

      void submitGameResult(isSuccess);
    },
    [
      gameResult,
      completeLevel,
      selectedLevel,
      matchedPairsCount,
      timeLimitSeconds,
      timeRemaining,
      pairs,
      turnsCount,
      onExit,
      submitGameResult,
    ],
  );

  const handleCardClick = useCallback(
    (index: number) => {
      if (gameResult !== 'playing' || isPaused || isResolvingPair || isInteractionLocked) return;
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
        setTurnsCount((prev) => prev + 1);

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
    },
    [activeIndexes, cardDeck, gameResult, isPaused, isResolvingPair, matchedCards, isInteractionLocked],
  );

  const handlePause = useCallback(() => {
    if (gameResult !== 'playing' || isPaused || isInteractionLocked) return;

    setIsPaused(true);

    renderMemoPauseModal({
      onResume: () => {
        setIsPaused(false);
      },
      onRules: async () => {
        renderMemoRulesModal({
          onClose: () => {
            setIsPaused(false);
          },
        });
      },
      onExit: async () => {
        setGameResult('timeout');
        setIsPaused(false);
        await submitGameResult(false);
        onExit();
      },
    });
  }, [gameResult, isPaused, isInteractionLocked, onExit, submitGameResult]);

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
    if (!matchedCards.length || gameResult !== 'playing') return;
    if (matchedCards.every(Boolean)) {
      if (pendingTimeout) {
        setPendingTimeout(false);
      }
      finishGame('success');
    }
  }, [matchedCards, gameResult, finishGame, pendingTimeout]);

  useEffect(() => {
    if (timeRemaining === 0 && gameResult === 'playing') {
      if (isResolvingPair) {
        setPendingTimeout(true);
        return;
      }
      finishGame('timeout');
    }
  }, [timeRemaining, gameResult, finishGame, isResolvingPair]);

  useEffect(() => {
    if (!pendingTimeout || gameResult !== 'playing' || isResolvingPair) return;
    setPendingTimeout(false);
    if (matchedCards.every(Boolean)) {
      finishGame('success');
    } else {
      finishGame('timeout');
    }
  }, [pendingTimeout, gameResult, isResolvingPair, matchedCards, finishGame]);

  const minutes = Math.floor(timeRemaining / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeRemaining % 60).toString().padStart(2, '0');

  return {
    selectedLevel,
    columns,
    pairs,
    minutes,
    seconds,
    timeRemainingSeconds: timeRemaining,
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
  };
}
