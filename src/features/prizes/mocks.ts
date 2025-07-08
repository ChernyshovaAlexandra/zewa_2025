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
    img: `/public/assets/images/prizes/100rub.jpg&size=108`,
    img_thumb: `/public/assets/images/prizes/100rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Главный приз': {
    img: `/public/assets/images/prizes/main-prize.jpg&size=108`,
    img_thumb: `/public/assets/images/prizes/main-prize_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Бытовая техника': {
    img: `/public/assets/images/prizes/main-prize.jpg&size=108`,
    img_thumb: `/public/assets/images/prizes/main-prize_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Сертификат на 500 руб': {
    img: `/public/assets/images/prizes/500rub.jpg`,
    img_thumb: `/public/assets/images/prizes/500rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Сертификат на 1000 руб': {
    img: `/public/assets/images/prizes/1000rub.jpg`,
    img_thumb: `/public/assets/images/prizes/1000rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Годовой запас Zewa': {
    img: `/public/assets/images/prizes/zewa.jpg`,
    img_thumb: `/public/assets/images/prizes/zewa_thumb.png`,
    description: 'Набор туалетной бумаги  Zewa Deluxe',
    manager: true,
  },
  'Робот-пылесос': {
    img: `/public/assets/images/prizes/robot.jpg`,
    img_thumb: `/public/assets/images/prizes/robot_thumb.png`,
    description: 'Xiaomi Robot Vacuum S10 EU',
    manager: true,
  },
  Смартфон: {
    description: 'Смартфон Apple iPhone 15 128 Гб',
    img: `/public/assets/images/prizes/iphone.jpg`,
    img_thumb: `/public/assets/images/prizes/iphone_thumb.png`,
    manager: true,
  },
  Пароочиститель: {
    img: `/public/assets/images/prizes/cleaner.jpg`,
    img_thumb: `/public/assets/images/prizes/cleaner_thumb.png`,
    description: 'Kitfort КТ-5181',
    manager: true,
  },
  'Робот для мойки окон': {
    img: `/public/assets/images/prizes/window-cleaner.jpg`,
    img_thumb: `/public/assets/images/prizes/window-cleaner_thumb.png`,
    manager: true,
  },
  'Аэрогриль Xiaomi': {
    img: `/public/assets/images/prizes/oven.jpg`,
    img_thumb: `/public/assets/images/prizes/oven_thumb.png`,
    description: 'Xiaomi Smart Air Fryer Pro 4L MAF05',
    manager: true,
  },
  'Аэрогриль Tefal': {
    img: `/public/assets/images/prizes/aerogril.jpg`,
    img_thumb: `/public/assets/images/prizes/aerogril_thumb.png`,
    description: 'Tefal Air Fry Ultra EY111B15, 4.2 л',
    manager: true,
  },
  Аэрогриль: {
    img: `/public/assets/images/prizes/aerogril.jpg`,
    img_thumb: `/public/assets/images/prizes/aerogril_thumb.png`,
    description: 'Tefal Air Fry Ultra EY111B15, 4.2 л',
    manager: true,
  },
  'Очиститель воздуха': {
    img: `/public/assets/images/prizes/aircleaner.jpg`,
    img_thumb: `/public/assets/images/prizes/aircleaner_thumb.png`,
    description: `Xiaomi Smart Air Purifier 4 Lite EU AC-M17-SC`,
    manager: true,
  },
};
