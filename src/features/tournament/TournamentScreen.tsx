import { useState } from 'react';
import { PageContainer, Text } from '@/shared/ui';
import { applyNbsp, maskName } from '@/utils';
import * as S from './TournamentScreen.styles';

interface Player {
  place: number;
  name: string;
  points: number;
}

interface Winner {
  name: string;
  prize: string;
  image: string;
}

const topPlayers: Player[] = [
  { place: 1, name: 'Алексей', points: 1500 },
  { place: 2, name: 'Мария', points: 1300 },
  { place: 3, name: 'Иван', points: 1200 },
  { place: 4, name: 'Екатерина', points: 1100 },
  { place: 5, name: 'Дмитрий', points: 1000 },
];

const winners: Winner[] = [
  {
    name: 'Ольга Петрова',
    prize: 'Скейтборд',
    image: './assets/images/items/skateboard.png',
  },
  {
    name: 'Никита Сидоров',
    prize: 'Наушники',
    image: './assets/images/items/headphones.png',
  },
];

export function TournamentScreen() {
  const [active, setActive] = useState<'players' | 'winners'>('players');

  return (
    <PageContainer fullscreen scrollable title="Турнирная таблица">
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
        <>
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
        </>
      ) : (
        <div>
          <Text style={{ color: '#fff', lineHeight: 1.4, fontSize: '14px', textAlign: 'center' }}>
            <b>Неделя 1</b>
            <br />С 01.08 по 10.08
          </Text>
          {winners.map((w, i) => (
            <S.PrizeItem key={i}>
              <div>
                <Text color="#1235AB" weight={900}>
                  {maskName(w.name)}
                </Text>
                <Text size="p4" color="#596471">
                  {w.prize}
                </Text>
              </div>
              <img src={w.image} alt={w.prize} width={50} height={50} />
            </S.PrizeItem>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
