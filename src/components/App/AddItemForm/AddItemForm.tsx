import React, {KeyboardEvent, memo, useState} from 'react';
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import TextField from "@mui/material/TextField";
import Paper from '@mui/material/Paper';
import { StyledAddForm } from './AddItemFormStyles';
import { AddItemFormType } from './AddItemFormTypes';

export const AddItemForm: React.FC<AddItemFormType> = memo(({callback}) => {
    const [inputError, setInputError] = useState('');
    let [newTitle, setNewTitle] = useState<string>('');

    const addTaskAndResetTitle = () => {
        setNewTitle('');

        if (newTitle.trim() !== '') {
            callback(newTitle)
            setInputError('');
        } else {
            setInputError('Error');
        }
    }
    const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => setNewTitle(e.currentTarget.value);
    const onTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        e.code === 'Enter' && addTaskAndResetTitle();
    }
    const onAddTitleClickHandler = () => addTaskAndResetTitle();

    return (
        <Paper variant="outlined">
            <StyledAddForm>
                <TextField value={newTitle}
                           onChange={onTitleChangeHandler}
                           onKeyDown={onTitleKeyDownHandler}
                           label={inputError === '' ? 'Write task' : inputError}
                           size={"small"}
                           error={inputError !== ''}
                           variant="outlined"/>

                <Button variant="outlined"
                        size="large"
                        disabled={newTitle === ''}
                        onClick={onAddTitleClickHandler}
                        endIcon={<AddCircleOutlineIcon/>}>Add</Button>
            </StyledAddForm>
        </Paper>
    );
});