import React, {useEffect, useState} from 'react'
import axios from "axios";

export default {
    title: 'API'
}

const settings = {
    withCredentials: true
}

export const GetTodolists = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios
            .get(
                'https://social-network.samuraijs.com/api/1.1/todo-lists',
                settings
            )
            .then(res => setState(res.data))
    }, [])
    return <div>{JSON.stringify(state)}</div>
}
export const CreateTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios.post(
            'https://social-network.samuraijs.com/api/1.1/todo-lists',
            {title: 'New todolist 2'},
            settings
        )
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const DeleteTodolist = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios
            .delete(
                'https://social-network.samuraijs.com/api/1.1/todo-lists/3e3b23e0-5ea5-4081-8ba7-8d035c4f01ac',
                settings
            )
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}
export const UpdateTodolistTitle = () => {
    const [state, setState] = useState<any>(null)
    useEffect(() => {
        axios
            .put('https://social-network.samuraijs.com/api/1.1/todo-lists/c3874d12-7490-4eab-b8ce-ad378f5c2c2c',
                {title: 'New title 123'},
                settings
                )
            .then(res => setState(res.data))
    }, [])

    return <div>{JSON.stringify(state)}</div>
}