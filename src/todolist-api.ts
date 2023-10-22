import axios from 'axios'

const settings = {
    withCredentials: true,
}

export const todolistAPI = {
    updateTodolist(todolistId: string, title: string) {
        return axios.put(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            { title: title },
            settings
        )
    },
    deleteTodolist(todolistId: string) {
        return axios.delete(
            `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}`,
            settings
        )
    },
    createTodolist(title: string) {
        return axios.post(
            `https://social-network.samuraijs.com/api/1.1/todo-lists`,
            {title},
            settings
        )
    },
    getTodolist() {
        return axios.get(
            `https://social-network.samuraijs.com/api/1.1/todo-lists`,
            settings
        )
    },
}
