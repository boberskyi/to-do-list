import type { Meta, StoryObj } from '@storybook/react';
import React, {KeyboardEvent, useState} from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {AddItemForm} from "./AddItemForm";
import {AddItemFormType} from "./AddItemFormTypes";
import {StyledAddForm} from "./AddItemFormStyles";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Todolists/AddItemForm',
    component: AddItemForm,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: {
            description: 'Btn clicked',
            action: 'clicked'
        },
    },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};

export const WithError: React.FC<AddItemFormType>  = ({callback}) => {
    const [inputError, setInputError] = useState('Error');
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
};