import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import {TaskPropsType} from './TaskTypes';
import {StyledTask} from './TaskStyles';
import {useTask} from './useTask';
import {EditableTitle} from '../../../components/EditableTitle/EditableTitle';
import {TaskStatuses} from "../../../todolist-api";

export const Task: React.FC<TaskPropsType> = ({task, tdlId}) => {
    const {isDone, toggleTaskStatus, updateTaskTitle, removeTask, todolist} = useTask(task, tdlId);


    return (
        <StyledTask key={task.id} isdone={(isDone === TaskStatuses.Completed).toString()}>
            <Checkbox checked={isDone === TaskStatuses.Completed} size="small" onChange={toggleTaskStatus}/>
            <EditableTitle
                oldTitle={task.title}
                callback={updateTaskTitle}
                disabled={todolist?.entityStatus === 'loading'}
            />
            <IconButton onClick={removeTask} aria-label="delete" size="small">
                <ClearIcon/>
            </IconButton>
        </StyledTask>
    );
};