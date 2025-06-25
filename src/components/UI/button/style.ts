/* eslint-disable @typescript-eslint/no-explicit-any */
import styled, { css } from 'styled-components';

export interface ButtonProps {
  variant?: 'regular' | 'additional' | 'accent' | 'music' | 'music-disabled';
  type?: 'button' | 'link' | 'input' | 'div';
  children: React.ReactNode;
  onClick?: (arg?: any) => void;
  disabled?: boolean;
  style?: any;
}

export const ButtonStyles = css<ButtonProps>`
  display: flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  cursor: pointer;
  margin: 0.1rem 0;
  font-family: 'Foco Trial';
  font-size: 1rem;
  filter: drop-shadow(0px 3px 0px rgba(41, 57, 80, 0.2));
  line-height: 1;
  text-align: left;
  transform: translateY(0);
  transition: all 0.1s ease-in-out;
  padding: 10px 15px;
  outline: none !important;
  user-select: none;
  &:focus-visible {
    outline: none !important;
  }

  @media screen and (min-width: 405px) {
    font-size: 1.25rem;
  }
  @media screen and (min-width: 615px) {
    padding: 0.7rem 1.3rem;
    margin: 0.25rem 0;
  }

  &:not(:disabled):active {
    transform: translateY(0.25rem);
    transition: all 0.1s ease-in-out;
    filter: none;
  }

  ${({ variant }) =>
    variant === 'accent' &&
    css`
      border: 5px solid rgba(242, 49, 119, 1);
      background: rgba(226, 44, 110, 1);
      color: white;
      text-shadow: 0px 3px 2px rgba(153, 25, 82, 0.6);
      text-transform: uppercase;
      font-weight: 700;
      box-shadow: 0px 4px 0px 0.5px rgba(174, 34, 96, 1);

      img {
        margin-right: 0.6rem;
        height: 1rem;
        @media screen and (min-width: 405px) {
          height: 1.75rem;
        }
        width: auto;
      }

      &:hover {
        background: rgba(242, 49, 119, 1);
        box-shadow: 0px 3px 0px 0.5px rgba(174, 34, 96, 1);
      }

      &:disabled {
        background: rgba(184, 192, 221, 1);
        border: 5px solid rgba(226, 232, 255, 1);
        box-shadow: 0px 3px 0px 0px #99a2c6;
        text-shadow: 0px 3px 2px rgba(153, 162, 198, 1);
        cursor: not-allowed;
      }
    `}

  ${({ variant }) =>
    variant === 'regular' &&
    css`
      border: 5px solid rgba(244, 252, 255, 1);
      background: #e3f7ff;
      color: #2688eb;

      img {
        margin-right: 0.6rem;
        height: 1.75rem;
        width: auto;
      }
      &:disabled {
        filter: grayscale(1);
        cursor: default;
      }

      &:hover {
        background: #f4fcff;
      }
    `}
    
    ${({ variant }) =>
    variant === 'music-disabled' &&
    css`
      border: 5px solid rgba(244, 252, 255, 1);
      background: rgba(227, 247, 255, 1);
      color: rgba(38, 136, 235, 1);
      /* width: 2.5rem;
        height: 2.5rem; */
      padding: 0.6rem;
      display: grid;
      place-items: center;
      filter: grayscale(1);
      outline: none !important;
      position: relative;

      &::after {
        content: '';
        position: absolute;
        height: 2px;
        width: 2.2rem;
        transform: rotate(-45deg);
        background: #0f5ebc;
      }
      &:hover {
        filter: none;
      }
      @media screen and (min-width: 405px) {
        padding: 0.62rem;
        margin: 0.25rem 0;
      }
      img {
        height: 1.25rem;
        width: auto;
      }
    `}

    ${({ variant }) =>
    variant === 'music' &&
    css`
      border: 5px solid rgba(244, 252, 255, 1);
      background: rgba(227, 247, 255, 1);
      color: rgba(38, 136, 235, 1);
      /* width: 2.5rem;
        height: 2.5rem; */
      padding: 0.6rem;
      display: grid;
      place-items: center;

      @media screen and (min-width: 405px) {
        margin: 0.25rem 0;
        padding: 0.62rem;
      }

      img {
        height: 1.25rem;
        width: auto;
      }
    `}
    ${({ variant }) =>
    variant === 'additional' &&
    css`
      border: 1px solid rgba(150, 198, 255, 1);
      border-radius: 12px;
      background: rgba(146, 196, 243, 0.4);
      color: #fff;
      position: relative;
      padding: 0.8rem;
      text-shadow: 0px 1px 2px #595ac2;

      &::before {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 5px;
        display: block;
        border-bottom: 5px solid rgba(41, 57, 80, 0.2);
        border-radius: inherit;
      }

      &::after {
        content: '';
        position: absolute;
        width: 100%;
        height: 100%;
        top: 2px;
        display: block;
        border-bottom: 5px solid rgba(150, 198, 255, 1);
        border-radius: inherit;
      }

      img {
        margin-left: 0.4rem;
        height: 1rem;
        width: auto;
        filter: drop-shadow(0px 2px 2px #595ac2);

        @media screen and (min-width: 405px) {
          height: 1.75rem;
        }
      }

      &:hover {
        background: #92c4f3cc;
      }
    `}
`;

export const StyledButton = styled.button<ButtonProps>`
  ${ButtonStyles}
`;
