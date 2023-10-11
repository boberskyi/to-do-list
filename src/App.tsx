import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import styled from "styled-components";
import {
    addTodolistAC,
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC
} from "./state/todolists-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {Todolist} from "./components/todolist/Todolist";
import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksType} from "./state/tasks-reducer";


export type FilterValueType = 'All' | 'Completed' | 'Active';
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValueType
}

const App = () => {
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists);
    let tasks = useSelector<AppRootStateType, TasksType>(state => state.tasks);
    const dispatch = useDispatch();

    const addTodolist = useCallback((newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatch(action);
    }, [dispatch]);
    const addTask = useCallback((newTitle: string, id:string) => {
        dispatch(addTaskAC(newTitle, id));
    },[dispatch]);
    const changeTodolistFilter = useCallback((id:string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(id,value));
    }, [dispatch]);
    const removeTodolist = useCallback((id:string) => dispatch(removeTodolistAC(id)),[dispatch]);
    const updateTdlTitle = useCallback((id:string, newTitle: string) => dispatch(changeTodolistTitleAC(id, newTitle)),[dispatch]);
    const chnageCheckboxStatus = (taskId:string, tdlId:string) => dispatch(changeTaskStatusAC(taskId, tdlId));
    const updateTaskTitle = useCallback((taskId:string, newTitle: string, tdlId:string) => {
        dispatch(changeTaskTitleAC(taskId, newTitle, tdlId));
    }, [dispatch]);
    const removeTask = (taskId:string, tdlId:string) => dispatch(removeTaskAC(taskId, tdlId));

    return (
        <div className="App">
            <StyledAppWrapper>
                {todolists.map(tdl => <Todolist
                    key={tdl.id}
                    title={tdl.title}
                    filter={tdl.filter}
                    tasks={tasks[tdl.id]}
                    addTask={addTask}
                    updateTdlTitle={updateTdlTitle}
                    changeTodolistFilter={changeTodolistFilter}
                    removeTodolist={removeTodolist}
                    removeTask={removeTask}
                    updateTaskTitle={updateTaskTitle}
                    chnageCheckboxStatus={chnageCheckboxStatus}
                    tdlId={tdl.id} />)}

                <AddItemForm callback={addTodolist}/>
            </StyledAppWrapper>
        </div>
    );
}

export default App;

const StyledAppWrapper = styled.div`
  display: flex;
  gap: 20px;
  padding: 30px;
  align-items: flex-start;
`