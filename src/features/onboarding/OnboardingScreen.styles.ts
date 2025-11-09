import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-inline: 10px;
  padding-top: calc(
    10px + var(--twa-safe-area-top, 0px) + (min(var(--twa-safe-area-top, 0px), 1px) * 30)
  );
  padding-bottom: calc(
    20px + var(--twa-safe-area-bottom, 0px) + (min(var(--twa-safe-area-bottom, 0px), 1px) * 30)
  );
  height: 100vh;
  background: #182f5d;
  color: #fff;
  box-sizing: border-box;
`;

export const Header = styled.h1`
  color: #fff;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;
  font-family: 'Foco Trial';
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 110%;
  margin-top: 20px;
  white-space: pre-wrap;
`;

export const Image = styled.img`
  width: 100%;
  background-color: #fff;
  aspect-ratio: 370 / 430;
  object-fit: cover;
  object-position: bottom;
  border-radius: 20px;
  margin-bottom: 15px;
`;

export const Text = styled.p`
  color: #fff;
  text-align: center;
  font-feature-settings:
    'liga' off,
    'clig' off;

  font-family: 'Foco Trial';
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 140%;
  margin-top: 8px;
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
  text-decoration: underline;
`;
