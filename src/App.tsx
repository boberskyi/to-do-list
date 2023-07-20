import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";


export type FilterValueType = 'All' | 'Completed' | 'Active';
const App = () => {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ]);


    const [filterValue, setFilterValue] = useState<FilterValueType>('All');
    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false};
        setTasks([...tasks, newTask]);
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }
    const filterTasks = (filterValue: FilterValueType) => setFilterValue(filterValue);

    let filteredTasks = tasks;
    if (filterValue === 'Completed') {
        filteredTasks = tasks.filter(task => task.isDone);
    }
    if (filterValue === 'Active') {
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
