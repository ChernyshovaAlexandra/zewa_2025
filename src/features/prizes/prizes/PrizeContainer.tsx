import React from 'react';
import { StyledCard, MainCardContainer } from './style';
import { prize_types_data } from './mocks';
import ImageContainer from './ImageContainer';
import { Flex } from '@vkontakte/vkui';
import BarcodeComponent from './BarcodeComponent';
import NotificationContainer from './NotificationContainer';
import TextContainer from './TextContainer';

type PrizeProps = {
  name: string;
  description?: string;
  points: number;
  type: string | null;
  activated?: boolean;
  disabled?: boolean;
  new?: boolean;
  code?: string;
};

interface PrizeContainerProps {
  prize: PrizeProps;
}

const sertificateDate = '';

const PrizeContainer: React.FC<PrizeContainerProps> = ({ prize }) => {
  const img = prize_types_data[prize.name]?.img || '/images/prize-bg.png';
  const description = prize_types_data[prize.name]?.description || 'Краткое описание деталей';
  const additional = prize_types_data[prize.name]?.manager
    ? `В ближайшее время с вами свяжется менеджер и доставит приз. Проверьте настройки и разрешения для отправки сообщений.`
    : `При покупке покажите на кассе этот штрих-код. Сертификат действителен до ${sertificateDate} включительно.`;
  const hasBarcode = prize.code && prize.name.indexOf('Сертификат') !== -1;

  return (
    <StyledCard mode="shadow">
      <MainCardContainer>
        <div>
          <Flex noWrap style={{ gap: '.7rem' }}>
            <ImageContainer img={img} />
            <TextContainer title={prize.name} description={description} />
          </Flex>
          <NotificationContainer text={additional} />
        </div>
        {hasBarcode ? <BarcodeComponent barcode={prize.code || ''} /> : <></>}
      </MainCardContainer>
    </StyledCard>
  );
};

export default React.memo(PrizeContainer);
