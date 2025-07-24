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
    img: `/public/assets/images/prizes/100rub.jpg`,
    img_thumb: `/public/assets/images/prizes/100rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Главный приз': {
    img: `/public/assets/images/prizes/main-prize.jpg`,
    img_thumb: `/public/assets/images/prizes/main-prize_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Бытовая техника': {
    img: `/public/assets/images/prizes/main-prize.jpg`,
    img_thumb: `/public/assets/images/prizes/main-prize_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Сертификат на 500 руб': {
    img: `/public/assets/images/prizes/500rub.jpg`,
    img_thumb: `/public/assets/images/prizes/100rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Сертификат на 1000 руб': {
    img: `/public/assets/images/prizes/1000rub.jpg`,
    img_thumb: `/public/assets/images/prizes/100rub_thumb.png`,
    description: 'Для оплаты любых товаров в магазинах «Магнит».',
    manager: false,
  },
  'Годовой запас Zewa': {
    img: `/public/assets/images/prizes/zewa.jpg`,
    img_thumb: `/public/assets/images/prizes/zewa_thumb.png`,
    description: 'Набор туалетной бумаги  Zewa Deluxe',
    manager: true,
  },

  'Умная колонка Яндекс Станция Миди с Алисой на YandexGPT': {
    img: `/public/assets/images/prizes/alisa.jpg`,
    img_thumb: `/public/assets/images/prizes/alisa_thumb.png`,
    description: `Умная колонка Яндекс Станция Миди с Алисой на YandexGPT`,
    manager: true,
  },
  'Электрический чайник Xiaomi': {
    img: `/public/assets/images/prizes/kettle.jpg`,
    img_thumb: `/public/assets/images/prizes/kettle.png`,
    description: `Электрический чайник Xiaomi`,
    manager: true,
  },
  'Тостер Philips': {
    img: `/public/assets/images/prizes/toster.jpg`,
    img_thumb: `/public/assets/images/prizes/toster.png`,
    description: `Тостер Philips`,
    manager: true,
  },
  'Погружной блендер Polaris': {
    img: `/public/assets/images/prizes/blender.jpg`,
    img_thumb: `/public/assets/images/prizes/blender.png`,
    description: `Погружной блендер Polaris`,
    manager: true,
  },
};
