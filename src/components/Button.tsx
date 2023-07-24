import React from 'react';
import styled from "styled-components";

type ButtonType = {
    children: string,
    clickFunc: () => void,
    disabled?: boolean,
    actived?: boolean
}
export const Button:React.FC<ButtonType> = (
    {
        children,
        clickFunc,
        disabled,
        ...props
    }) => {

    return (
        <StyledButton
            actived={props.actived}
            onClick={clickFunc}
            disabled={disabled}>
            {children}
        </StyledButton>
    );
};

interface StyledButtonType {
    actived: boolean | undefined
}
export const StyledButton = styled.button<StyledButtonType>`
  padding:  5px 10px;
  background-color: ${props => props.actived ? 'orangered' : 'transparent'};
`