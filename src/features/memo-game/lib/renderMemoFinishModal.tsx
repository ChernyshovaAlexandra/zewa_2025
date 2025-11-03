import { useModalStore } from '@/shared/model/modalStore';
import { Text, ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import type { MemoLevel } from '../types';

type MemoFinishResult = 'success' | 'timeout';

interface MemoFinishModalParams {
  level: MemoLevel;
  result: MemoFinishResult;
  totalPairs: number;
  matchedPairs: number;
  turns: number;
  timeLimitSeconds: number;
  timeSpentSeconds: number;
  onRestart: () => void;
  onExit: () => void;
}

const formatSeconds = (seconds: number) => {
  const clamped = Math.max(0, seconds);
  const minutes = Math.floor(clamped / 60)
    .toString()
    .padStart(2, '0');
  const remaining = (clamped % 60).toString().padStart(2, '0');
  return `${minutes}:${remaining}`;
};

export const renderMemoFinishModal = ({
  level,
  result,
  totalPairs,
  matchedPairs,
  turns,
  timeLimitSeconds,
  timeSpentSeconds,
  onRestart,
  onExit,
}: MemoFinishModalParams) => {
  const { openModal, closeModal } = useModalStore.getState();

  const isSuccess = result === 'success';
  const statusText = isSuccess ? 'Уровень пройден!' : 'Время вышло';
  const descriptionText = isSuccess
    ? `Вы собрали все пары на уровне ${level}.`
    : `Не хватило времени, чтобы собрать все пары на уровне ${level}. Попробуйте ещё раз!`;
  const timeLimitFormatted = formatSeconds(timeLimitSeconds);
  const timeSpentFormatted = formatSeconds(timeSpentSeconds);
  const timeRemainingFormatted = formatSeconds(timeLimitSeconds - timeSpentSeconds);

  const stats = [
    { label: 'Собрано пар', value: `${matchedPairs} из ${totalPairs}` },
    { label: 'Ходов', value: turns.toString() },
    {
      label: isSuccess ? 'Потрачено времени' : 'Лимит времени',
      value: isSuccess ? timeSpentFormatted : timeLimitFormatted,
    },
  ];

  if (isSuccess) {
    stats.push({ label: 'Осталось времени', value: timeRemainingFormatted });
  }

  openModal({
    title: 'Финиш',
    closable: false,
    content: (
      <Flex vertical gap="20px">
        <Flex vertical gap="8px">
          <Text align="center" size="p3" color="#1F2532">
            {statusText}
          </Text>
          <Text align="center" size="p4" color="#596471">
            {descriptionText}
          </Text>
        </Flex>
        <Flex vertical gap="10px">
          {stats.map((stat) => (
            <Flex key={stat.label} justify="space-between">
              <Text size="p4" color="#8893A0">
                {stat.label}
              </Text>
              <Text size="p4" color="#1F2532">
                {stat.value}
              </Text>
            </Flex>
          ))}
        </Flex>
        <Flex vertical gap="8px">
          <ZewaButton
            variant="blue-b"
            onClick={() => {
              closeModal();
              onRestart();
            }}
          >
            Играть ещё
          </ZewaButton>
          <ZewaButton
            variant="white"
            onClick={() => {
              closeModal();
              onExit();
            }}
          >
            Главное меню
          </ZewaButton>
        </Flex>
      </Flex>
    ),
  });
};
