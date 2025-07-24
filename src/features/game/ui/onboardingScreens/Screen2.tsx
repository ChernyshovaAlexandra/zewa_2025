import styled from 'styled-components';

export const Screen2 = () => {
  return (
    <>
      <Items src="./assets/images/onboarding/items.png" />

      <Domovenok src="./assets/images/onboarding/domovenok2.png" />
      <Bubble>
        <img src={'./assets/images/onboarding/bubble2.png'} alt={`Bubble`} />
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
  bottom: 20px;
  position: absolute;
  left: -5px;
  width: 160px;
  z-index: 3;
`;

const Bubble = styled.div`
  bottom: 55px;
  position: absolute;
  width: fit-content;
  right: 10px;
  z-index: 2;
`;
