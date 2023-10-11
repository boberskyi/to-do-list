import React, {memo, useCallback} from 'react';
import styled from "styled-components";
import {EditableTitle} from "./EditableTitle";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';
import {TaskType} from "./todolist/Todolist";

export type TaskPropsType = {
    task: TaskType,
    tdlId: string,
    removeTask: (taskId:string, tdlId:string) => void,
    updateTaskTitle: (taskId:string, newTitle: string, tdlId:string) => void,
    chnageCheckboxStatus: (taskId:string, tdlId:string) => void
}
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

export interface StyledTaskType {
    isdone: string
}

export const StyledTask = styled.li<StyledTaskType>`
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: ${props => props.isdone === 'true' ? '0.4' : '1'};
`