import styled from 'styled-components';

export const Screen4 = () => {
  return (
    <>
      <Domovenok src="./assets/images/onboarding/domovenok4.png" />
      <Bubble>
        <img src={'./assets/images/onboarding/bubble4.png'} alt={`Bubble`} />
      </Bubble>
    </>
  );
};

const Domovenok = styled.img`
  bottom: 0px;
  position: absolute;
  left: -10px;
  width: 140px;
  z-index: 3;
`;

const Bubble = styled.div`
  bottom: 75px;
  position: absolute;
  width: fit-content;
  right: 10px;
  z-index: 2;
`;
