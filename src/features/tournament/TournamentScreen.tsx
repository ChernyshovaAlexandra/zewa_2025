import { Fragment, useState } from 'react';
import { PageContainer, Text } from '@/shared/ui';
import { applyNbsp, smartMaskName } from '@/utils';
import { useStandings } from './useStandings';

import * as S from './TournamentScreen.styles';
import { Spinner } from '@vkontakte/vkui';
import { useUserStore } from '@/shared/model';
import { prize_types_data } from '../prizes/mocks';
import { useNavigate } from 'react-router-dom';
import { Flex } from 'antd';

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

  const mappedPlayers = data.topPlayers
    .slice()
    .sort((a, b) => b.points - a.points)
    .map((p, idx) => ({ place: idx + 1, ...p }));

  const topTen = mappedPlayers.slice(0, 10);

  const currentPlayer = mappedPlayers.find((p) => p.name === user?.username);

  const displayPlayers = currentPlayer
    ? topTen.some((p) => p.name === user?.username)
      ? topTen
      : [...topTen, currentPlayer]
    : topTen;

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
                <th>
                  <img
                    style={{ width: '22px' }}
                    src="/assets/images/snowflake.svg"
                    alt="иконка снежинки"
                  />
                </th>
              </tr>
            </thead>
            <tbody>
              {displayPlayers.map((p, idx) => (
                <tr
                  style={{
                    borderRadius: '10px',
                    background: idx === 0 ? 'rgba(255, 255, 255, 0.30)' : '',
                  }}
                  key={p.place}
                >
                  <td>
                    <Flex gap="5px" align="center">
                      {p.place}{' '}
                      {p.place === 1 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="gold"
                          stroke="gold"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                          <path d="M5 21h14" />
                        </svg>
                      )}
                      {p.place === 2 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          fill="silver"
                          stroke="silver"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                          <path d="M5 21h14" />
                        </svg>
                      )}
                      {p.place === 3 && (
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          viewBox="0 0 24 24"
                          stroke="#CD7F32"
                          fill="#CD7F32"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M11.562 3.266a.5.5 0 0 1 .876 0L15.39 8.87a1 1 0 0 0 1.516.294L21.183 5.5a.5.5 0 0 1 .798.519l-2.834 10.246a1 1 0 0 1-.956.734H5.81a1 1 0 0 1-.957-.734L2.02 6.02a.5.5 0 0 1 .798-.519l4.276 3.664a1 1 0 0 0 1.516-.294z" />
                          <path d="M5 21h14" />
                        </svg>
                      )}
                    </Flex>
                  </td>
                  <td>{smartMaskName(p.name)}</td>
                  <td>{p.points}</td>
                </tr>
              ))}
            </tbody>
          </S.Table>
        </Fragment>
      ) : (
        <>
          {Object.entries(data.draw_winners).map(([week, winners]) => (
            <>
              {winners.length ? (
                <div key={week}>
                  <Text
                    style={{
                      color: '#fff',
                      lineHeight: 1.4,
                      fontSize: '14px',
                      textAlign: 'center',
                      marginBottom: '10px',
                    }}
                  >
                    <b>Неделя {week}</b>
                    <br />

                    {week === '1' ? (
                      <>С&nbsp;05.08&nbsp;по&nbsp;10.08</>
                    ) : week === '2' ? (
                      <>С&nbsp;11.08&nbsp;по&nbsp;17.08</>
                    ) : week === '3' ? (
                      <>С&nbsp;18.08&nbsp;по&nbsp;24.08</>
                    ) : week === '4' ? (
                      <>С&nbsp;25.08&nbsp;по&nbsp;31.08</>
                    ) : (
                      <></>
                    )}
                  </Text>

                  {(winners as Array<{ name: string; prize: string }>).map((w, i) => {
                    const img = prize_types_data[w.name]?.img || '/assets/images/prize-bg.png';
                    return (
                      <S.PrizeItem key={i}>
                        <div>
                          <Text color="var(--main-blue)" weight={900}>
                            {smartMaskName(w.name)}
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
              ) : (
                <></>
              )}
            </>
          ))}
        </>
      )}
    </PageContainer>
  );
}
