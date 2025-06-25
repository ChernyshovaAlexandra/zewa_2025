import styled from 'styled-components';

export const Screen3 = () => {
  return (
    <>
      <Items style={{ filter: 'brightness(0.35)' }} src="./assets/images/onboarding/items3.png" />
      <Items src="./assets/images/onboarding/items2.png" />
      <Domovenok src="./assets/images/onboarding/domovenok3.png" />
      <Bubble>
        <img src={'./assets/images/onboarding/bubble3.png'} alt={`Bubble`} />
      </Bubble>
    </>
  );
};

const Items = styled.img`
  position: absolute;
  top: 100px;
  left: 0;
  right: 0;
  margin: auto;
`;

const Domovenok = styled.img`
  bottom: 0px;
  position: absolute;
  right: -10px;
  width: 180px;
  z-index: 3;
`;

const Bubble = styled.div`
  bottom: 75px;
  position: absolute;
  width: fit-content;
  left: 10px;
  z-index: 2;
`;
