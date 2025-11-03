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
          padding: 10px 10px;
          background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
          color: #1235ab;
          box-shadow:
            0px -2px 3px 0px #b3c7e9 inset,
            0px 3px 0px 0px #b3c7e9,
            0px 5px 5px 0px rgba(0, 53, 116, 0.5);
          transition: all ease-in-out 0.3s;

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
            color: #1235ab !important;
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
          background: linear-gradient(180deg, #2d59df 0%, #0f3bc1 100%);
          color: white;
          box-shadow: 0px -1px 2px 0px #001da3;
        `;
      case 'blue-b':
        return css`
          padding: 12px 24px;
          min-width: 200px;
          height: auto;
          background: linear-gradient(180deg, #2d59df 0%, #1945cb 100%);
          color: white;
          box-shadow: 0px -1px 2px 0px #001da3;
        `;
      case 'play':
        return css`
          padding: 14px;
          background: linear-gradient(180deg, #f4fcff 0%, #e3f7ff 100%);
          color: #fff;
          transition: all ease-in-out 0.3s;
          border-radius: var(--10, 10px);
          background: #f23177;
          box-shadow:
            0px -2px 3px 1px rgb(121 29 69 / 40%) inset,
            0px 3px 0px 0px rgb(206 14 84),
            0px 5px 5px 0px rgb(94 4 44 / 75%);

          &:hover {
            box-shadow:
              0px -2px 3px 1px rgb(121 29 69) inset,
              0px 3px 0px 0px rgb(206 14 84),
              0px 5px 5px 0px rgb(94 4 44 / 5%);
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
