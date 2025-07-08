export const options = [
  {
    label: 'Промокоды',
    value: 'promocodes',
    'aria-label': 'Промокоды',
  },
  {
    label: 'Призы',
    value: 'prizes',
    'aria-label': 'Призы',
  },
];

export const prize_types_data: Record<
  string,
  {
    img: string;
    img_thumb?: string;
    description?: string;
    manager?: boolean;
  }
> = {
  'Сертификат на 100 руб': {
    img: `/public/images/prizes/100rub.jpg?resize&size=108&format=webp`,
    img_thumb: `/public/images/prizes/100rub_thumb.png?resize&size=110&format=webp`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Главный приз': {
    img: `/public/images/prizes/main-prize.jpg?resize&size=108&format=webp`,
    img_thumb: `/public/images/prizes/main-prize_thumb.png?resize&size=110&format=webp`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Бытовая техника': {
    img: `/public/images/prizes/main-prize.jpg?resize&size=108&format=webp`,
    img_thumb: `/public/images/prizes/main-prize_thumb.png?resize&size=110&format=webp`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Сертификат на 500 руб': {
    img: `/public/images/prizes/500rub.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/500rub_thumb.png?resize&size=110&format=webp`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Сертификат на 1000 руб': {
    img: `/public/images/prizes/1000rub.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/1000rub_thumb.png?resize&size=110&format=webp`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Годовой запас Zewa': {
    img: `/public/images/prizes/zewa.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/zewa_thumb.png?resize&size=110&format=webp`,
    description: 'Набор туалетной бумаги  Zewa Deluxe',
    manager: true,
  },
  'Робот-пылесос': {
    img: `/public/images/prizes/robot.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/robot_thumb.png?resize&size=110&format=webp`,
    description: 'Xiaomi Robot Vacuum S10 EU',
    manager: true,
  },
  Смартфон: {
    description: 'Смартфон Apple iPhone 15 128 Гб',
    img: `/public/images/prizes/iphone.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/iphone_thumb.png?resize&size=110&format=webp`,
    manager: true,
  },
  Пароочиститель: {
    img: `/public/images/prizes/cleaner.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/cleaner_thumb.png?resize&size=110&format=webp`,
    description: 'Kitfort КТ-5181',
    manager: true,
  },
  'Робот для мойки окон': {
    img: `/public/images/prizes/window-cleaner.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/window-cleaner_thumb.png?resize&size=110&format=webp`,
    manager: true,
  },
  'Аэрогриль Xiaomi': {
    img: `/public/images/prizes/oven.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/oven_thumb.png?resize&size=110&format=webp`,
    description: 'Xiaomi Smart Air Fryer Pro 4L MAF05',
    manager: true,
  },
  'Аэрогриль Tefal': {
    img: `/public/images/prizes/aerogril.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/aerogril_thumb.png?resize&size=110&format=webp`,
    description: 'Tefal Air Fry Ultra EY111B15, 4.2 л',
    manager: true,
  },
  Аэрогриль: {
    img: `/public/images/prizes/aerogril.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/aerogril_thumb.png?resize&size=110&format=webp`,
    description: 'Tefal Air Fry Ultra EY111B15, 4.2 л',
    manager: true,
  },
  'Очиститель воздуха': {
    img: `/public/images/prizes/aircleaner.jpg?resize&size=350&format=webp`,
    img_thumb: `/public/images/prizes/aircleaner_thumb.png?resize&size=110&format=webp`,
    description: `Xiaomi Smart Air Purifier 4 Lite EU AC-M17-SC`,
    manager: true,
  },
};
