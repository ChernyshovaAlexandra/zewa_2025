import { useUserStore } from '@/shared/model';
import { ZewaButton } from '@/shared/ui';
import { Flex } from 'antd';
import { useNavigate } from 'react-router-dom';

export const Coins = () => {
  const userData = useUserStore((s) => s.userData);
  const navigate = useNavigate();

  return (
    <ZewaButton
      variant="white"
      onClick={() => {
        navigate('/history');
      }}
    >
      <Flex
        gap="3px"
        style={{
          verticalAlign: 'middle',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <img width="22" src="/assets/images/snowflake.svg" alt="иконка снежинка" />
        <span style={{ fontWeight: 900, letterSpacing: '-0.7px' }}>
          {userData?.user?.coins || 0}
        </span>
      </Flex>
    </ZewaButton>
  );
};
