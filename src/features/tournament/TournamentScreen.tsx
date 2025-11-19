import { PageContainer, Text } from '@/shared/ui';
import { smartMaskName } from '@/utils';
import { useStandings } from './useStandings';

import * as S from './TournamentScreen.styles';
import { Spinner } from '@vkontakte/vkui';
import { useUserStore } from '@/shared/model';
import { prize_types_data } from '../prizes/mocks';
import { useNavigate } from 'react-router-dom';

// TODO: check
const WEEK_PERIODS: Record<string, string> = {
  '1': 'С\u00a019\u00a0ноября\u00a02025\u00a0года\u00a0по\u00a023\u00a0ноября\u00a02025',
  '2': 'С\u00a024\u00a0ноября\u00a02025\u00a0года\u00a0по\u00a030\u00a0ноября\u00a02025',
  '3': 'С\u00a001\u00a0декабря\u00a02025\u00a0года\u00a0по\u00a007\u00a0декабря\u00a02025',
  '4': 'С\u00a008\u00a0декабря\u00a02025\u00a0года\u00a0по\u00a014\u00a0декабря\u00a02025',
  '5': 'С\u00a015\u00a0декабря\u00a02025\u00a0года\u00a0по\u00a021\u00a0декабря\u00a02025',
  '6': 'С\u00a022\u00a0декабря\u00a02025\u00a0года\u00a0по\u00a028\u00a0декабря\u00a02025',
};

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

                {WEEK_PERIODS[week] ? <>{WEEK_PERIODS[week]}</> : null}
              </Text>

              {(winners as Array<{ name: string; prize: string }>).map((w, i) => {
                console.info(winners[i])
                const img = prize_types_data[winners[i].prize]?.img || '/assets/images/prize-bg.png';
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
