import styled from 'styled-components';
import { InfoBlock } from '@/features/back-to-school-game/ui/GameUIOverlay';
import { BACKPACK_WIDTH } from '@/features/back-to-school-game/model/backpack';
import { ForwardIcon, LeftIcon } from '@/shared/ui';

export const Screen1 = () => {
  return (
    <>
      <Domovenok src={'./assets/images/onboarding/domovenok1.png'} alt={`domovenok`} />
      <BackPack
        width={BACKPACK_WIDTH}
        src={'./assets/images/onboarding/backpack.png'}
        alt={`backpack`}
      />
      <BackpackCounter>
        <InfoBlock>
          <img src="./assets/images/backpack-icon.png" alt="иконка рюкзак" />0
        </InfoBlock>
      </BackpackCounter>
      <Bubble1>
        <Bubble1Img src={'./assets/images/onboarding/bubble1.png'} alt={`Bubble`} />
      </Bubble1>
      <ControlsWrapper>
        <ArrowButton>
          <LeftIcon />
        </ArrowButton>
        <ArrowButton>
          <ForwardIcon />
        </ArrowButton>
      </ControlsWrapper>
    </>
  );
};

export const BackpackCounter = styled.div`
  position: absolute;
  top: 12px;
  right: 70px;

  ${InfoBlock} {
    display: flex;
    gap: 4px;
  }
`;

export const BackPack = styled.img`
  position: absolute;
  left: 0;
  right: 0;
  margin: auto;
  bottom: 10px;
  z-index: 4;
`;

export const ArrowButton = styled.div`
  display: flex;
  width: 60px;
  height: 56px;
  padding-right: 2px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`;

export const ControlsWrapper = styled.div`
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: space-between;
  z-index: 10;
`;

const Bubble1Img = styled.img`
  width: 230px;
`;

const Bubble1 = styled.div`
  bottom: 135px;
  position: absolute;
  width: fit-content;
  left: 10px;
  z-index: 2;
`;

const Domovenok = styled.img`
  bottom: 30px;
  position: absolute;
  right: 10px;
  width: 160px;
`;
