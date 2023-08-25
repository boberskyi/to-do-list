import React from 'react';
import styled from "styled-components";
import {EditableTitle} from "./EditableTitle";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../state/tasks-reducer";
import {TaskType} from "./Todolist";

type TaskPropsType = {
    task: TaskType,
    tdlId: string
}
export const Task: React.FC<TaskPropsType> = ({task, tdlId,}) => {
    const dispatch = useDispatch();
    const chnageCheckboxStatus = () => dispatch(changeTaskStatusAC(task.id, tdlId));
    const updateTaskTitle = (newTitle: string) => dispatch(changeTaskTitleAC(task.id, newTitle, tdlId));
    const removeTask = () => dispatch(removeTaskAC(task.id, tdlId));
    return (
        <StyledTask key={task.id} isdone={task.isdone.toString()}>
            <Checkbox checked={task.isdone} size="small" onChange={chnageCheckboxStatus}/>
            <EditableTitle oldTitle={task.title} callback={updateTaskTitle}/>
            <IconButton onClick={removeTask} aria-label="delete" size="small">
                <ClearIcon/>
            </IconButton>
        </StyledTask>
    );
};

interface StyledTaskType {
    isdone: string
}

const StyledTask = styled.li<StyledTaskType>`
  display: flex;
  align-items: center;
  gap: 10px;
  opacity: ${props => props.isdone ? '0.4' : '1'};
`