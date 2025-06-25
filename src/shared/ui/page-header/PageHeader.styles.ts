import styled from 'styled-components';

export const HeaderWrapper = styled.header`
  padding: 16px;
  padding-left: 12px;
  display: flex;
  align-items: center;
  gap: 8px;
  width: 100%;
`;

export const BackButton = styled.button`
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  cursor: pointer;
  position: relative;
  z-index: 10;

  svg {
    width: 20px;
    height: 20px;
    stroke: white;
  }
`;

export const Title = styled.h1`
  color: #f4fcff;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;

  /* H1 */
  font-family: 'Foco Trial';
  font-size: 1.5rem;
  font-style: normal;
  font-weight: 900;
  line-height: 110%;
  text-align: center;
  width: 100%;
  margin-left: -24px;
`;
