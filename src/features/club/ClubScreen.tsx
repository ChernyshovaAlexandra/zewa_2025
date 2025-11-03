import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PageContainer, Text } from '@/shared/ui';
import { TabsWrapper, Tabs, TabButton } from '../tournament/TournamentScreen.styles';
import * as S from './ClubScreen.styles';

type Tab = 'tasks' | 'winners';

const TASKS = [
  {
    title: 'Неделя 1',
    description:
      'Пройдите все уровни мемо-игры и загрузите чек с продукцией Zewa, чтобы получить статус помощника.',
    reward: '10 баллов клуба',
  },
  {
    title: 'Неделя 2',
    description:
      'Поделитесь приглашением другу через Telegram и вернитесь в игру, чтобы собрать награду.',
    reward: 'Фирменный стикерпак',
  },
  {
    title: 'Неделя 3',
    description:
      'Соберите 3 победы подряд в мемо-игре и поддержите команду Домовёнка в турнире.',
    reward: 'Участие в розыгрыше призов недели',
  },
];

const WINNERS = [
  {
    period: 'Неделя 1',
    participants: [
      { name: 'Анна Петрова', city: 'Москва' },
      { name: 'Илья Смирнов', city: 'Санкт-Петербург' },
      { name: 'Мария Котова', city: 'Нижний Новгород' },
    ],
  },
  {
    period: 'Неделя 2',
    participants: [
      { name: 'Ксения Лебедева', city: 'Екатеринбург' },
      { name: 'Роман Федоров', city: 'Новосибирск' },
      { name: 'Ольга Соколова', city: 'Краснодар' },
    ],
  },
  {
    period: 'Неделя 3',
    participants: [
      { name: 'Дмитрий Васильев', city: 'Воронеж' },
      { name: 'Юлия Орлова', city: 'Казань' },
      { name: 'Степан Никифоров', city: 'Самара' },
    ],
  },
];

export function ClubScreen() {
  const [activeTab, setActiveTab] = useState<Tab>('tasks');
  const navigate = useNavigate();

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
        <S.Content>
          {TASKS.map((task) => (
            <S.Card key={task.title}>
              <S.CardHeader>
                <S.Badge>{task.title}</S.Badge>
                <Text color="var(--main-blue)" weight={700} size="p2">
                  {task.reward}
                </Text>
              </S.CardHeader>
              <Text as="p" size="p4" color="var(--main-blue)">
                {task.description}
              </Text>
            </S.Card>
          ))}
        </S.Content>
      ) : (
        <S.Content>
          {WINNERS.map((group) => (
            <S.Card key={group.period}>
              <S.Badge>{group.period}</S.Badge>
              <S.WinnerList>
                {group.participants.map((participant) => (
                  <li key={participant.name}>
                    <Text as="span" weight={700} color="var(--main-blue)">
                      {participant.name}
                    </Text>
                    <Text as="span" size="p4" color="#4076FF">
                      {participant.city}
                    </Text>
                  </li>
                ))}
              </S.WinnerList>
            </S.Card>
          ))}
        </S.Content>
      )}
    </PageContainer>
  );
}
