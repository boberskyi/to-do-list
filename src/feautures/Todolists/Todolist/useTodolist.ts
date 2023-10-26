import {useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {AppRootStateType, useAppSelector} from '../../../App/store';
import {
    changeTodolistFilterAC,
    changeTodolistTitleAC,
    FilterValueType,
    removeTodolistAC
} from './todolists-reducer';
import {addTaskAC} from '../Task/tasks-reducer';
import {TodolistPropsType} from './TodolistTypes';
import {TaskStatuses, TaskType} from "../../../todolist-api";

export const useTodolist = ({ tdl }: TodolistPropsType) => {
    const dispatch = useDispatch();
    const tasks = useAppSelector<TaskType[]>(state => state.tasks[tdl.id]);
    const [activeBtn, setActiveBtn] = useState<FilterValueType>('All');

    const filteredTasks = tasks.filter((task) => {
        if (activeBtn === 'Active') {
            return task.status === TaskStatuses.New;
        }
        if (activeBtn === 'Completed') {
            return task.status === TaskStatuses.Completed;
        }
        return true;
    });


    const changeTodolistFilter = (id: string, value: FilterValueType) => {
        dispatch(changeTodolistFilterAC(id, value));
    };

    const onFilterClickHandler = (value: FilterValueType) => {
        changeTodolistFilter(tdl.id, value);
        setActiveBtn(value);
    };

    const addTask = (newTitle: string) => {
        dispatch(addTaskAC(newTitle, tdl.id));
    };

    const removeTodolist = () => {
        dispatch(removeTodolistAC(tdl.id));
    };

    const updateTdlTitle = (newTitle: string) => {
        dispatch(changeTodolistTitleAC(tdl.id, newTitle));
    };

    return {
        filteredTasks,
        activeBtn,
        onFilterClickHandler,
        addTask,
        removeTodolist,
        updateTdlTitle,
    };
};