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
    let todolistID1 = v1()
    let todolistID2 = v1()

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'All'},
        {id: todolistID2, title: 'What to buy', filter: 'All'},
    ])

    let [tasks, setTasks] = useState({
        [todolistID1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'ReactJS', isDone: false},

        ],
        [todolistID2]: [
            {id: v1(), title: 'Rest API', isDone: true},
            {id: v1(), title: 'GraphQL', isDone: false},
        ]
    })



    const [inputError, setInputError] = useState('');
    const filterTasks = (tdlId:string, filterValue: FilterValueType) => {
        setTodolists(todolists.map(tdl => tdl.id === tdlId ? {...tdl, filter: filterValue} : tdl))
    }
    const removeTask = (tdlId:string, taskId: string) => {
        setTasks({...tasks, [tdlId]: tasks[tdlId].filter(task => task.id !== taskId)})
    }
    const addTask = (tdlId:string, newTitle: string) => {
        const newTask = {id: v1(), title: newTitle, isDone: false};
        if(newTitle.trim() !== '') {
            setInputError('');
            setTasks({...tasks, [tdlId]: [...tasks[tdlId], newTask]});
        } else {
            setInputError('Error');
        }
    }



    const chnageCheckboxStatus = (taskId:string) => {
        // setTasks(tasks.map(t => t.id === taskId ? {...t, isDone: !t.isDone} : t))
    }


    return (
        <div className="App">
            {todolists.map(tdl => {
                let filteredTasks = tasks[tdl.id];
                if (tdl.filter === 'Completed') {
                    filteredTasks = tasks[tdl.id].filter(task => task.isDone);
                }
                if (tdl.filter === 'Active') {
                    filteredTasks = tasks[tdl.id].filter(task => !task.isDone);
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
