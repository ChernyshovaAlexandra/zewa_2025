import { useModalStore } from '@/shared/model/modalStore';
import { ReloadIcon, Text, ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import Helper from '@/helpers/Helper';

type MemoFinishResult = 'success' | 'timeout';

export interface MemoGameRewardInfo {
  coinsAwarded: number | null;
  alreadyAwarded: boolean;
}

interface MemoFinishModalParams {
  result: MemoFinishResult;
  totalPairs: number;
  matchedPairs: number;
  turns: number;
  timeLimitSeconds: number;
  timeSpentSeconds: number;
  rewardInfo: MemoGameRewardInfo;
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
  result,
  totalPairs,
  matchedPairs,
  turns,
  timeLimitSeconds,
  timeSpentSeconds,
  rewardInfo,
  onRestart,
  onExit,
}: MemoFinishModalParams) => {
  const { openModal, closeModal } = useModalStore.getState();

  const isSuccess = result === 'success';
  const { coinsAwarded, alreadyAwarded } = rewardInfo;
  const hasCoins = typeof coinsAwarded === 'number' && coinsAwarded > 0;

  const headingText = isSuccess ? 'Оп-па! Вы выиграли!' : 'Конец игры';
  const descriptionText = (() => {
    if (!isSuccess) {
      return 'К сожалению, вы не успели, снежинки не начислены.';
    }

    if (hasCoins) {
      return `Вам начислено ${coinsAwarded} ${Helper.getCoinsForm(coinsAwarded ?? 0)}.`;
    }

    if (alreadyAwarded) {
      return 'Вам уже были начислены снежинки за этот уровень.';
    }

    return `Результат сохранён. Проверьте баланс снежинок в личном кабинете.`;
  })();

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
    title: headingText,
    closable: false,
    content: (
      <Flex vertical gap="20px">
        <Flex vertical gap="8px">
          <Text align="center" size="p4" color="#596471">
            {descriptionText}
          </Text>
        </Flex>

        <Flex vertical gap="8px">
          <ZewaButton
            icon={<ReloadIcon />}
            variant="blue-b"
            style={{ textTransform: 'none', width: '210px', margin: 'auto' }}
            onClick={() => {
              closeModal();
              onRestart();
            }}
          >
            Играть ещё
          </ZewaButton>
          <ZewaButton
            variant="blue-b"
            style={{ textTransform: 'none', width: '210px', margin: 'auto' }}
            onClick={() => {
              closeModal();
              onExit();
            }}
          >
            На главную
          </ZewaButton>
        </Flex>
      </Flex>
    ),
  });
};
