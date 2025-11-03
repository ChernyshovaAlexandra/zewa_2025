import styled from 'styled-components';

export const TabsWrapper = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 16px;
  width: 100%;
`;

export const Tabs = styled.div`
  display: flex;
  width: 100%;
  border-radius: 10px;
  padding-bottom: 2px;
  border: 1px solid #a3b5eb;
`;

export const TabButton = styled.button<{ $active?: boolean }>`
  flex: 1;
  padding: 10px 12px;
  border-radius: 6px;
  font-family: 'Foco Trial';
  font-size: 16px;
  font-weight: 700;
  border: none;
  cursor: pointer;
  background: ${({ $active }) =>
    $active ? 'linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%)' : 'transparent'};
  color: ${({ $active }) => ($active ? '#193F74' : '#fff')};

  box-shadow: ${({ $active }) =>
    $active
      ? `0px -2px 3px 0px #b3c7e9 inset,
    0px 3px 0px 0px #b3c7e9,
    0px 5px 5px 0px rgba(0, 53, 116, 0.5)`
      : 'none'};
  transition: background 0.3s ease-in;
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
  justify-content: space-between;
  gap: 12px;
  background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
  border-radius: 10px;
  padding: 8px;
  color: var(--main-blue);
  font-family: 'Foco Trial';
  font-size: 16px;
  margin-bottom: 8px;
`;
