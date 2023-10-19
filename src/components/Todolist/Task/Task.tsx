import React from 'react';
import {EditableTitle} from "../../EditableTitle/EditableTitle";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from "@mui/material/IconButton";
import Checkbox from '@mui/material/Checkbox';
import {TaskPropsType} from "./TaskTypes";
import { StyledTask } from './TaskStyles';
import {changeTaskStatusAC, changeTaskTitleAC, removeTaskAC} from "../../../../state/tasks-reducer";
import {useDispatch} from "react-redux";

export const Task: React.FC<TaskPropsType> = ({task, tdlId, ...props}) => {
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