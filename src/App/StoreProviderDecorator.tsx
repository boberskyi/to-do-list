    import React from 'react';
    import {Provider} from "react-redux";
    import {AppRootStateType} from "./store";
    import {combineReducers, legacy_createStore} from "redux";
    import {tasksReducer} from "../feautures/Todolists/Task/tasks-reducer";
    import {todolistsReducer} from "../feautures/Todolists/Todolist/todolists-reducer";
    import {v1} from "uuid";
    import {TaskPriorities, TaskStatuses} from "../todolist-api";
    import {appReducer} from "./app-reducer";

    const rootReducer = combineReducers({
        app: appReducer,
        tasks: tasksReducer,
        todolists: todolistsReducer
    })

    const initialGlobalState = {
        app: {
            status: 'loading'
        },
        todolists: [
            {
                id: "todolistId1",
                title: "What to learn",
                filter: "all",
                addedDate: '',
                order: 0,
            },
            {
                id: "todolistId2",
                title: "What to buy",
                filter: "all",
                addedDate: '',
                order: 0,
            }
        ] ,
        tasks: {
            "todolistId1": [
                {
                    id: v1(),
                    title: "HTML&CSS",
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId1'
                },
                {
                    id: v1(),
                    title: "JS",
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.New,
                    todoListId: 'todolistId1'
                }
            ],
            "todolistId2": [
                {
                    id: v1(),
                    title: "Milk",
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.New,
                    todoListId: 'todolistId2'
                },
                {
                    id: v1(),
                    title: "React Book",
                    addedDate: '',
                    deadline: '',
                    description: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    startDate: '',
                    status: TaskStatuses.Completed,
                    todoListId: 'todolistId2'
                }
            ]
        }
    };

    export const storyBookStore = legacy_createStore(rootReducer, initialGlobalState as AppRootStateType);

    export const StoreProviderDecorator = (storyFn: () => React.ReactNode) => {
        return <Provider store={storyBookStore}>{storyFn()}</Provider>
    };