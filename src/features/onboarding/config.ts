export interface OnboardingStep {
  image: string;
  header: string;
  text: string;
}

export const DEFAULT_ONBOARDING_STEPS: OnboardingStep[] = [
  {
    image: '/assets/images/onboarding/1_christmas.webp',
    header: 'Скучали? Я вернулся!',
    text: 'Перед Новым годом дел невпроворот. Но с Zewa дом сияет! Добавим немного волшебства. Поможете разобрать игрушки и нарядить ёлку?',
  },
  {
    image: '/assets/images/onboarding/2_christmas.webp',
    header: 'Не проЗЕВАй праздник!',
    text: 'Покупайте Zewa в «Магните», побеждайте в игре, зарабатывайте снежинки, чтобы продвинуться по шкале призов, и получайте ценные подарки.',
  },
  {
    image: '/assets/images/onboarding/3_christmas.webp',
    header: 'Встречайте новую игру!',
    text: 'Переверните все парные карточки, чтобы получить снежинки. Количество попыток не ограничено.',
  },
  {
    image: '/assets/images/onboarding/4_christmas.webp',
    header: 'Продвигайтесь по шкале призов',
    text: 'Загружайте чеки с товарами Zewa, проходите 3 уровня игры каждую неделю и вступайте в Клуб помощников Домовёнка.',
  },
];
