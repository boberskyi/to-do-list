import React, {memo, useCallback} from 'react';
import {EditableTitle} from "../../EditableTitle/EditableTitle";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';
import {TaskPropsType} from "./TaskTypes";
import { StyledTask } from './TaskStyles';

export const Task: React.FC<TaskPropsType> = memo(({task, tdlId, ...props}) => {
    const chnageCheckboxStatus = () => props.chnageCheckboxStatus(task.id, tdlId);
    const updateTaskTitle = useCallback((newTitle: string) => props.updateTaskTitle(task.id, newTitle, tdlId),[task.id, tdlId]);
    const removeTask = () => props.removeTask(task.id, tdlId);

    return (
        <StyledTask key={task.id} isdone={task.isdone.toString()}>
            <Checkbox checked={task.isdone} size="small" onChange={chnageCheckboxStatus}/>
            <EditableTitle oldTitle={task.title} callback={updateTaskTitle}/>
            <IconButton onClick={removeTask} aria-label="delete" size="small">
                <ClearIcon/>
            </IconButton>
        </StyledTask>
    );
});