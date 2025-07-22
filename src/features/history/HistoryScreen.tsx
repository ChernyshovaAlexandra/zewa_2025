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

export function HistoryScreen() {
  const [active, setActive] = useState<'checks' | 'coins'>('checks');
  const [checks, setChecks] = useState<HistoryCheck[]>([]);

  const user = useUserStore((s) => s.user);

  useEffect(() => {
    if (!user) return;
    apiService
      .history({ telegram_id: user.id })
      .then((res) => {
        // response.data.checks expected
        const data = (res as any).data?.checks ?? [];
        setChecks(data);
      })
      .catch((err) => {
        console.error('history error', err);
      });
  }, [user]);

  const renderChecks = () => {
    if (!checks.length) {
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

  const renderCoins = () => (
    <Text weight={700} color="white" align="center">
      История начисления монет пока недоступна
    </Text>
  );

  return (
    <PageContainer fullscreen title="История начислений">
      <S.TabsWrapper>
        <S.Tabs>
          <S.TabButton $active={active === 'checks'} onClick={() => setActive('checks')}>
            Чеки
          </S.TabButton>
          <S.TabButton $active={active === 'coins'} onClick={() => setActive('coins')}>
            Монеты
          </S.TabButton>
        </S.Tabs>
      </S.TabsWrapper>
      {active === 'checks' ? renderChecks() : renderCoins()}
    </PageContainer>
  );
}
