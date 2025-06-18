import styled from 'styled-components';

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: 16px;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  padding: 6px 12px;
  border-radius: 8px;
  font-family: 'Foco Trial';
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  color: ${({ $active }) => ($active ? '#fff' : '#1235ab')};
  background: ${({ $active }) =>
    $active
      ? 'linear-gradient(180deg, #2d59df 0%, #1945cb 100%)'
      : 'linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%)'};
`;

export const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  color: #fff;

  th,
  td {
    padding: 8px;
    text-align: left;
  }

  th {
    font-weight: 700;
    border-bottom: 2px solid rgba(255, 255, 255, 0.3);
  }

  td {
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  }
`;

export const PrizeItem = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
  border-radius: 10px;
  padding: 8px;
  color: #1235ab;
  font-family: 'Foco Trial';
  font-size: 16px;
  margin-bottom: 8px;
`;
