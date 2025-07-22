// components/Heading.tsx
import React, { ReactNode } from 'react';
import styled, { css } from 'styled-components';

interface HeadingProps {
    level: 2 | 3 | 4 | 5;
    $blue?: boolean;
    children: string | TrustedHTML;
    $center?: boolean;
    title?: ReactNode;
    style?: any;
}

const baseStyles = css<{ $blue?: boolean, $center?: boolean }>`
    font-family: "Foco Trial", sans-serif;
    font-weight: 900;
    line-height: 110%;
    color: ${({ $blue }) => ($blue ? '#2688EB' : '#E3F7FF')};
    text-align: ${({ $center }) => ($center ? 'center' : 'left')};
`;

const H2 = styled.h2<{ $blue?: boolean, $center?: boolean }>`
    ${baseStyles};
    font-size: 24px;
    
    @media screen and (min-width: 405px){
        font-size: 28px;    
    }

    text-align: center;
    margin-bottom: 1rem;
`;

const H3 = styled.h3<{ $blue?: boolean, $center?: boolean }>`
    ${baseStyles};
    font-size: 22px;
    @media screen and (min-width: 405px){
        font-size: 24px;
    }

    text-align: center;
`;

const H4 = styled.h4<{ $blue?: boolean, $center?: boolean }>`
    ${baseStyles};
    font-size: 18px;
    @media screen and (min-width: 405px){
          font-size: 20px;
    }
`;

const H5 = styled.h5<{ $blue?: boolean, $center?: boolean }>`
    ${baseStyles};
    font-size: 16px;
`;

const Heading: React.FC<HeadingProps> = ({ level, $blue, children, $center, title, style }) => {
    if (title) return <H4 style={style} $blue={$blue} $center={$center} >{title}</H4>;
    switch (level) {
        case 2:
            return <H2 style={style} $blue={$blue} $center={$center} dangerouslySetInnerHTML={{ __html: children }} />;
        case 3:
            return <H3 style={style} $blue={$blue} $center={$center} dangerouslySetInnerHTML={{ __html: children }} />;
        case 4:
            return <H4 style={style} $blue={$blue} $center={$center} dangerouslySetInnerHTML={{ __html: children }} />;
        case 5:
            return <H5 style={style} $blue={$blue} $center={$center} dangerouslySetInnerHTML={{ __html: children }} />;
        default:
            return <H2 style={style} $blue={$blue} $center={$center} dangerouslySetInnerHTML={{ __html: children }} />;
    }
};

export const ModalHeading = styled(Heading)`
    width: fit-content;
    margin: 0rem auto 1rem;
    max-width: 80%;
`;
export default Heading;
