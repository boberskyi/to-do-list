import {tasksReducer, TasksType} from "./tasks-reducer";
import {addTodolistAC, todolistsReducer} from "./todolists-reducer";
import {TodolistsType} from "../AppTypes";

test('ids should be equals', () => {
    const startTasksState: TasksType = {};
    const startTodolistsState: TodolistsType[] = [];

    const action = addTodolistAC('new Todolist');

    const endTasksState = tasksReducer(startTasksState, action);
    const endTodolistsState = todolistsReducer(startTodolistsState, action);

    const keys = Object.keys(endTasksState);
    const idFromTasks = keys[0];
    const idFromTodolists = endTodolistsState[0].id;

    expect(idFromTasks).toBe(action.payload.tdlId);
    expect(idFromTodolists).toBe(action.payload.tdlId);
})
