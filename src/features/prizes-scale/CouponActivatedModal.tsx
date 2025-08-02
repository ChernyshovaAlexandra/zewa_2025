import { ZewaButton, Text } from '@/shared/ui';
import type { Coupon } from '@/types';

interface Props {
  coupon: Coupon;
  onClose: () => void;
  navigate: (nav: string) => void;
}

export const CouponActivatedModal: React.FC<Props> = ({ coupon, onClose, navigate }) => {
  return (
    <>
      <Text as="h3" align="center" weight={700} color="#fff">
        Купон на {coupon.value}
      </Text>

      <Text size="p2" align="center" style={{ margin: '16px 0' }}>
        Отправили ваш подарок в раздел «Мои призы».
      </Text>

      <ZewaButton
        variant="blue-b"
        style={{ width: '100%', marginTop: 24 }}
        onClick={() => {
          onClose();
          navigate('/prizes');
        }}
      >
        Мои призы
      </ZewaButton>
    </>
  );
};
