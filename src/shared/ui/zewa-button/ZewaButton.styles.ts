import styled, { css } from 'styled-components';
import type { ZewaButtonVariant } from './ZewaButton';

export const base = css`
  display: flex;
  align-items: center;
  font-family: 'Foco Trial';
  justify-content: center;
  border-radius: 10px;
  font-weight: 700;
  font-size: 18px;
  line-height: 1;
  gap: 10px;
  border: none;
  cursor: pointer;
  text-transform: uppercase;
`;

export const StyledButton = styled.button<{ $variant: ZewaButtonVariant }>`
  ${base};
  ${({ $variant }) => {
    switch ($variant) {
      case 'white':
        return css`
          padding: 14px;
          background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
          color: var(--main-blue);
          box-shadow:
            0px -2px 3px 0px #b3c7e9 inset,
            0px 3px 0px 0px #b3c7e9,
            0px 5px 5px 0px rgba(0, 53, 116, 0.5);
          transition: all ease-in-out 0.3s;
          font-size: 16px;
          font-style: normal;
          font-weight: 700;
          line-height: 100%;
          height: 48px;
          position: relative;

          &:hover {
            box-shadow:
              0px 3px 3px 0px #d0e5f3 inset,
              0px 3px 0px 0px #d9edfa,
              0px 5px 5px 0px rgba(0, 53, 116, 0.5);
            transition: all ease-in-out 0.3s;
          }
        `;
      case 'white-small':
        return css`
          padding: 6px 12px;
          font-size: 14px;
          background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
          span {
            color: var(--main-blue) !important;
            font-weight: 700;
          }
          box-shadow:
            0px -2px 3px 0px #b3c7e9 inset,
            0px 3px 0px 0px #b3c7e9,
            0px 5px 5px 0px rgba(0, 53, 116, 0.5);
        `;
      case 'blue-s':
        return css`
          padding: 0 24px;
          height: 48px;
          background: #193f74;
          color: white;
          box-shadow: 0px -1px 2px 0px #001da3;
        `;
      case 'blue-b':
        return css`
          padding: 12px 24px;
          min-width: 200px;
          height: auto;
          background: #193f74;
          color: white;
          box-shadow: 0px -1px 2px 0px #001da3;
        `;
      case 'play':
        return css`
          padding: 14px 26px;
          background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
          color: #fff;
          transition: all ease-in-out 0.3s;
          border-radius: 10px;
          background: #f23177;
          box-shadow:
            0 3px 30px 0 rgba(241, 6, 109, 0.5),
            0 23px 44.5px 0 rgba(185, 18, 154, 0.5),
            0 1px 2px 0 rgba(231, 235, 240, 0.4) inset,
            0 -2px 8.2px 0 #ae2260 inset;
          color: var(--Color-White, #fff);
          font-feature-settings:
            'liga' off,
            'clig' off;
          font-family: 'Foco Trial';
          font-size: 22px;
          font-style: normal;
          font-weight: 900;
          line-height: 100%; /* 22px */
          text-transform: uppercase;

          &:hover {
            box-shadow:
              0 1px 2px 0 rgba(231, 235, 240, 0.4) inset,
              0 -2px 8.2px 0 #ae2260 inset;
            transition: all ease-in-out 0.3s;
          }
        `;
      case 'icon':
        return css`
          padding: 12px;
          width: 48px;
          height: 48px;
          background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
          box-shadow: 0px -2px 3px 0px #b3c7e9;
        `;
    }
  }}
`;

export const Icon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Label = styled.span`
  white-space: nowrap;
`;
