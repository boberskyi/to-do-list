import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./components/Todolist";
import {v1} from "uuid";


export type FilterValueType = 'All' | 'Completed' | 'Active';
const App = () => {
    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ]);



    const [filterValue, setFilterValue] = useState('all');
    const addTask = (title:string) => {
        setTasks([...tasks, {id: v1(), title: title, isDone: false}])
    }
    const removeTask = (taskId: string) =>  setTasks(tasks.filter(task => task.id !== taskId));
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
                      addTask={addTask}
            />
        </div>
    );
}

export default App;
