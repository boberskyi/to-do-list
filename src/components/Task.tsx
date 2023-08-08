import React from 'react';
import styled from "styled-components";
import {EditableTitle} from "./EditableTitle";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';

type TaskPropsType = {
    id: string,
    title: string,
    isDone: boolean,
    removeTask: (taskId: string) => void,
    chnageCheckboxStatus: (taskId: string) => void,
    updateTaskTitle: (newTitle: string) => void
}
export const Task: React.FC<TaskPropsType> = (
    {
        id,
        title,
        isDone,
        removeTask,
        chnageCheckboxStatus,
        ...props
    }) => {
    return (
        <StyledTask key={id}>
            <Checkbox checked={isDone} size="small" onChange={() => chnageCheckboxStatus(id)} />
            <EditableTitle oldTitle={title} callback={(newTitle) => props.updateTaskTitle(newTitle)}/>
            <IconButton onClick={() => removeTask(id)}
                        aria-label="delete"
                        size="small">
                <ClearIcon/>
            </IconButton>
        </StyledTask>
    );
};

const StyledTask = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`