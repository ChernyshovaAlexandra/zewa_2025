/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useEffect, useMemo, useState } from 'react';
import { PageContainer, Text } from '@/shared/ui';
import { useUserStore } from '@/shared/model';
import { apiService } from '@/services';
import * as S from '../tournament/TournamentScreen.styles';
import GameContainer from '../game-container';
import { mockChecks } from './mocks';
import CheckContainer from '../checks/check-container';
import { useNavigate } from 'react-router-dom';

interface HistoryCheck {
  date_time_raw: string;
  coins_earned: number;
  status: string;
  created_at: string;
}

interface GameHistory {
  code: string;
  points_earned: number;
  coins_spent: number;
  day: string;
  status: string;
  coins_earned: number;
}

const ts = (s?: string) => {
  if (!s) return 0;

  /* YYYYMMDDTHHMM */
  const m1 = s.match(/^(\d{4})(\d{2})(\d{2})T(\d{2})(\d{2})$/);
  if (m1) {
    const [, y, mo, d, h, mi] = m1;
    return Date.UTC(+y, +mo - 1, +d, +h, +mi);
  }

  const m2 = s.match(/^(\d{2})\.(\d{2})\.(\d{4})(?:\s+(\d{2}):(\d{2}))?$/);
  if (m2) {
    const [, d, mo, y, h = '0', mi = '0'] = m2;
    return Date.UTC(+y, +mo - 1, +d, +h, +mi);
  }

  /* DD.MM.YY [HH:MM]  → 20YY */
  const m3 = s.match(/^(\d{2})\.(\d{2})\.(\d{2})(?:\s+(\d{2}):(\d{2}))?$/);
  if (m3) {
    const [, d, mo, y2, h = '0', mi = '0'] = m3;
    const y = 2000 + +y2; // «25» → 2025
    return Date.UTC(y, +mo - 1, +d, +h, +mi);
  }

  /* всё остальное — Date.parse() */
  const t = Date.parse(s);
  return isNaN(t) ? 0 : t;
};

export function HistoryScreen() {
  const [active, setActive] = useState<'checks' | 'coins'>('checks');
  const [checks, setChecks] = useState<HistoryCheck[]>([]);
  const [games, setGames] = useState<GameHistory[]>([]);
  const [visibleChecks, setVisibleChecks] = useState(10);
  const [visibleGames, setVisibleGames] = useState(10);

  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const { scrollTop, scrollHeight, clientHeight } = e.currentTarget;
    if (scrollTop + clientHeight >= scrollHeight - 10) {
      if (active === 'checks') {
        setVisibleChecks((v) => Math.min(v + 10, checks.length || mockChecks.length));
      } else {
        setVisibleGames((v) => Math.min(v + 10, games.length));
      }
    }
  };

  useEffect(() => {
    if (!user) return;

    apiService
      .history({ telegram_id: user.id })
      .then((res) => {
        const { data } = res.data ?? [];

        setChecks(data?.checks ?? []);
        setGames(data?.games ?? []);
      })
      .catch((err) => {
        console.error('history error', err);
      });
  }, [user]);

  const sortedChecks = useMemo(
    () =>
      [...checks].sort(
        (a: any, b: any) =>
          ts(b.date_time_raw || b.created_at) - ts(a.date_time_raw || a.created_at),
      ),
    [checks],
  );

  const sortedGames = useMemo(
    () => [...games].sort((a: any, b: any) => ts(b.day) - ts(a.day)),
    [games],
  );

  const renderChecks = () => {
    const data = sortedChecks.length ? sortedChecks : [];
    if (!data.length) {
      return (
        <Text weight={700} color="white" align="center">
          Нет загруженных чеков
        </Text>
      );
    }
    return (
      <>
        {data.slice(0, visibleChecks).map((item, id) => {
          console.info(item.date_time_raw);
          return (
            <CheckContainer
              key={id}
              subtitle={`Чек №${id + 1}`}
              caption={item.date_time_raw}
              coins_earned={item.coins_earned}
              status={item.status}
              check={item}
            />
          );
        })}
      </>
    );
  };

  const renderGames = () => {
    if (!sortedGames.length) {
      return (
        <Text weight={700} color="white" align="center">
          История игр пока пуста
        </Text>
      );
    }
    return (
      <>
        {sortedGames.slice(0, visibleGames).map((item, id) => (
          <GameContainer
            key={id}
            header={item.code !== 'game4' ? `Игра «Снова в школу»` : `Друг присоединился к игре`}
            caption={item.day}
            status={item.status}
            coins_earned={item.coins_earned}
            points_earned={item.code !== 'game4' ? item.points_earned : 0}
          />
        ))}
      </>
    );
  };

  return (
    <PageContainer
      fullscreen
      title="Начисление монет"
      onScroll={handleScroll}
      onBack={() => navigate('/profile')}
    >
      <S.TabsWrapper>
        <S.Tabs>
          <S.TabButton $active={active === 'checks'} onClick={() => setActive('checks')}>
            За чеки
          </S.TabButton>
          <S.TabButton $active={active === 'coins'} onClick={() => setActive('coins')}>
            В игре
          </S.TabButton>
        </S.Tabs>
      </S.TabsWrapper>
      {active === 'checks' ? renderChecks() : renderGames()}
    </PageContainer>
  );
}
