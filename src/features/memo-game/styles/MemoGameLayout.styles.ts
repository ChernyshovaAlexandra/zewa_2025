import styled from 'styled-components';

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  min-height: 100%;
  max-width: 100%;
  padding: 0 12px 24px;
`;

export const GameTitle = styled.h1`
  color: #eefaff;
  text-align: center;
  font-family: 'Foco Trial';
  font-weight: 900;
  text-transform: uppercase;
  font-size: 40px;
  line-height: 110%;
  letter-spacing: 0.02em;

  -webkit-text-stroke-width: 1.8px;
  -webkit-text-stroke-color: #10366e;
  paint-order: stroke fill;
  text-shadow:
    0 1px 0 #10366e,
    0 2px 4px rgba(16, 54, 110, 0.4);

  font-feature-settings:
    'liga' off,
    'clig' off;
  text-rendering: geometricPrecision;
  -webkit-font-smoothing: antialiased;
`;

export const RulesOverlay = styled.div`
  position: fixed;
  inset: 0;
  z-index: 20;
  background: rgba(0, 0, 0, 0.85);
  overflow-y: auto;
`;
