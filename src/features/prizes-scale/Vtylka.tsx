import styled, { keyframes } from 'styled-components';

export const Vtylka = () => {
  return (
    <RotatingWrapper>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="57"
        height="57"
        viewBox="0 0 57 57"
        fill="none"
      >
        <path
          d="M28.0105 47.7778C38.563 47.7778 47.1176 39.2232 47.1176 28.6706C47.1176 18.118 38.563 9.56348 28.0105 9.56348C17.4579 9.56348 8.90332 18.118 8.90332 28.6706C8.90332 39.2232 17.4579 47.7778 28.0105 47.7778Z"
          fill="url(#paint0_linear_787_59)"
        />
        <g className="vtylka-rotating">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.0105 18.418C22.3481 18.418 17.7579 23.0083 17.7579 28.6707C17.7579 34.333 22.3481 38.9233 28.0105 38.9233C33.6729 38.9233 38.2631 34.333 38.2631 28.6707C38.2631 23.0083 33.6729 18.418 28.0105 18.418ZM0.0488281 28.6707C0.0488281 13.2279 12.5677 0.708984 28.0105 0.708984C43.4533 0.708984 55.9722 13.2278 55.9722 28.6707C55.9722 44.1135 43.4533 56.6323 28.0105 56.6323C12.5677 56.6323 0.0488281 44.1135 0.0488281 28.6707Z"
            fill="#ABB3D1"
          />
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M28.1091 16.777C21.932 16.777 16.9245 21.7846 16.9245 27.9617C16.9245 34.1388 21.932 39.1463 28.1091 39.1463C34.2863 39.1463 39.2938 34.1388 39.2938 27.9617C39.2938 21.7846 34.2863 16.777 28.1091 16.777ZM0.147461 27.9617C0.147461 12.5189 12.6663 0 28.1091 0C43.5519 0 56.0708 12.5189 56.0708 27.9617C56.0708 43.4045 43.5519 55.9233 28.1091 55.9233C12.6663 55.9233 0.147461 43.4045 0.147461 27.9617Z"
            fill="#EDEFFB"
          />
        </g>
        <defs>
          <linearGradient
            id="paint0_linear_787_59"
            x1="0.0522836"
            y1="0.708946"
            x2="55.9757"
            y2="56.6323"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#10306B" />
            <stop offset="0.6302" stopColor="#EDEFFB" />
          </linearGradient>
        </defs>
      </svg>
    </RotatingWrapper>
  );
};

const rotate = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;

export const RotatingWrapper = styled.div`
  display: inline-block;
  position: absolute;
  right: -20px;
  bottom: -1px;
  z-index: 4;

  .vtylka-rotating {
    transform-origin: center;
    animation: ${rotate} 3s ease-in-out;
  }
`;
