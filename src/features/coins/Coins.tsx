import { useUserStore } from '@/shared/model';
import { ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Coins = () => {
  const userData = useUserStore((s) => s.userData);
  const navigate = useNavigate();

  return (
    <ZewaButton variant="white" onClick={() => navigate('/history')}>
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
