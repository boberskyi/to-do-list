import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";

const App = () => {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const removeTask = (taskId: number) =>  setTasks(tasks.filter(task => task.id !== taskId));

    return (
        <div className="App">
            <Todolist title="Sunday"
                      tasks={tasks}
                      removeTask={removeTask}
            />
        </div>
    );
}

export default App;
