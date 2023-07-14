import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

const App = () => {
    return (
        <div className="App">
            <Todolist title="Sunday"/>
            <Todolist title="Monday"/>
        </div>
    );
}

export default App;
