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
import { apiService } from '@/services';
import Code from './Code';

interface PrizeContainerProps {
  coupon: {
    id?: number;
    name: string;
    code?: string;
    barcode?: string;
    value: number;
  };
  activated?: boolean;
  showSnackbar?: (message: string) => void;
}
const CouponContainer: React.FC<PrizeContainerProps> = ({ coupon }) => {
  const [toggledContent, setToggled] = useState(false);

  const handleChangeToOnline = async () => {
    if (!coupon.barcode) return;
    try {
      const resp = await apiService.changeCoupon({ barcode: coupon.barcode });
      console.log(resp.data ?? resp);
    } catch (err) {
      console.error('change-coupon error', err);
    }
  };

  return (
    <StyledCard mode="shadow">
      <MainCardContainer>
        <div>
          <Flex noWrap style={{ gap: '.7rem' }}>
            <TextContainer
              isOffline={coupon.barcode ? true : false}
              title={`Cкидка -${coupon.value}%`}
              description={
                coupon.barcode
                  ? applyNbsp(`Скидка на покупку продукции Zewa в сети магазинов «Магнит».
                
Покажите на кассе полученный штрих-код.`)
                  : applyNbsp(`Промокод со скидкой на покупку продукции Zewa онлайн в сети магазинов «Магнит».

Используйте промокод при заказе онлайн.`)
              }
            />
          </Flex>

          {coupon.barcode ? (
            <>
              <BarcodeComponent barcode={coupon.barcode} />
              <ZewaButton onClick={handleChangeToOnline} variant="blue-b">
                Поменять на онлайн
              </ZewaButton>
            </>
          ) : coupon.code ? (
            <Code code={coupon.code} />
          ) : (
            <></>
          )}
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

                {coupon.code? applyNbsp(
                  `Акция действует в приложении «Магнит: акции и доставка» (6+) в разделе «Доставка», в котором реализуется Продукция в период с 01.08.2025 по 24.09.2025. Скидка предоставляется в приложении на все позиции бренда Zewa при применении промокода. Скидка распространяется также на жёлтые ценники и не суммируется с другими скидками и предложениями. Количество акционных товаров ограничено. В период проведения акции не гарантируется постоянное наличие полного ассортимента акционных товаров.`,
                ) : 
                applyNbsp(`Купон действует в магазинах «Магнит у дома», «Магнит Семейный», «Магнит Экстра», «Магнит Косметик» c 21.07.2025 по 24.09.2025. Скидка предоставляется единоразово на кассе при предъявлении скриншота купона и действует на все позиции бренда «Zewa». Скидка распространяется на жёлтые ценники, кроме акций 1+1/2+1 и со скидкой от 2 шт и более и не суммируется с другими скидками, предоставляемыми на кассе. При единовременном действии на товар двух и более скидок, предоставляемых на кассе, покупатель получает только одну, наиболее выгодную по размеру суммы, скидку.  В одном чеке можно использовать один купон. Количество акционных товаров ограничено. В период проведение акции не гарантируется постоянное наличие полного ассортимента акционной продукции. АО «Тандер» вправе прекратить акцию досрочно.
Акция не действует в «Магнит Косметик» в аэропортах Пулково и Домодедово.`)}
              </Description>
            </>
          )}
        </div>
      </MainCardContainer>
    </StyledCard>
  );
};

export default React.memo(CouponContainer);
