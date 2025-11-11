import styled from 'styled-components';

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 0 calc(var(--twa-safe-area-bottom, 0px) + 24px);
  margin-top: 28px;
`;

export const Description = styled.div`
  padding: 0 16px;
  margin-top: 23px;
  text-align: center;
`;

export const Card = styled.div<{ $isCompleted?: boolean }>`
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 20px;
  border-radius: 14px;
  background: ${({ $isCompleted }) =>
    $isCompleted ? 'var(--main-pink)' : 'linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%)'};
  color: ${({ $isCompleted }) => ($isCompleted ? '#fff' : 'var(--main-blue)')};
  box-shadow: ${({ $isCompleted }) => ($isCompleted ? 'none' : '0 -2px 3px 0 #b3c7e9 inset')};

  h2,
  p,
  span {
    color: ${({ $isCompleted }) => ($isCompleted ? '#fff' : 'var(--main-blue)')};
  }
`;

export const CardHeader = styled.div`
  display: flex;
  gap: 6px;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 17px;
  font-style: normal;
  font-weight: 900;
  line-height: 130%;
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

export const RoundNumber = styled.span<{ $isCompleted?: boolean }>`
  width: 22px;
  height: 22px;
  flex-shrink: 0;
  background-color: ${({ $isCompleted }) => ($isCompleted ? '#fff' : 'var(--main-blue)')};
  border-radius: 100%;
  display: grid;
  place-items: center;
  color: #fff !important;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 17px;
  font-style: normal;
  font-weight: 900;
  line-height: 22px;
  position: relative;

  &::after {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    right: 0;
    margin: auto;
    background: url('/assets/images/ok-icon.svg') no-repeat center;
    visibility: ${({ $isCompleted }) => ($isCompleted ? 'visible' : 'hidden')};
  }
`;

export const WinnerItem = styled.li`
  padding: 12px 10px;
  border-bottom: 1px solid #ffffff20;
  border-radius: 10px;

  &[data-me='true'] {
    background: #ffffff30;
  }
`;

export const WinnerName = styled.span`
  color: #fff;
  font-feature-settings:
    'liga' off,
    'clig' off;

  font-family: 'Foco Trial';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
`;

export const WinnerGroup = styled.div`
  padding: 0;
`;
