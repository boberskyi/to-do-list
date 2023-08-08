import React, {KeyboardEvent, useState} from 'react';
import {Button} from "./Button";
import styled from "styled-components";

type AddItemFormType = {
    callback: (newTitle:string) => void
}

export const AddItemForm:React.FC<AddItemFormType> = ({callback}) => {
    const [inputError, setInputError] = useState('');
    let [newTitle, setNewTitle] = useState<string>('');

    const addTaskAndResetTitle = () => {
        callback(newTitle)
        setNewTitle('');
        if(newTitle.trim() !== '') {
            setInputError('');
        } else {
            setInputError('Error');
        }
    }
    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value);
    }
    const onTitleKeyDownHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        e.code === 'Enter' && addTaskAndResetTitle();
    }
    const onAddTitleClickHandler = () => addTaskAndResetTitle();

    return (
        <StyledAddForm error={inputError}>
            <input value={newTitle}
                   onChange={onTitleChangeHandler}
                   onKeyDown={onTitleKeyDownHandler}
                   placeholder={inputError === '' ? 'Write task' : inputError}
            />
            <Button disabled={newTitle === ''}
                    clickFunc={onAddTitleClickHandler}
            >+</Button>
        </StyledAddForm>
    );
};

interface StyledAddFormType {
    error: string
}
const StyledAddForm = styled.div<StyledAddFormType>`
  display: flex;
  align-items: center;
  gap: 10px;
  
  input {
    border-width: 2px;
    border-style: solid;
    border-color: ${props => props.error === '' ? 'black' : 'red'};
  }
`