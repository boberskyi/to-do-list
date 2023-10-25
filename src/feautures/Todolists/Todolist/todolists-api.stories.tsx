import React, {useEffect, useState} from 'react';
import {todolistAPI} from "../../../todolist-api";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        todolistAPI.getTodolist()
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistTitle = 'New titleeeeeeeeee!';

        todolistAPI.createTodolist(todolistTitle)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c3874d12-7490-4eab-b8ce-ad378f5c2c2c';

        todolistAPI.deleteTodolist(todolistId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = 'c3874d12-7490-4eab-b8ce-ad378f5c2c2c';
        const newTitle = 'New title 11212312312312323';

        todolistAPI.updateTodolist(todolistId, newTitle)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const CreateTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '15818667-f054-4ad5-bca4-82a601beabd4';
        const taskTitle = '123 132Task title';

        todolistAPI.createTasks(todolistId, taskTitle)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const GetTasks = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '15818667-f054-4ad5-bca4-82a601beabd4';

        todolistAPI.getTasks(todolistId)
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTaskTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '15818667-f054-4ad5-bca4-82a601beabd4';
        const taskId = 'a795ef32-68a5-4b33-a05a-13efc6dbbd39';
        const newTitle = 'T I TL E!!!';

        todolistAPI.updateTask(todolistId, taskId, newTitle)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTask = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        const todolistId = '15818667-f054-4ad5-bca4-82a601beabd4';
        const taskId = 'a795ef32-68a5-4b33-a05a-13efc6dbbd39';

        todolistAPI.deleteTask(todolistId, taskId)
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}