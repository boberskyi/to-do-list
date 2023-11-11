import React from 'react';
import './App.css';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {StyledAppWrapper} from './AppStyles';
import {useApp} from "./useApp";
import { Todolist } from '../feautures/Todolists/Todolist/Todolist';
import LinearProgress from '@mui/material/LinearProgress';
import {useAppSelector} from "./store";
import {RequestStatusType} from "./app-reducer";

const App = () => {
    const {todolists, addTodolist} = useApp();
    const status = useAppSelector<RequestStatusType>(state => state.app.status);

    return (
        <div className="App">
            {status === 'loading' && <LinearProgress color="primary" />}

            <StyledAppWrapper>
                {todolists.map((tdl) => (
                    <Todolist key={tdl.id} tdl={tdl}/>
                ))}

                <AddItemForm callback={addTodolist}/>
            </StyledAppWrapper>
        </div>
    );
}

export default App;