import React from 'react';
import './App.css';
import {AddItemForm} from "./AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import { StyledAppWrapper } from './AppStyles';
import {useApp} from "./hooks/useApp";

const App = () => {

const {
    todolists,
    tasks,
    addTask,
    removeTask,
    updateTaskTitle,
    chnageCheckboxStatus,
    updateTdlTitle,
    changeTodolistFilter,
    removeTodolist,
    addTodolist
} = useApp();

    return (
        <div className="App">
            <StyledAppWrapper>
                {todolists.map(tdl => <Todolist
                    key={tdl.id}
                    title={tdl.title}
                    filter={tdl.filter}
                    tasks={tasks[tdl.id]}
                    addTask={addTask}
                    updateTdlTitle={updateTdlTitle}
                    changeTodolistFilter={changeTodolistFilter}
                    removeTodolist={removeTodolist}
                    removeTask={removeTask}
                    updateTaskTitle={updateTaskTitle}
                    chnageCheckboxStatus={chnageCheckboxStatus}
                    tdlId={tdl.id} />)}

                <AddItemForm callback={addTodolist}/>
            </StyledAppWrapper>
        </div>
    );
}

export default App;