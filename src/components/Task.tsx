import React from 'react';
import {ButtonGlob} from "./ButtonGlob";
import styled from "styled-components";
import {EditableTitle} from "./EditableTitle";

type TaskPropsType = {
    id:string,
    title: string,
    isDone: boolean,
    removeTask: (taskId: string) => void,
    chnageCheckboxStatus: (taskId:string) => void,
    updateTaskTitle: (newTitle:string) => void
}
export const Task:React.FC<TaskPropsType> = (
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
            <input type='checkbox' checked={isDone} onChange={() => chnageCheckboxStatus(id)}/>
            <EditableTitle oldTitle={title} callback={(newTitle) => props.updateTaskTitle(newTitle)}/>
            <ButtonGlob clickFunc={() => removeTask(id)}>x</ButtonGlob>
        </StyledTask>
    );
};

const StyledTask = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`