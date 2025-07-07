import { Button, Div, Text } from '@vkontakte/vkui';
import styled from 'styled-components';
import { ButtonProps, ButtonStyles } from '@/components/UI/button/style';

export const ProfileButton = styled(Button)`
  background-color: #2688eb;
  border-radius: 50%;
  width: 40px;
  min-height: 40px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 0;
  transition: background-color 0.3s;

  &:hover {
    background-color: #1d5fbf;
  }

  &:active {
    background-color: #154da0;
  }
  span {
    padding: 0 !important;
  }
  svg {
    width: 22px !important;
    height: 22px !important;
  }
`;

export const ButtonContent = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding-top: 0;
`;

export const FlexBetweenDiv = styled(Div)`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0;
  margin-bottom: 5rem;

  @media screen and (min-width: 504px) {
    margin-top: 0;
  }
`;

export const FaqAndRules = styled(FlexBetweenDiv)`
  padding: 0;
  gap: 10px;
  margin: 0;
  position: relative;
`;

export const MainNavigation = styled(FlexBetweenDiv)<{ platform: string }>`
  position: relative;
  align-items: flex-start;
  padding: 0;
  z-index: 20;

  @media screen and (min-width: 505px) {
    margin-top: -3.5rem;
  }

  > div {
    align-items: flex-start;
  }
  div {
    margin: 0;
    padding: 0;
  }
  button {
    margin: 0;
  }
`;

export const FlexBetweenStyled = styled(FlexBetweenDiv)<{ platform: string }>`
  padding-bottom: 0;
  padding-top: 0;
  width: fit-content;
  margin: 0 auto;

  img {
    width: 3.5rem !important;
  }
`;

export const FlexColumnDiv = styled(Div)`
  display: flex;
  flex-direction: row;
  position: relative;
  align-items: center;
  gap: 1rem;
  padding: 0;
  justify-content: center;
  flex-wrap: wrap;

  > button {
    width: 100%;
    max-width: 240px;
    > span {
      font-size: 1.2rem;
      display: flex;
      gap: 5px;
      align-items: center;

      svg {
        flex-shrink: 0;
      }
    }
    > img {
      display: none;
    }
  }
  @media screen and (min-width: 405px) {
    flex-direction: column;
    gap: 0.5rem;

    > button {
      > img {
        display: block;
      }
    }
  }
`;

export const ButtonNavigation = styled(Button)`
  width: 250px;
  margin-top: 1.5rem;
`;

export const ProgressContainer = styled.div`
  position: relative;
  width: 100%;
  background-color: #e9e9e9;
  margin-top: 1.5rem;
  height: 50px;
`;

export const ProgressBar = styled.div<{ value: number }>`
  width: ${({ value }) => value}%;
  height: 100%;
  background-color: #2688eb;
  border-radius: 8px;
  position: absolute;
  bottom: 0;
  left: 0;
`;

export const ProgressBarInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: #ffffff;
  position: relative;
  z-index: 1;
`;

export const ProgressText = styled.span`
  margin-left: 8px;
  font-size: 16px;
  font-weight: 600;
  color: #fff;
`;

export const ProgressData = styled.div`
  display: flex;
  justify-content: center;
  gap: 5px;
  margin: auto;
  height: 100%;
  align-items: center;
`;

export const ProgressCheckpoints = styled(Text)`
  position: absolute;
  top: -1.5rem;
  color: #000;
`;

export const CenteredImage = styled.img`
  max-width: 300px;
  margin: auto;

  @media screen and (min-width: 560px) {
    max-width: 350px;
  }
`;

export const StyledCentredImage = styled(CenteredImage)`
  max-width: 300px;

  @media screen and (min-width: 560px) {
    max-width: 360px;
    margin-top: -4.5rem;
    margin-left: 6rem;
  }
`;

export const GroupStyled = styled.div`
  position: relative;
  padding-top: 0;
  max-width: calc(100% - 20px);
  z-index: 100;
  margin: 0 auto;
`;

export const ModalStyledText = styled.p`
  text-align: center;
  font-family: 'Foco Trial';
  font-size: 1rem;
  font-weight: 400;
  line-height: 1.3;
  text-align: center;
`;

export const ButtonModalContainer = styled.div`
  margin-top: 1.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.8rem;

  button {
    width: fit-content;
    margin: auto;
  }
`;

export const StyledDiv = styled.div`
  position: relative;
  z-index: 10;
  bottom: -1.2rem;
`;

export const StyledInput = styled.label<ButtonProps>`
  ${ButtonStyles};

  input {
    display: none;
  }
`;
