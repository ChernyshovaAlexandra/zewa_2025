import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 24px 16px calc(var(--twa-safe-area-bottom, 0px) + 24px);
`;

export const Card = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 16px;
  border-radius: 16px;
  background: linear-gradient(180deg, #f4fcff 0%, #dcecff 100%);
  box-shadow:
    0px -2px 4px rgba(48, 104, 222, 0.12) inset,
    0px 6px 12px rgba(12, 43, 120, 0.18);
  color: var(--main-blue);
`;

export const CardHeader = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

export const Badge = styled.span`
  align-self: flex-start;
  padding: 4px 10px;
  border-radius: 999px;
  background: linear-gradient(180deg, #2d59df 0%, #1945cb 100%);
  color: #f4fcff;
  font-family: 'Foco Trial';
  font-size: 14px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

export const WinnerList = styled.ul`
  list-style: none;
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin: 0;
  padding: 0;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 8px;
    font-family: 'Foco Trial';
  }
`;
