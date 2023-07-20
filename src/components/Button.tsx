import React from 'react';
import styled from "styled-components";

type ButtonType = {
    children: string,
    clickFunc: () => void
}
export const Button:React.FC<ButtonType> = (
    {
        children,
        clickFunc
    }) => {
    return (
        <StyledButton onClick={clickFunc}>{children}</StyledButton>
    );
};

export const StyledButton = styled.button`
  padding:  5px 10px;
`