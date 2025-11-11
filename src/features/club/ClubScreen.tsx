import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Text } from '@/shared/ui';
import { useUserStore } from '@/shared/model';
import { TabsWrapper, Tabs, TabButton } from '../tournament/TournamentScreen.styles';
import * as S from './ClubScreen.styles';
import Heading from '@/components/UI/heading';
import { TASKS, WINNERS } from './constants';
import { useStandings } from '../tournament/useStandings';

type Tab = 'tasks' | 'winners';

export function ClubScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('tasks');
  const navigate = useNavigate();
  const isInClub = useUserStore((s) => s.userData?.user.is_in_club ?? false);
  const clubTasks = useUserStore((s) => s.userData?.user.club_tasks ?? null);
  const telegramId = useUserStore((s) => s.userData?.user.id ?? null);
  const { data } = useStandings(telegramId || 0);

  console.info(data);

  if (!telegramId) return <></>;
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
                  <S.CardHeader>
                    <S.RoundNumber $isCompleted={isTaskCompleted}>{index + 1}</S.RoundNumber>
                    {task.reward}
                  </S.CardHeader>
                  <Text as="p" size="p4" style={{ margin: 0 }}>
                    {task.description}
                  </Text>
                </S.Card>
              );
            })}
          </S.Content>
        </>
      ) : (
        <>
          <S.Description>
            <Text as="p" size="p4" color="#fff" align="center">
              Победители розыгрыша новогоднего бокса
            </Text>
          </S.Description>

          <S.Content>
            {WINNERS.length
              ? WINNERS.map((group, idx) => (
                  <Fragment key={`group-${idx}`}>
                    <Heading level={3} style={{ margin: 0 }}>
                      {group.period}
                    </Heading>
                    <Text as="p" size="p4" align="center" color="#fff" style={{ margin: 0 }}>
                      {group.duration}
                    </Text>
                  </Fragment>
                ))
              : null}
          </S.Content>
        </>
      )}
    </PageContainer>
  );
}
