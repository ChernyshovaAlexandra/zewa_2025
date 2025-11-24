import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Text, ZewaButton } from '@/shared/ui';
import { useStartDataStore, useUserStore } from '@/shared/model';
import { TabsWrapper, Tabs, TabButton } from '../tournament/TournamentScreen.styles';
import * as S from './ClubScreen.styles';
import Heading from '@/components/UI/heading';
import { TASKS } from './constants';
import { useStandings } from '../tournament/useStandings';
import { smartMaskName } from '@/utils';
import { useTelegramService } from '@/contexts/TelegramContext';

type Tab = 'tasks' | 'winners';

export function ClubScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('tasks');
  const navigate = useNavigate();
  const isInClub = useUserStore((s) => s.userData?.user.is_in_club ?? false);
  const clubTasks = useUserStore((s) => s.userData?.user.club_tasks ?? null);
  const user = useUserStore((s) => s.user);
  const tgReferralLink = useStartDataStore((s) => s.tg_referral_link);
  const telegram = useTelegramService();
  const handleShare = () => {
    if (!tgReferralLink) return;
    const text = '\nПрисоединяйся к игре от Zewa по моей ссылке — и выигрывай призы до 100 000 ₽!';
    const shareUrl =
      `https://t.me/share/url?` +
      `url=${encodeURIComponent(tgReferralLink)}` +
      `&text=${encodeURIComponent(text)}`;
    telegram.openTelegramLink(shareUrl);
  };

  const { data } = useStandings(user?.id || 0);

  const clubWinnerEntries = Object.entries(data?.club_winners ?? {})
    .map(([period, winner]) => {
      const normalizedWinners = Array.isArray(winner) ? winner : winner ? [winner] : [];
      return [period, normalizedWinners] as [string, { name: string; prize: string }[]];
    })
    .filter(([, winners]) => winners.length)
    .sort((a, b) => {
      const left = Number(a[0]);
      const right = Number(b[0]);
      const bothNumeric = !Number.isNaN(left) && !Number.isNaN(right);
      return bothNumeric ? left - right : a[0].localeCompare(b[0]);
    });

  return (
    <PageContainer
      fullscreen
      withPadding={false}
      title="Клуб помощников Домовёнка"
      onBack={() => navigate(-1)}
    >
      <TabsWrapper>
        <Tabs>
          <TabButton $active={activeTab === 'tasks'} onClick={() => setActiveTab('tasks')}>
            Задания
          </TabButton>
          <TabButton $active={activeTab === 'winners'} onClick={() => setActiveTab('winners')}>
            Победители
          </TabButton>
        </Tabs>
      </TabsWrapper>

      {activeTab === 'tasks' ? (
        <>
          <S.Description>
            <>
              {isInClub ? (
                <>
                  <Heading level={2}>Задание выполнено!</Heading>
                  <Text as="p" size="p4" color="#fff">
                    Вы вступили в Клуб помощников Домовёнка
                  </Text>
                </>
              ) : (
                'Выполните одно из заданий, чтобы попасть в Клуб помощников Домовёнка'
              )}
            </>
          </S.Description>
          <S.Content>
            {TASKS.map((task, index) => {
              const isTaskCompleted = Boolean(clubTasks?.[task.id]);

              return (
                <S.Card key={task.id} $isCompleted={isTaskCompleted}>
                  <S.CardContent>
                    <S.TaskInfo>
                      <S.CardHeader>
                        <S.RoundNumber $isCompleted={isTaskCompleted}>{index + 1}</S.RoundNumber>
                        {task.reward}
                      </S.CardHeader>
                      <Text as="p" size="p4" style={{ margin: 0 }}>
                        {task.description}
                      </Text>
                    </S.TaskInfo>
                    {task.image ? (
                      <S.TaskImageWrapper>
                        <img src={task.image} alt={task.reward} />
                      </S.TaskImageWrapper>
                    ) : null}
                  </S.CardContent>
                  {task.id === 'referal' && tgReferralLink ? (
                    <div style={{ marginTop: 4 }}>
                      <ZewaButton
                        onClick={handleShare}
                        variant="blue-b"
                        style={{
                          textTransform: 'none',
                          paddingRight: 0,
                          paddingLeft: 0,
                          width: 'fit-content',
                          color: '#fff',
                        }}
                      >
                        Пригласить друга
                      </ZewaButton>
                    </div>
                  ) : null}
                </S.Card>
              );
            })}
          </S.Content>
        </>
      ) : (
        <>
          <S.Content>
            <Text as="p" size="p4" align="center" color="#fff">
              Победители розыгрыша новогоднего бокса
            </Text>
            {clubWinnerEntries.length ? (
              clubWinnerEntries.map(([period, winners]) => {
                const isNumericPeriod = !Number.isNaN(Number(period));
                const title = isNumericPeriod ? `Неделя ${period}` : period;

                return (
                  <S.WinnerGroup key={period}>
                    <Heading level={3} style={{ margin: 0 }}>
                      {title}
                    </Heading>
                    <S.WinnerList>
                      {winners.map((winner, idx) => {
                        const isCurrentUser = winner.name === user?.username;

                        return (
                          <S.WinnerItem
                            key={`${period}-${idx}`}
                            data-me={isCurrentUser ? 'true' : undefined}
                          >
                            <S.WinnerName>{smartMaskName(winner.name)}</S.WinnerName>
                          </S.WinnerItem>
                        );
                      })}
                    </S.WinnerList>
                  </S.WinnerGroup>
                );
              })
            ) : (
              <Text as="p" size="p4" align="center" color="#fff">
                Победители появятся после проведения розыгрыша
              </Text>
            )}
          </S.Content>
        </>
      )}
    </PageContainer>
  );
}
