import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";


export type FilterValueType = 'All' | 'Completed' | 'Active';
const App = () => {
    let [tasks, setTasks] = useState([
        {id: 1, title: "HTML&CSS", isDone: true},
        {id: 2, title: "JS", isDone: true},
        {id: 3, title: "ReactJS", isDone: false}
    ])

    const [filterValue, setFilterValue] = useState('all');

    const removeTask = (taskId: number) =>  setTasks(tasks.filter(task => task.id !== taskId));
    const filterTasks = (filterValue: FilterValueType) => setFilterValue(filterValue);

    let filteredTasks = tasks;
        if(filterValue === 'Completed') {
            filteredTasks = tasks.filter(task => task.isDone);
        }
        if(filterValue === 'Active') {
            filteredTasks = tasks.filter(task => !task.isDone);
        }


    return (
        <div className="App">
            <Todolist title="Sunday"
                      tasks={filteredTasks}
                      removeTask={removeTask}
                      filterTasks={filterTasks}
            />
        </div>
    );
}

export default App;
