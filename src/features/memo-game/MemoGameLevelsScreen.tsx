import { PageContainer, Text, ZewaButton, Heading } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { useMemoGameStore } from './model/memoGameStore';
import * as S from './MemoGameLevelsScreen.styles';
import {
  getMemoLevelConfig,
  getWeeklyMemoImageSet,
  MEMO_IMAGE_SETS,
} from './config/memoLevelsConfig';
import type { MemoLevel } from './types';

const LEVELS: Array<{
  id: MemoLevel;
  title: string;
  description: string;
}> = [
  {
    id: 1,
    title: '1 уровень',
    description: 'Спокойное начало для знакомства с механикой.',
  },
  {
    id: 2,
    title: '2 уровень',
    description: 'Больше карточек и чуть меньше времени на раздумья.',
  },
  {
    id: 3,
    title: '3 уровень',
    description: 'Испытание для самых быстрых и внимательных.',
  },
];

export function MemoGameLevelsScreen() {
  const navigate = useNavigate();
  const lockedLevels = useMemoGameStore((s) => s.lockedLevels);
  const setSelectedLevel = useMemoGameStore((s) => s.setSelectedLevel);
  const currentImageSetId = useMemoGameStore((s) => s.currentImageSetId);
  const weeklySet =
    MEMO_IMAGE_SETS.find((set) => set.id === currentImageSetId) ?? getWeeklyMemoImageSet();

  const handlePlay = (level: MemoLevel) => {
    setSelectedLevel(level);
    navigate('/game/memo');
  };

  return (
    <PageContainer title="Игра «Мемо»" onBack={() => navigate(-1)}>
      <Text align="center" size="p3" color="#596471">
        Выберите уровень перед стартом. По мере обновлений мы сможем разблокировать новые режимы.
      </Text>
      <Text align="center" size="p4" color="#596471">
        Текущий набор карточек: {weeklySet.label}
      </Text>
      <S.LevelsWrapper>
        {LEVELS.map((level) => {
          const isLocked = lockedLevels[level.id];
          const config = getMemoLevelConfig(level.id);
          return (
            <S.LevelCard key={level.id} $locked={isLocked}>
              <S.LevelHeader>
                <S.LevelInfo>
                  <Heading size="h3">{level.title}</Heading>
                  <Text size="p4" color="#596471">
                    {level.description}
                  </Text>
                  <Text size="p4" color="#8893A0">
                    Поле: {config.rows} × {config.columns} • {config.pairs} пар
                  </Text>
                </S.LevelInfo>
              </S.LevelHeader>
              <ZewaButton
                variant="blue-b"
                disabled={isLocked}
                onClick={() => handlePlay(level.id)}
              >
                {isLocked ? 'Скоро' : 'Играть'}
              </ZewaButton>
            </S.LevelCard>
          );
        })}
      </S.LevelsWrapper>
    </PageContainer>
  );
}
