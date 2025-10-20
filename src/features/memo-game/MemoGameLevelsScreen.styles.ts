import styled from 'styled-components';

export const LevelsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-top: 16px;
`;

export const LevelCard = styled.div<{ $locked: boolean }>`
  border-radius: 24px;
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  background: ${({ $locked }) => ($locked ? '#E6E9ED' : '#FFFFFF')};
  box-shadow: 0px 12px 32px rgba(31, 37, 50, 0.12);
  opacity: ${({ $locked }) => ($locked ? 0.7 : 1)};
`;

export const LevelHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const LevelInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
