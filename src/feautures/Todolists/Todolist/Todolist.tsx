import React from 'react';
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import Paper from '@mui/material/Paper';
import { StyledFilterWrap, StyledTasksWrap, StyledTodolist, StyledTodoListTitle } from './TodolistStyles';
import { useTodolist } from './useTodolist';
import {TodolistPropsType} from "./TodolistTypes";
import {EditableTitle} from "../../../components/EditableTitle/EditableTitle";
import {AddItemForm} from "../../../components/AddItemForm/AddItemForm";
import {Task} from "../Task/Task";
import FilterButtons from "../FilterButtons/FilterButtons";


export const Todolist: React.FC<TodolistPropsType> = ({ tdl }) => {
    const {
        filteredTasks,
        activeBtn,
        onFilterClickHandler,
        addTask,
        removeTodolist,
        updateTdlTitle,
    } = useTodolist({ tdl });



    return (
        <Paper variant="outlined">
            <StyledTodolist>
                <StyledTodoListTitle>
                    <EditableTitle oldTitle={tdl.title} callback={updateTdlTitle} />
                    <IconButton onClick={removeTodolist} aria-label="delete" size="small" disabled={tdl.entityStatus === 'loading'}>
                        <ClearIcon />
                    </IconButton>
                </StyledTodoListTitle>

                <AddItemForm callback={addTask} disabled={tdl.entityStatus === 'loading'} />

                <Paper variant="outlined">
                    <StyledTasksWrap>
                        {filteredTasks.length === 0 ? (
                            <div>No tasks</div>
                        ) : (
                            filteredTasks.map(t => <Task key={t.id} task={t} tdlId={tdl.id} />)
                        )}
                    </StyledTasksWrap>
                </Paper>

                <StyledFilterWrap>
                    <FilterButtons activeBtn={activeBtn} onFilterClickHandler={onFilterClickHandler} />
                </StyledFilterWrap>
            </StyledTodolist>
        </Paper>
    );
};