import React from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

const App = () => {
    const tasks = [
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ]



    return (
        <div className="App">
            <Todolist title="Sunday"
                      tasks={tasks}
            />
        </div>
    );
}

export default App;
