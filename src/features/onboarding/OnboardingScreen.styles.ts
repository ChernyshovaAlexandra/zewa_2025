import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 24px 16px;
  height: 100vh;
  background: url('./assets/images/bg.svg'), linear-gradient(180deg, #2d59df 0%, #1945cb 100%);
  color: #fff;
`;

export const Image = styled.img`
  width: 100%;
  background-color: #fff;
  aspect-ratio: 370 / 370;
  object-fit: cover;
  object-position: bottom;
  border-radius: 20px;
  margin-bottom: 15px;
  max-height: 50vh;
`;

export const Text = styled.p`
  text-align: center;
  font-family: 'Foco Trial';
  font-size: 15px;
  line-height: 130%;
  margin-bottom: 15px;
  color: #fff;
`;

export const Pagination = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 16px;
`;

export const Dot = styled.span<{ $active?: boolean }>`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: ${({ $active }) => ($active ? '#fff' : 'rgba(255, 255, 255, 0.5)')};
`;

export const SkipButton = styled.button`
  background: transparent;
  border: none;
  color: #fff;
  font-family: 'Foco Trial';
  font-size: 16px;
  margin-top: 8px;
  cursor: pointer;
`;
