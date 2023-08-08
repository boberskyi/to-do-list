import React from 'react';
import styled from "styled-components";
import Button from '@mui/material/Button';

type ButtonType = {
    children: string,
    clickFunc: () => void,
    disabled?: boolean,
    actived?: boolean
}
export const ButtonGlob:React.FC<ButtonType> = (
    {
        children,
        clickFunc,
        disabled,
        ...props
    }) => {

    return (
        // <StyledButton
        //     actived={props.actived}
        //     onClick={clickFunc}
        //     disabled={disabled}>
        //     {children}
        // </StyledButton>
        <Button variant={props.actived ? "contained" : "outlined"}
                disabled={disabled}
                onClick={clickFunc}
                size="small">{children}</Button>
    );
};

