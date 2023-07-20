import React from 'react';
import {Button} from "./Button";
import styled from "styled-components";

type TaskPropsType = {
    id:string,
    title: string,
    isDone: boolean,
    removeTask: (taskId: string) => void
}
export const Task:React.FC<TaskPropsType> = (
    {
        id,
        title,
        isDone,
        removeTask
    }) => {
    return (
        <StyledTask key={id}>
            <input type='checkbox' checked={isDone}/>
            <span>{title}</span>
            <Button clickFunc={() => removeTask(id)}>x</Button>
        </StyledTask>
    );
};

const StyledTask = styled.li`
  display: flex;
  align-items: center;
  gap: 10px;
`