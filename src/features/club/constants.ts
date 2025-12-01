export const CLUB_ONBOARDING_KEY = 'clubOnboardingSeen';
type ClubTask = {
  description: string;
  reward: string;
  id: string;
  image?: string;
};

export const TASKS: ClubTask[] = [
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
    description:
      'Купите туалетную бумагу Zewa Deluxe Без аромата, 3 слоя, 8 рулонов и загрузите чек, подтверждающий покупку.',
    reward: 'Покупайте!',
    id: 'task',
    image: '/assets/images/prizes/3-tp.png',
  },
  // {
  //   description:
  //     'Купите Бумажные полотенца Zewa Premium Decor (2 рулона) и загрузите чек, подтверждающий покупку.',
  //   reward: 'Покупайте!',
  //   id: 'task',
  //   image: '/assets/images/prizes/premium-tissue.webp',
  // },
];
export const WINNERS = [
  {
    period: 'Неделя 1',
    duration: 'С 01.08 по 10.08',
    participants: ['@name_tg***', '#id87378***'],
  },
];
