import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./components/Todolist";
import {v1} from "uuid";


export type FilterValueType = 'All' | 'Completed' | 'Active';
type TodolistsType = {
    id: string,
    title: string,
    filter: FilterValueType
}
const App = () => {
    let [tasks, setTasks] = useState<TaskType[]>([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false}
    ]);

    let [todolists, setTodolists] = useState<Array<TodolistsType>>(
        [
            {id: v1(), title: 'What to learn', filter: 'All'},
            {id: v1(), title: 'What to buy', filter: 'Completed'},
        ]
    )



    // const [filterValue, setFilterValue] = useState<FilterValueType>('All');
    const [inputError, setInputError] = useState('');

    const addTask = (newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false};
        if(newTitle.trim() !== '') {
            setInputError('');
            setTasks([...tasks, newTask]);
        } else {
            setInputError('Error');
        }
    }
    const removeTask = (taskId: string) => {
        setTasks(tasks.filter(task => task.id !== taskId));
    }
    const filterTasks = (tdlId:string, filterValue: FilterValueType) => {
        setTodolists(todolists.map(tdl => tdl.id === tdlId ? {...tdl, filter: filterValue} : tdl))
    }

    const chnageCheckboxStatus = (taskId:string) => {
        setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t))
    }


    return (
        <div className="App">
            {todolists.map(tdl => {
                let filteredTasks = tasks;
                if (tdl.filter === 'Completed') {
                    filteredTasks = tasks.filter(task => task.isDone);
                }
                if (tdl.filter === 'Active') {
                    filteredTasks = tasks.filter(task => !task.isDone);
                }

                return <Todolist title={tdl.title}
                                 key={tdl.id}
                                 tdlId={tdl.id}
                                 tasks={filteredTasks}
                                 removeTask={removeTask}
                                 filterTasks={filterTasks}
                                 addTask={addTask}
                                 chnageCheckboxStatus={chnageCheckboxStatus}
                                 inputError={inputError}
                />
            })}
        </div>
    );
}

export default App;
