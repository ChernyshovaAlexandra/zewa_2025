export const CLUB_ONBOARDING_KEY = 'clubOnboardingSeen';
type ClubTask = {
  description: string;
  reward: string;
  id: string;
  image?: string;
};

const BASE_TASKS: ClubTask[] = [
  {
    description:
      'Каждый день (с понедельника по воскресенье) пройдите хотя бы одну игру любого уровня сложности.',
    reward: 'Играйте!',
    id: 'visit',
  },
  {
    description:
      'Пригласите не менее трёх друзей по реферальной ссылке (каждый из них должен сыграть хотя бы в одну игру).',
    reward: 'Приглашайте!',
    id: 'referal',
  },
  {
    // start: '2024-12-15',
    // end: '2024-12-21',

    description:
      'Купите Бумажные полотенца Zewa Premium Decor (2 рулона) и загрузите чек, подтверждающий покупку.',
    reward: 'Покупайте!',
    id: 'task',
    image: '/assets/images/prizes/premium-tissue.webp',
  },
];

type ScheduledTask = {
  start: string;
  end: string;
  task: ClubTask;
};

const WEEKLY_PURCHASE_TASKS: ScheduledTask[] = [
  {
    start: '2024-12-08',
    end: '2024-12-14',
    task: {
      description:
        'Купите Туалетнаю бумагу Zewa Just 1, 4 слоя (4 рулона) и загрузите чек, подтверждающий покупку.',
      reward: 'Покупайте!',
      id: 'task',
      image: '/assets/images/prizes/1-jo.png',
    },
  },
  {
    start: '2024-12-15',
    end: '2024-12-21',
    task: {
      description:
        'Купите Бумажные полотенца Zewa Premium Decor (2 рулона) и загрузите чек, подтверждающий покупку.',
      reward: 'Покупайте!',
      id: 'task',
      image: '/assets/images/prizes/premium-tissue.webp',
    },
  },
  {
    start: '2024-12-22',
    end: '2024-12-28',
    task: {
      description:
        'Купите туалетную бумагу Zewa Deluxe Без аромата, 3 слоя, 8 рулонов и загрузите чек, подтверждающий покупку.',
      reward: 'Покупайте!',
      id: 'task',
      image: '/assets/images/prizes/3-tp.png',
    },
  },
];

const MS_IN_DAY = 24 * 60 * 60 * 1000;

const parseDateRangeBoundary = (date: string) => {
  const [year, month, day] = date.split('-').map(Number);

  return Date.UTC(year, (month ?? 1) - 1, day ?? 1);
};

export const getWeeklyPurchaseTask = (today = new Date()): ClubTask => {
  const now = today.getTime();

  const scheduled = WEEKLY_PURCHASE_TASKS.find(({ start, end }) => {
    const startDate = parseDateRangeBoundary(start);
    const endDate = parseDateRangeBoundary(end) + MS_IN_DAY - 1;

    return now >= startDate && now <= endDate;
  });

  return scheduled?.task ?? WEEKLY_PURCHASE_TASKS[0]?.task;
};

export const TASKS: ClubTask[] = [...BASE_TASKS];
export const WINNERS = [
  {
    period: 'Неделя 1',
    duration: 'С 01.08 по 10.08',
    participants: ['@name_tg***', '#id87378***'],
  },
];
