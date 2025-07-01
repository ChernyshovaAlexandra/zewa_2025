import { useUserStore } from '@/shared/model';
import { ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';

export const Coins = () => {
  const userData = useUserStore((s) => s.userData);
  return (
    <ZewaButton variant="white">
      <Flex
        gap="6px"
        style={{
          verticalAlign: 'middle',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img src="./assets/images/coin-icon.png" alt="монетка" />
        {userData?.user?.coins || 0}
      </Flex>
    </ZewaButton>
  );
};
