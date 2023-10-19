import React, {useState} from "react";
import ClearIcon from '@mui/icons-material/Clear';
import IconButton from '@mui/material/IconButton';
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {EditableTitle} from "../EditableTitle/EditableTitle";
import Button from "@mui/material/Button";
import Paper from '@mui/material/Paper';
import {TaskType, TodolistPropsType} from "./TodolistTypes";
import {StyledFilterWrap, StyledTasksWrap, StyledTodolist, StyledTodoListTitle} from "./TodolistStyles";
import {Task} from "./Task/Task";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {FilterValueType} from "../AppTypes";
import {changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC} from "../../../state/todolists-reducer";
import {addTaskAC} from "../../../state/tasks-reducer";


export const Todolist: React.FC<TodolistPropsType> = ({tdl}) => {
    const dispatch = useDispatch();

    let tasks = useSelector<AppRootStateType, TaskType[]>(state => state.tasks[tdl.id]);
    const [activeBtn, setActiveBtn] = useState<FilterValueType>('All');
    const changeTodolistFilter = (id:string, value: FilterValueType) => dispatch(changeTodolistFilterAC(id,value));
    const onFilterClickHandler = (value: FilterValueType) => {
        changeTodolistFilter(tdl.id, value);
        setActiveBtn(value);
    };
    if (tdl.filter === 'Completed') {
        tasks = tasks.filter(task => task.isdone);
    }
    if (tdl.filter === 'Active') {
        tasks = tasks.filter(task => !task.isdone);
    }
    const addTask = (newTitle: string) => dispatch(addTaskAC(newTitle, tdl.id));
    const removeTodolist = () => dispatch(removeTodolistAC(tdl.id));
    const updateTdlTitle = (newTitle: string) => dispatch(changeTodolistTitleAC(tdl.id, newTitle));
    const onAllFilterClickHandler = () => onFilterClickHandler('All');
    const onCompletedFilterClickHandler = () => onFilterClickHandler('Completed');
    const onActiveFilterClickHandler = () => onFilterClickHandler('Active');

    return (
        <Paper variant="outlined">
            <StyledTodolist>
                <StyledTodoListTitle>
                    <EditableTitle oldTitle={tdl.title} callback={updateTdlTitle}/>
                    <IconButton onClick={removeTodolist} aria-label="delete" size="small">
                        <ClearIcon/>
                    </IconButton>
                </StyledTodoListTitle>

                <AddItemForm callback={addTask}/>

                <Paper variant="outlined">
                    <StyledTasksWrap>
                        {
                            tasks.length === 0
                                ? <div>No tasks</div>
                                : tasks.map(t => {
                                    return <Task
                                        key={t.id}
                                        task={t}
                                        tdlId={tdl.id}
                                    />
                                })}
                    </StyledTasksWrap>
                </Paper>

                <StyledFilterWrap>
                    <Button variant={activeBtn === 'All' ? "contained" : "outlined"}
                            onClick={onAllFilterClickHandler}>
                        All
                    </Button>
                    <Button variant={activeBtn === 'Active' ? "contained" : "outlined"}
                            onClick={onActiveFilterClickHandler}>
                        Active
                    </Button>
                    <Button variant ={activeBtn === 'Completed' ? "contained" : "outlined"}
                            onClick={onCompletedFilterClickHandler}>
                        Completed
                    </Button>
                </StyledFilterWrap>

            </StyledTodolist>
        </Paper>
    )
};