import styled from 'styled-components';
import { Heading } from '@/shared/ui/typography';

export const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: var(--modal-bg, rgba(0, 0, 0, 0.65));
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 100;
`;

export const ModalCardInner = styled.div`
  width: 100%;
  padding: 12px;
  padding-top: 36px;
  flex: 1;
  border-radius: 11px;
  background: #f4fcff;
  margin-bottom: 3px;
  filter: drop-shadow(0px 3px 1px rgba(0, 0, 0, 0.25));
`;

export const ModalCard = styled.div`
  border-radius: 16px;
  display: flex;
  width: 90%;
  height: fit-content;
  max-width: 340px;
  text-align: center;
  border: 6px solid #1235ab;
  background: #c5dfe9;
  filter: drop-shadow(0px 4px 0px #00098f);
  /* overflow: hidden; */
  position: relative;
`;

export const ModalTitle = styled(Heading)`
  font-size: 20px;
  font-weight: bold;
  margin-bottom: 16px;
  position: absolute;
  background: linear-gradient(180deg, #f55496 0%, #e22c6e 100%);
  z-index: 10;
  left: 0;
  right: 0;
  margin: auto;
  top: -1rem;
  width: fit-content;
  color: white;
  box-shadow: 0px 1px 2px 0px rgba(231, 64, 128, 0.6);
  padding: 6px 26px 8px;
  border-radius: 10px;
`;

export const ModalContent = styled.div`
  max-height: 83vh;
  overflow-y: auto;
  padding-bottom: 1rem;
`;

export const CloseBtn = styled.button`
  background: none;
  border: none;
  position: absolute;
  top: 0%;
  right: 0;
  width: 2rem;
  height: 2rem;
  z-index: 20;

  &::before {
    content: '';
    position: absolute;
    background: url('./assets/images/corner.svg') no-repeat right top;
    width: 2.5rem;
    height: 2.5rem;
    background-size: contain;
    right: -6px;
    top: -6px;
  }

  svg {
    position: relative;
    right: -8px;
    top: -8px;
    width: 10px;
    height: 10px;
  }
`;
