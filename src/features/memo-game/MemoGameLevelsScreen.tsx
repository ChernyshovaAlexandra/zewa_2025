import { PageContainer, Heading, Text, SnowflakeIcon, PlayIcon } from '@/shared/ui';
import { useNavigate } from 'react-router-dom';
import { useMemoGameStore } from './model/memoGameStore';
import * as S from './MemoGameLevelsScreen.styles';

import type { MemoLevel } from './types';
import { Flex } from 'antd';

const LEVELS: Array<{
  id: MemoLevel;
  title: string;
  description: string | null;
  time: string;
  snowflakes: number;
}> = [
  {
    id: 1,
    title: '1 уровень',
    description: null,
    time: '30 c',
    snowflakes: 6,
  },
  {
    id: 2,
    title: '2 уровень',
    description: 'Загрузите чек с продукцией Zewa, чтобы продолжить игру',
    time: '1 мин',
    snowflakes: 10,
  },
  {
    id: 3,
    title: '3 уровень',
    description: 'Загрузите больше чеков с продукцией Zewa, чтобы продолжить игру',
    time: '2 мин',
    snowflakes: 15,
  },
];

export function MemoGameLevelsScreen() {
  const navigate = useNavigate();
  const lockedLevels = useMemoGameStore((s) => s.lockedLevels);
  const setSelectedLevel = useMemoGameStore((s) => s.setSelectedLevel);

  const handlePlay = (level: MemoLevel) => {
    setSelectedLevel(level);
    navigate('/game/memo');
  };

  return (
    <PageContainer
      fullscreen
      style={{
        background: 'rgba(0, 0, 0, 0.65)',
        backdropFilter: 'blur(8.5px)',
      }}
    >
      <S.LevelsWrapper>
        {LEVELS.map((level) => {
          const isLocked = lockedLevels[level.id];

          return (
            <S.LevelCard key={level.id} $locked={isLocked}>
              <S.LevelHeader>
                <S.LevelInfo>
                  <Heading size="h2">{level.title}</Heading>
                </S.LevelInfo>
              </S.LevelHeader>
              <Flex gap={'10px'} style={{ marginBottom: '1rem' }}>
                <S.BlueInfoBlock>
                  <Flex gap="3px" align="center">
                    <img src="/assets/images/timer.svg" alt="" width={22} height={22} />
                    <Text>{level.time}</Text>
                  </Flex>
                  <Flex gap="3px" align="center">
                    <SnowflakeIcon width={22} height={22} color="#fff" />
                    <Text>{level.snowflakes}</Text>
                  </Flex>
                </S.BlueInfoBlock>
                <S.GameBtnWrapper>
                  <S.GameBtnImg src="/assets/images/play-btn-bg.webp" />
                  <S.GameBtn
                    variant="play"
                    icon={<PlayIcon />}
                    onClick={() => handlePlay(level.id)}
                  >
                    Играть
                  </S.GameBtn>
                </S.GameBtnWrapper>
              </Flex>
              <S.LevelDescription>{level.description}</S.LevelDescription>
            </S.LevelCard>
          );
        })}
      </S.LevelsWrapper>
    </PageContainer>
  );
}
