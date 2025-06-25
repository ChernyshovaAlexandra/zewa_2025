interface HeartIconProps {
  stroke?: string;
  fill?: string;
}

export const HeartIcon = ({ stroke, fill }: HeartIconProps) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="21" viewBox="0 0 24 21" fill="none">
      <path
        d="M6.59961 1.5H6.60156C7.41443 1.49949 8.2172 1.69854 8.94141 2.08203C9.66575 2.46566 10.2919 3.0233 10.7646 3.70996L11.998 5.50195L13.2344 3.71191C14.1647 2.36428 15.6895 1.5 17.4004 1.5C20.1894 1.50022 22.4999 3.8139 22.5 6.72949C22.5 9.52895 20.8551 12.3834 18.499 14.8096C16.3518 17.0206 13.818 18.6602 12 19.3975C10.182 18.6602 7.64817 17.0206 5.50098 14.8096C3.14489 12.3834 1.5 9.52895 1.5 6.72949C1.50005 3.90493 3.66859 1.64538 6.33984 1.50684L6.59961 1.5Z"
        stroke={stroke}
        strokeWidth="3"
        strokeLinecap="round"
        fill={fill}
      />
    </svg>
  );
};
