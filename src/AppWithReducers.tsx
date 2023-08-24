import React, {useReducer, useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm";
import styled from "styled-components";
import {
    ActionType, addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    todolistsReducer
} from "./state/todolists-reducer";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer} from "./state/tasks-reducer";


export type FilterValueType = 'All' | 'Completed' | 'Active';
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValueType
}
export type TasksType = {
    [key: string]: TaskType[]
}
const AppWithReducers = () => {
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, dispatchTodolists] = useReducer(todolistsReducer,[
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ]);

    let [tasks, dispatchTasks] = useReducer(tasksReducer, {
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })

    const filterTasks = (tdlId: string, filterValue: FilterValueType) => {
        let action = changeTodolistFilterAC(tdlId, filterValue);
        dispatchTodolists(action);
    }
    const removeTask = (tdlId: string, taskId: string) => {
        let action = removeTaskAC(taskId, tdlId);
        dispatchTasks(action);
    }
    const addTask = (tdlId: string, newTitle: string) => {
        let action = addTaskAC(newTitle, tdlId);
        dispatchTasks(action);
    }
    const chnageCheckboxStatus = (tdlId: string, taskId: string) => {
        let action = changeTaskStatusAC(taskId, tdlId);
        dispatchTasks(action);
    }
    const removeTodolist = (tdlId: string) => {
        let action = removeTodolistAC(tdlId);
        dispatchTodolists(action);
        dispatchTasks(action);
    }
    const addTodolist = (newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatchTodolists(action);
        dispatchTasks(action);
    }
    const updateTaskTitle = (tdlId: string, taskId: string, newTitle: string) => {
        let action = changeTaskTitleAC(taskId, newTitle, tdlId);
        dispatchTasks(action);
    }
    const updateTdlTitle = (tdlId: string, newTitle: string) => {
        let action = changeTodolistTitleAC(tdlId, newTitle);
        dispatchTodolists(action);
    }

    return (
        <div className="App">
            <StyledAppWrapper>
                {todolists.map(tdl => {
                    let filteredTasks = tasks[tdl.id];
                    if (tdl.filter === 'Completed') {
                        filteredTasks = tasks[tdl.id].filter(task => task.isDone);
                    }
                    if (tdl.filter === 'Active') {
                        filteredTasks = tasks[tdl.id].filter(task => !task.isDone);
                    }

                    return <Todolist title={tdl.title}
                                     key={tdl.id}
                                     tdlId={tdl.id}
                                     tasks={filteredTasks}
                                     removeTask={removeTask}
                                     filterTasks={filterTasks}
                                     addTask={addTask}
                                     chnageCheckboxStatus={chnageCheckboxStatus}
                                     removeTodolist={removeTodolist}
                                     updateTdlTitle={(tdlId: string, newTitle: string) => updateTdlTitle(tdlId, newTitle)}
                                     updateTaskTitle={(tdlId: string, taskId: string, newTitle: string) => updateTaskTitle(tdlId, taskId, newTitle)}
                    />
                })}

                <AddItemForm callback={(newTitle: string) => addTodolist(newTitle)}/>
            </StyledAppWrapper>
        </div>
    );
}

export default AppWithReducers;

const StyledAppWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px;
  align-items: flex-start;
`