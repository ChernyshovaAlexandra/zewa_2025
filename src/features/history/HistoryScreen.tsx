import { useEffect, useState } from 'react';
import { PageContainer, Text } from '@/shared/ui';
import { useUserStore } from '@/shared/model';
import { apiService } from '@/services';
import * as S from '../tournament/TournamentScreen.styles';

interface HistoryCheck {
  date_time_raw: string;
  coins_earned: number;
  status: string;
}

interface GameHistory {
  game_id: number;
  points_earned: number;
  coins_spent: number;
  day: string;
  status: string;
  coins_earned: number;
}

export function HistoryScreen() {
  const [active, setActive] = useState<'checks' | 'coins'>('checks');
  const [checks, setChecks] = useState<HistoryCheck[]>([]);
  const [games, setGames] = useState<GameHistory[]>([]);

  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) return;
    apiService
      .history({ telegram_id: user.id })
      .then((res) => {
        const { data } = res.data ?? [];
        console.info(data);
        setChecks(data?.checks);
        setGames(data?.games);
      })
      .catch((err) => {
        console.error('history error', err);
      });
  }, [user]);

  const renderChecks = () => {
    if (!checks?.length) {
      return (
        <Text weight={700} color="white" align="center">
          Нет загруженных чеков
        </Text>
      );
    }
    return (
      <S.Table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>Монеты</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {checks.map((c, i) => (
            <tr key={i}>
              <td>{c.date_time_raw}</td>
              <td>{c.coins_earned}</td>
              <td>{c.status}</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    );
  };

  const renderGames = () => {
    if (!games?.length) {
      return (
        <Text weight={700} color="white" align="center">
          История игр пока пуста
        </Text>
      );
    }

    return (
      <S.Table>
        <thead>
          <tr>
            <th>Дата</th>
            <th>ID игры</th>
            <th>Очки</th>
            <th>Потрачено монет</th>
            <th>Заработано монет</th>
            <th>Статус</th>
          </tr>
        </thead>
        <tbody>
          {games.map((g, i) => (
            <tr key={i}>
              <td>{g.day}</td>
              <td>{g.game_id}</td>
              <td>{g.points_earned}</td>
              <td>{g.coins_spent}</td>
              <td>{g.coins_earned}</td>
              <td>{g.status}</td>
            </tr>
          ))}
        </tbody>
      </S.Table>
    );
  };

  return (
    <PageContainer fullscreen title="Начисление монет">
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
