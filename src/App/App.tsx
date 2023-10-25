import React from 'react';
import './App.css';
import {AddItemForm} from "../components/AddItemForm/AddItemForm";
import {Todolist} from "../feautures/Todolists/Todolist/Todolist";
import {StyledAppWrapper} from './AppStyles';
import {useApp} from "./useApp";

const App = () => {
    const {todolists, addTodolist} = useApp();

    return (
        <div className="App">
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