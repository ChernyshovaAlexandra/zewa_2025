import React, { useCallback } from 'react';
import { StyledCard, MainCardContainer, Description } from './style';

import ImageContainer from './ImageContainer';
import { Flex } from 'antd';
// import BarcodeComponent from './BarcodeComponent';
// import NotificationContainer from './NotificationContainer';
import { prize_types_data } from '../mocks';
import { Text, ZewaButton } from '@/shared/ui';
import { Title } from './TextContainer';
import { applyNbsp } from '@/utils';
import { useModalStore } from '@/shared/model';

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

// const sertificateDate = '';

const PrizeContainer: React.FC<PrizeContainerProps> = ({ prize }) => {
  const img = prize_types_data[prize.name]?.img || '/images/prize-bg.png';
  const description = prize_types_data[prize.name]?.description || 'Краткое описание деталей';
  const additional = prize_types_data[prize.name]?.manager;

  const handleClick = useCallback(() => {
    useModalStore.getState().openModal({
      title: 'Как забрать?',
      closable: true,
      content: (
        <>
          <Text>{additional}</Text>
        </>
      ),
    });
  }, [additional]);

  return (
    <StyledCard mode="shadow">
      <MainCardContainer>
        <div>
          <Flex vertical gap={'5px'} style={{ gap: '.7rem' }}>
            <Flex gap="5px">
              <ImageContainer img={img} />
              <div>
                <Title style={{ margin: 0, color: 'var(--main-blue)' }}>{prize.name}</Title>
                <Description>{applyNbsp(description)}</Description>
                <ZewaButton
                  style={{
                    padding: '7px 13px',
                    height: 'auto',
                    lineHeight: '1.4',
                    fontSize: '15px',
                  }}
                  variant="blue-s"
                  onClick={handleClick}
                >
                  Как получить
                </ZewaButton>
              </div>
            </Flex>
          </Flex>
          {/* <NotificationContainer text={additional} /> */}
        </div>
      </MainCardContainer>
    </StyledCard>
  );
};

export default React.memo(PrizeContainer);
