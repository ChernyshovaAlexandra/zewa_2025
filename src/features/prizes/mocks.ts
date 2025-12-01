import { CERTIFICATE_SHOW_DEADLINE_SHORT } from '@/shared/constants/promoDates';

export const options = [
  {
    label: 'Купоны',
    value: 'promocodes',
    'aria-label': 'Купоны',
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
    manager?: string;
  }
> = {
  'Новогодний бокс': {
    img: `
    /assets/images/prizes/new-year-box.webp`,
    img_thumb: `
    /assets/images/prizes/new-year-box.webp`,
    description: 'Подарочный набор продукции Zewa Deluxe и праздничных сюрпризов',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Сертификат на 100 руб': {
    img: `
    /assets/images/prizes/100rub_1.webp`,
    img_thumb: `
    /assets/images/prizes/100rub_1.webp`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: `Электронный сертификат придёт вам в\u00A0личных сообщениях в мессенджере. До ${CERTIFICATE_SHOW_DEADLINE_SHORT} года покажите его на кассе при покупке.`,
  },
  'Главный приз': {
    img: `
    /assets/images/prizes/main-prize.webp`,
    img_thumb: `
    /assets/images/prizes/main-prize.webp`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы перечислим деньги на ваш банковский счёт.',
  },
  'Бытовая техника': {
    img: `
    /assets/images/prizes/main-prize.jpg`,
    img_thumb: `
    /assets/images/prizes/main-prize_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Сертификат на 500 руб': {
    img: `
    /assets/images/prizes/500rub.webp`,
    img_thumb: `
    /assets/images/prizes/500rub.webp`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: `Электронный сертификат придёт вам в\u00A0личных сообщениях в мессенджере. До ${CERTIFICATE_SHOW_DEADLINE_SHORT} года покажите его на кассе при покупке.`,
  },
  'Сертификат на 1000 руб': {
    img: `
    /assets/images/prizes/1000rub.jpg`,
    img_thumb: `
    /assets/images/prizes/100rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: `Электронный сертификат придёт вам в\u00A0личных сообщениях в мессенджере. До ${CERTIFICATE_SHOW_DEADLINE_SHORT} года покажите его на кассе при покупке.`,
  },
  'Годовой запас Zewa': {
    img: `/assets/images/prizes/1.webp`,
    img_thumb: `/assets/images/prizes/1.webp`,
    description: 'Запас продукции Zewa Deluxe на год',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  Кофемашина: {
    img: `
    /assets/images/prizes/2.webp`,
    img_thumb: `
    /assets/images/prizes/2.webp`,
    description: 'Современная кофемашина для напитков как в кафе',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Мини-мультиварка': {
    img: `
    /assets/images/prizes/3.webp`,
    img_thumb: `
    /assets/images/prizes/3.webp`,
    description: 'Компактная мультиварка для быстрых домашних блюд',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Отпариватель ручной': {
    img: `
    /assets/images/prizes/4.webp`,
    img_thumb: `
    /assets/images/prizes/4.webp`,
    description: 'Ручной отпариватель для быстрой глажки вещей',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Блендер стационарный': {
    img: `
    /assets/images/prizes/5.webp`,
    img_thumb: `
    /assets/images/prizes/5.webp`,
    description: 'Мощный стационарный блендер для смузи и супов',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  Пароочиститель: {
    img: `
    /assets/images/prizes/6.webp`,
    img_thumb: `
    /assets/images/prizes/6.webp`,
    description: 'Пароочиститель для уборки без химии',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Увлажнитель воздуха': {
    img: `
    /assets/images/prizes/7.webp`,
    img_thumb: `
    /assets/images/prizes/7.webp`,
    description: 'Увлажнитель для комфортного микроклимата дома',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  Вафельница: {
    img: `
    /assets/images/prizes/8.webp`,
    img_thumb: `
    /assets/images/prizes/8.webp`,
    description: 'Вафельница для приготовления десертов дома',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Пылесос вертикальный': {
    img: `
    /assets/images/prizes/9.webp`,
    img_thumb: `
    /assets/images/prizes/9.webp`,
    description: 'Манёвренный вертикальный пылесос для ежедневной уборки',
    manager:
      'После получения личного сообщения в\u00A0мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
};
