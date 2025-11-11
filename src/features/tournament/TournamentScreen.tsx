import { PageContainer, Text } from '@/shared/ui';
import { smartMaskName } from '@/utils';
import { useStandings } from './useStandings';

import * as S from './TournamentScreen.styles';
import { Spinner } from '@vkontakte/vkui';
import { useUserStore } from '@/shared/model';
import { prize_types_data } from '../prizes/mocks';
import { useNavigate } from 'react-router-dom';

export function TournamentScreen() {
  const user = useUserStore((s) => s.user);
  const navigate = useNavigate();
  const { data, loading, error } = useStandings(user?.id || 0);

  const pageTitle = 'Результаты розыгрыша';

  if (loading) {
    return (
      <PageContainer fullscreen scrollable title={pageTitle}>
        <Spinner />
      </PageContainer>
    );
  }

  if (error || !data) {
    return (
      <PageContainer fullscreen scrollable title={pageTitle}>
        <Text color="#fff" align="center">
          Не удалось загрузить таблицу&nbsp;— попробуйте позже
        </Text>
      </PageContainer>
    );
  }

  const drawEntries = Object.entries(data.draw_winners ?? {});

  return (
    <PageContainer fullscreen scrollable title={pageTitle} onBack={() => navigate('/')}>
      {drawEntries.some(([, winners]) => winners.length) ? (
        drawEntries.map(([week, winners]) => {
          if (!winners.length) return null;
          return (
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
                  <S.PrizeItem key={`${week}-${i}`}>
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
          );
        })
      ) : (
        <Text color="#fff" align="center">
          Победители появятся позже
        </Text>
      )}
    </PageContainer>
  );
}
