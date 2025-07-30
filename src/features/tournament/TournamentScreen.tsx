import { Fragment, useState } from 'react';
import { PageContainer, Text } from '@/shared/ui';
import { applyNbsp, maskName } from '@/utils';
import { useStandings } from './useStandings';

import * as S from './TournamentScreen.styles';
import { Spinner } from '@vkontakte/vkui';
import { useUserStore } from '@/shared/model';
import { prize_types_data } from '../prizes/mocks';
import { useNavigate } from 'react-router-dom';

export function TournamentScreen() {
  const [active, setActive] = useState<'players' | 'winners'>('players');
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();
  const { data, loading, error } = useStandings(user?.id || 0);

  if (loading) {
    return (
      <PageContainer fullscreen scrollable title="Турнирная таблица">
        <Spinner />
      </PageContainer>
    );
  }

  if (error || !data) {
    return (
      <PageContainer fullscreen scrollable title="Турнирная таблица">
        <Text color="#fff" align="center">
          Не удалось загрузить таблицу&nbsp;— попробуйте позже
        </Text>
      </PageContainer>
    );
  }
  const topPlayers = data.topPlayers
    .slice()
    .sort((a, b) => b.points - a.points)
    .map((p, idx) => ({ place: idx + 1, ...p }));

  const winners = Object.values(data.draw_winners)[0] ?? [];

  return (
    <PageContainer fullscreen scrollable title="Турнирная таблица" onBack={() => navigate('/')}>
      <S.TabsWrapper>
        <S.Tabs>
          <S.TabButton $active={active === 'players'} onClick={() => setActive('players')}>
            Лучшие игроки
          </S.TabButton>
          <S.TabButton $active={active === 'winners'} onClick={() => setActive('winners')}>
            Победители
          </S.TabButton>
        </S.Tabs>
      </S.TabsWrapper>
      {active === 'players' ? (
        <Fragment>
          <Text style={{ color: '#fff', lineHeight: 1.4, fontSize: '14px', textAlign: 'center' }}>
            {applyNbsp(
              `Результаты участников текущей недели по максимальному количеству пойманных предметов.`,
            )}
          </Text>
          <S.Table>
            <thead>
              <tr>
                <th>Место</th>
                <th>Имя</th>
                <th>Очки</th>
              </tr>
            </thead>
            <tbody>
              {topPlayers.map((p) => (
                <tr key={p.place}>
                  <td>{p.place}</td>
                  <td>{maskName(p.name)}</td>
                  <td>{p.points}</td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </Fragment>
      ) : (
        <div>
          <Text style={{ color: '#fff', lineHeight: 1.4, fontSize: '14px', textAlign: 'center' }}>
            <b>Неделя 1</b>
            <br />
            С&nbsp;01.08&nbsp;по&nbsp;10.08
          </Text>
          {winners.map((w, i) => {
            const img = prize_types_data[w.name]?.img || '/assets/images/prize-bg.png';
            return (
              <S.PrizeItem key={i}>
                <div>
                  <Text color="#1235AB" weight={900}>
                    {maskName(w.name)}
                  </Text>
                  <Text size="p4" color="#596471">
                    {w.prize}
                  </Text>
                </div>
                <img src={img} alt={w.prize} width={50} height={50} />
              </S.PrizeItem>
            );
          })}
        </div>
      )}
    </PageContainer>
  );
}
