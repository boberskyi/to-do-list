import React from 'react';
import './App.css';
import {TodoList} from "./components/TodoList";

const App = () => {
    return (
        <div className="App">
            <TodoList/>
            <TodoList/>
            <TodoList/>
            <TodoList/>
        </div>
    );
}

export default App;
