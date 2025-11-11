import { Fragment, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Text } from '@/shared/ui';
import { useUserStore } from '@/shared/model';
import { TabsWrapper, Tabs, TabButton } from '../tournament/TournamentScreen.styles';
import * as S from './ClubScreen.styles';
import Heading from '@/components/UI/heading';
import { TASKS, WINNERS } from './constants';

type Tab = 'tasks' | 'winners';

export function ClubScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('tasks');
  const navigate = useNavigate();
  const isInClub = useUserStore((s) => s.userData?.user.is_in_club ?? false);

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
            {TASKS.map((task, id) => (
              <S.Card key={`task-${id}`} $isCompleted={id === 0}>
                <S.CardHeader>
                  <S.RoundNumber $isCompleted={id === 0}>{id + 1}</S.RoundNumber>
                  {task.reward}
                </S.CardHeader>
                <Text as="p" size="p4" style={{ margin: 0 }}>
                  {task.description}
                </Text>
              </S.Card>
            ))}
          </S.Content>
        </>
      ) : (
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
      )}
    </PageContainer>
  );
}
