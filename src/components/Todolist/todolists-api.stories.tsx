import React, {useEffect, useState} from 'react';
import {todolistAPI} from "../../todolist-api";

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