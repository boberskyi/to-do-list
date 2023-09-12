import React, {useCallback} from 'react';
import './App.css';
import {AddItemForm} from "./components/AddItemForm";
import styled from "styled-components";
import {addTodolistAC} from "./state/todolists-reducer";
import {AppRootStateType} from "./state/store";
import {useDispatch, useSelector} from "react-redux";
import {Todolist} from "./components/Todolist";


export type FilterValueType = 'All' | 'Completed' | 'Active';
export type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValueType
}

const App = () => {
    const todolists = useSelector<AppRootStateType, TodolistsType[]>(state => state.todolists);
    const dispatch = useDispatch();

    const addTodolist = useCallback((newTitle: string) => {
        let action = addTodolistAC(newTitle);
        dispatch(action);
    }, [dispatch]);

    return (
        <div className="App">
            <StyledAppWrapper>
                {todolists.map(tdl => <Todolist key={tdl.id} tdlId={tdl.id} />)}

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