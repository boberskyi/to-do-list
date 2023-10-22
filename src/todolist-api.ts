import axios from 'axios';

type TodolistType = {
    id: string
    addedDate: string
    order: number
    title: string
}

type ResponseType<T = {}> = {
    resultCode: number
    messages: Array<string>
    fieldsErrors: Array<string>
    data: T
}

const instance = axios.create({
    baseURL: 'https://social-network.samuraijs.com/api/1.1/',
    withCredentials: true,
})


export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return instance.put<Array<ResponseType>>(
            `todo-lists/${todolistId}`,
            { title: title },
        )
    },
    deleteTodolist(todolistId: string) {
        return instance.delete<Array<ResponseType>>(
            `todo-lists/${todolistId}`
        )
    },
    createTodolist(title: string) {
        return instance.post<Array<ResponseType<{item: TodolistType}>>>(
            `todo-lists`,
            {title}
        )
    },
    getTodolist() {
        return instance.get<Array<ResponseType>>(
            `todo-lists`
        )
    },
    createTasks(todolistId: string, title: string) {
        return instance.post<Array<ResponseType>>(
            `todo-lists/${todolistId}/tasks`,
            {title}
        )
    },
    getTasks(todolistId:string) {
        return instance.get<Array<ResponseType>>(
            `todo-lists/${todolistId}/tasks`
        )
    },
    updateTask(todolistId: string, taskId:string, title: string) {
        return instance.put<Array<ResponseType>>(
            `todo-lists/${todolistId}/tasks/${taskId}`,
            { title: title },
        )
    },
    deleteTask(todolistId: string, taskId:string) {
        return instance.delete<Array<ResponseType>>(
            `todo-lists/${todolistId}/tasks/${taskId}`
        )
    },
}
