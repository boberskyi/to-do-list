import React from 'react';

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
        <button onClick={clickFunc}>{children}</button>
    );
};