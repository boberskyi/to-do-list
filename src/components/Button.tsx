import React from 'react';
import styled from "styled-components";

type ButtonType = {
    children: string,
    clickFunc: () => void,
    disabled?: boolean
}
export const Button:React.FC<ButtonType> = (
    {
        children,
        clickFunc,
        disabled
    }) => {
    return (
        <StyledButton onClick={clickFunc} disabled={disabled}>{children}</StyledButton>
    );
};

export const StyledButton = styled.button`
  padding:  5px 10px;
`