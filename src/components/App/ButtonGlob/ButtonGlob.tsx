import React from 'react';
import Button from '@mui/material/Button';
import { ButtonType } from './ButtonGlobTypes';

export const ButtonGlob:React.FC<ButtonType> = (
    {
        children,
        clickFunc,
        disabled,
        ...props
    }) => {

    return (
        <Button variant={props.actived ? "contained" : "outlined"}
                disabled={disabled}
                onClick={clickFunc}
                size="small">{children}</Button>
    );
};

