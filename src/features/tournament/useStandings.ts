import { useEffect, useState } from 'react';
import type { AxiosError } from 'axios';
import { apiService } from '@/services';

export interface TopPlayer {
  name: string;
  points: number;
}

export interface Winner {
  name: string;
  prize: string;
}

// 👉 структура бэка по скрину
interface StandingsResponse {
  topPlayers: TopPlayer[];
  draw_winners: Record<string, Winner[]>;
  game_winners: Record<
    string,
    {
      name: string;
      prize: string;
    }
  >;
}

export function useStandings(telegramId: number) {
  const [data, setData] = useState<StandingsResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    let mounted = true;
    if (!telegramId) return;

    apiService
      .getWinners({ telegram_id: telegramId })
      .then((res) => {
        if (mounted) {
          setData(res.data.data);
          setLoading(false);
        }
      })
      .catch((e) => {
        if (mounted) {
          setError(e);
          setLoading(false);
        }
      });

    return () => {
      mounted = false;
    };
  }, [telegramId]);

  return { data, loading, error };
}
