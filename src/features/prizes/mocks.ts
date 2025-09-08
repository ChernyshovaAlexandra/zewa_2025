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
  'Сертификат на 100 руб': {
    img: `
    /assets/images/prizes/100rub.jpg`,
    img_thumb: `
    /assets/images/prizes/100rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager:
      'Электронный сертификат придёт вам в личных сообщениях в мессенджере. До 30.07.2026 года покажите его на кассе при покупке.',
  },
  'Главный приз': {
    img: `
    /assets/images/prizes/main-prize.jpg`,
    img_thumb: `
    /assets/images/prizes/main-prize_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы перечислим деньги на ваш банковский счёт.',
  },
  'Бытовая техника': {
    img: `
    /assets/images/prizes/main-prize.jpg`,
    img_thumb: `
    /assets/images/prizes/main-prize_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Сертификат на 500 руб': {
    img: `
    /assets/images/prizes/500rub.jpg`,
    img_thumb: `
    /assets/images/prizes/100rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager:
      'Электронный сертификат придёт вам в личных сообщениях в мессенджере. До 30.07.2026 года покажите его на кассе при покупке.',
  },
  'Сертификат на 1000 руб': {
    img: `
    /assets/images/prizes/1000rub.jpg`,
    img_thumb: `
    /assets/images/prizes/100rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager:
      'Электронный сертификат придёт вам в личных сообщениях в мессенджере. До 30.07.2026 года покажите его на кассе при покупке.',
  },
  'Годовой запас Zewa': {
    img: `
    /assets/images/prizes/zewa.jpg`,
    img_thumb: `
    /assets/images/prizes/zewa_thumb.png`,
    description: 'Набор туалетной бумаги  Zewa Deluxe',
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },

  'Умная колонка Яндекс Станция Миди с Алисой на YandexGPT': {
    img: `
    /assets/images/prizes/alisa.jpg`,
    img_thumb: `
    /assets/images/prizes/alisa_thumb.png`,
    description: `Умная колонка Яндекс Станция Миди с Алисой на YandexGPT`,
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Электрический чайник Xiaomi': {
    img: `
    /assets/images/prizes/kettle.jpg`,
    img_thumb: `
    /assets/images/prizes/kettle.png`,
    description: `Электрический чайник Xiaomi`,
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Тостер Philips': {
    img: `
    /assets/images/prizes/toster.jpg`,
    img_thumb: `
    /assets/images/prizes/toster.png`,
    description: `Тостер Philips`,
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Погружной блендер Polaris': {
    img: `
    /assets/images/prizes/blender.jpg`,
    img_thumb: `
    /assets/images/prizes/blender.png`,
    description: `Погружной блендер Polaris`,
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Умные часы Honor Choice InFoWear 2i 5504ACGM': {
    img: `
    /assets/images/prizes/watch.jpg`,
    img_thumb: `
    /assets/images/prizes/watch.png`,
    description: `Умные часы Honor Choice InFoWear 2i 5504ACGM`,
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Умные весы XIAOMI Body Composition Scale S400 BHR7793GL': {
    img: `
    /assets/images/prizes/scale.jpg`,
    img_thumb: `
    /assets/images/prizes/scale.png`,
    description: `Умные весы XIAOMI Body Composition Scale S400 BHR7793GL`,
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
  'Беспроводные наушники JBL Tune 520BT, USB Type-C': {
    img: `
    /assets/images/prizes/headphones.jpg`,
    img_thumb: `
    /assets/images/prizes/headphones.png`,
    description: `Беспроводные наушники JBL Tune 520BT, USB Type-C `,
    manager:
      'После получения личного сообщения в мессенджере сообщите о себе необходимую информацию. После её проверки мы доставим приз в удобное для вас место и время.',
  },
};
