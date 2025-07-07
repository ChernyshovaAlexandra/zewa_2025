import React from 'react';
import { Flex } from '@vkontakte/vkui';
import { Button, StyledCard, MainCardContainer, PromoCodeCopyContainer } from './style';
// import Promo from '../modals/promo';
// import useAuth from '@/contexts/AuthProvider';
import Code from './Code';
import BarcodeComponent from './BarcodeComponent';

import ImageContainer from './ImageContainer';
import TextContainer from './TextContainer';
import NotificationContainer from './NotificationContainer';

const end_coupon_date = '';

interface PrizeContainerProps {
  coupon: {
    id?: number;
    value: string | null;
    code?: string;
    barcode?: string;
  };
  activated?: boolean;
  showSnackbar?: (message: string) => void;
}
const CouponContainer: React.FC<PrizeContainerProps> = ({ coupon, activated, showSnackbar }) => {
  const img = `/images/coupon-${coupon.value}.png`;

  const handleActivateModal = React.useCallback(() => {
    // showModal(<Promo initial={true} coupon={coupon.id} />);
  }, []);

  const renderPromoContent = () => `Промокод на скидку ${coupon.value}%`;

  return (
    <StyledCard mode="shadow">
      {!activated && (
        <MainCardContainer>
          <div>
            <Flex noWrap style={{ gap: '.7rem' }}>
              <ImageContainer img={img} />
              <TextContainer
                title={renderPromoContent()}
                description={`Скидка на покупку в магазинах «Магнит» товаров бренда Zewa.`}
              />
            </Flex>
          </div>
          <Button style={{ alignSelf: 'center' }} onClick={handleActivateModal} variant="accent">
            Активировать
          </Button>
        </MainCardContainer>
      )}
      {coupon.code && (
        <MainCardContainer>
          <div>
            <Flex noWrap style={{ gap: '.7rem' }}>
              <ImageContainer img={img} />
              <TextContainer
                title={renderPromoContent()}
                description={`Скидка на покупку в приложении «Магнит: акции и доставка».`}
              />
            </Flex>
            <PromoCodeCopyContainer>
              <NotificationContainer
                text={`Скопируйте код и используйте его при оформлении заказа онлайн. Скидка действительна до ${end_coupon_date} включительно.`}
              />
              <Code showSnackbar={showSnackbar ? showSnackbar : () => {}} code={coupon.code} />
            </PromoCodeCopyContainer>
          </div>
        </MainCardContainer>
      )}

      {coupon.barcode && (
        <MainCardContainer>
          <div>
            <Flex noWrap style={{ gap: '.7rem' }}>
              <ImageContainer img={img} />
              <TextContainer
                title={renderPromoContent()}
                description={`Скидка на покупку в магазинах «Магнит» товаров бренда Zewa.`}
              />
            </Flex>
            <NotificationContainer
              text={`Покажите на кассе этот штрих-код. Скидка действительна до ${end_coupon_date} включительно.`}
            />
          </div>
          <BarcodeComponent barcode={coupon.barcode} />
        </MainCardContainer>
      )}
    </StyledCard>
  );
};

export default React.memo(CouponContainer);
