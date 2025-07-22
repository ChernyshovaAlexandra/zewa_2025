import { IconButton, Separator } from "@vkontakte/vkui";
import styled from "styled-components";

export const CheckData = styled.div`
    padding: 0 12px 12px;
    background: #fff;
    border-radius: .8rem;
    margin-bottom: .5rem;
`;

export const FlexBetween = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const CheckNumber = styled.span`
    font-family: 'Foco Trial';
    font-size: 1rem;
    font-weight: 700;
    line-height: 20px;
    text-align: left;
    color: #2688EB;
`;

export const StyledIconButton = styled(IconButton)`
    border-radius: 50%;
    height: fit-content;
    padding: .5rem;
    &:hover{
        background: #ececec;
    }
`;

export const Date = styled.span`
    font-family: 'Foco Trial';
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    color: #7E97B4;
`;

export const Total = styled.span`
    font-family: 'Foco Trial';
    font-size: 14px;
    font-weight: 400;
    line-height: 16px;
    text-align: left;
    color: #7E97B4;
`;

export const SeparatorStyled = styled.div`
    width: 100%;
    height: 2px; 
    background: transparent;
    position: relative;

    &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        right: 0;
        height: 1px;
        background: linear-gradient(90deg, #2688EB 50%, #fff 51%);
        background-size: 12px;
        transform: translateY(-50%);
    }
`;

export const StyledCoins = styled.div`
    display: flex;
    gap: 5px;
    
    p{
        font-family: 'Foco Trial';
        font-size: 20px;
        font-weight: 700;
        line-height: 22px;
        text-align: right;
        color: #2688EB
    }

    img{
        flex-shrink: 0
    }
`;