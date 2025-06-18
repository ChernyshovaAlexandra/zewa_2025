import styled from 'styled-components';

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
`;

export const Tabs = styled.div`
  display: flex;
  background: #e1e3e6;
  border-radius: 8px;
  padding: 4px;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 6px 12px;
  border-radius: 6px;
  font-family: 'Foco Trial';
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  background: ${({ $active }) => ($active ? '#fff' : 'transparent')};
  color: ${({ $active }) => ($active ? '#2d59df' : '#6d7885')};
  transition:
    background 0.3s,
    color 0.3s;
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
