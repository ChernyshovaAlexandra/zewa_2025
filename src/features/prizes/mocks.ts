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
    img: '',
    img_thumb: '',
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Главный приз': {
    img: '',
    img_thumb: '',
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Бытовая техника': {
    img: '',
    img_thumb: '',
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Сертификат на 500 руб': {
    img: '',
    img_thumb: '',
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Сертификат на 1000 руб': {
    img: '',
    img_thumb: '',
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Годовой запас Zewa': {
    img: '',
    img_thumb: '',
    description: 'Набор туалетной бумаги  Zewa Deluxe',
    manager: true,
  },
  'Робот-пылесос': {
    img: '',
    img_thumb: '',
    description: 'Xiaomi Robot Vacuum S10 EU',
    manager: true,
  },
  Смартфон: {
    description: 'Смартфон Apple iPhone 15 128 Гб',
    img: '',
    img_thumb: '',
    manager: true,
  },
  Пароочиститель: {
    img: '',
    img_thumb: '',
    description: 'Kitfort КТ-5181',
    manager: true,
  },
  'Робот для мойки окон': {
    img: '',
    img_thumb: '',
    manager: true,
  },
  'Аэрогриль Xiaomi': {
    img: '',
    img_thumb: '',
    description: 'Xiaomi Smart Air Fryer Pro 4L MAF05',
    manager: true,
  },
  'Аэрогриль Tefal': {
    img: '',
    img_thumb: '',
    description: 'Tefal Air Fry Ultra EY111B15, 4.2 л',
    manager: true,
  },
  Аэрогриль: {
    img: '',
    img_thumb: '',
    description: 'Tefal Air Fry Ultra EY111B15, 4.2 л',
    manager: true,
  },
  'Очиститель воздуха': {
    img: '',
    img_thumb: '',
    description: `Xiaomi Smart Air Purifier 4 Lite EU AC-M17-SC`,
    manager: true,
  },
};
