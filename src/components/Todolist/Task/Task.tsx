import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskPropsType} from './TaskTypes';
import {StyledTask} from './TaskStyles';
import {useTask} from './useTask';
import {EditableTitle} from '../../EditableTitle/EditableTitle';

export const Task: React.FC<TaskPropsType> = ({task, tdlId}) => {
    const {isDone, toggleTaskStatus, updateTaskTitle, removeTask} = useTask(task, tdlId);

    return (
        <StyledTask key={task.id} isdone={isDone.toString()}>
            <Checkbox checked={isDone} size="small" onChange={toggleTaskStatus}/>
            <EditableTitle oldTitle={task.title} callback={updateTaskTitle}/>
            <IconButton onClick={removeTask} aria-label="delete" size="small">
                <ClearIcon/>
            </IconButton>
        </StyledTask>
    );
};