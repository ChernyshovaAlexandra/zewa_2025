import React, { useState } from 'react';
import { Flex } from '@vkontakte/vkui';
import {
  StyledCard,
  MainCardContainer,
  Description,
  // PromoCodeCopyContainer
} from './style';
// import Code from './Code';
import BarcodeComponent from './BarcodeComponent';

import TextContainer from './TextContainer';
import { applyNbsp } from '@/utils';
import { ZewaButton } from '@/shared/ui';
import { ToggleIcon } from '@/shared/ui/icons/ToggleIcon';

// const end_coupon_date = '';

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
const CouponContainer: React.FC<PrizeContainerProps> = ({ coupon }) => {
  const renderPromoContent = () => `Скидка -${coupon.value}%`;
  console.info(coupon);

  const [toggledContent, setToggled] = useState(false);
  return (
    <StyledCard mode="shadow">
      <MainCardContainer>
        <div>
          <Flex noWrap style={{ gap: '.7rem' }}>
            <TextContainer
              title={renderPromoContent()}
              description={applyNbsp(`Скидка на покупку продукции Zewa в сети магазинов «Магнит».
                
  Покажите на кассе полученный штрих-код.`)}
            />
          </Flex>
          <ZewaButton variant="blue-b">Поменять на онлайн</ZewaButton>
          {coupon.barcode && <BarcodeComponent barcode={coupon.barcode} />}
          <br />
          <Flex justify="space-between">
            <Description style={{ marginBottom: 0 }}>Скидка действует до 24.09.2025</Description>
            <div
              style={{ cursor: 'pointer' }}
              onClick={() => {
                setToggled(!toggledContent);
              }}
            >
              <ToggleIcon />
            </div>
          </Flex>
          {toggledContent && (
            <>
              <br />
              <Description>
                {applyNbsp(
                  `Акция действует в приложении «Магнит: акции и доставка» (6+) в разделе «Доставка», в котором реализуется Продукция в период с 01.08.2025 по 24.09.2025. Скидка предоставляется в приложении на все позиции бренда Zewa при применении промокода. Скидка распространяется также на жёлтые ценники и не суммируется с другими скидками и предложениями. Количество акционных товаров ограничено. В период проведения акции не гарантируется постоянное наличие полного ассортимента акционных товаров.`,
                )}
              </Description>
            </>
          )}
        </div>
      </MainCardContainer>
    </StyledCard>
  );
};

export default React.memo(CouponContainer);
