export interface HistoryCheck {
  date_time_raw: string;
  coins_earned: number;
  status: string;
}

export const mockChecks: HistoryCheck[] = [
  {
    date_time_raw: '2024-05-01 10:30',
    coins_earned: 10,
    status: 'Засчитан',
  },
  {
    date_time_raw: '2024-05-02 09:15',
    coins_earned: 0,
    status: 'Отклонён',
  },
  {
    date_time_raw: '2024-05-03 17:45',
    coins_earned: 5,
    status: 'Засчитан',
  },
];
