import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from './tasks-reducer';
import {TaskPriorities, TaskStatuses} from "../todolist-api"; // replace with the actual path

describe('tasksReducer', () => {
    let initialState: TasksType;

    beforeEach(() => {
        initialState = {
            'todolistId1': [
                {
                    id: '1',
                    title: 'Task 1',
                    todoListId: 'todolistId1',
                    addedDate: '',
                    deadline: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: '',
                    startDate: '',
                    status: TaskStatuses.New
                },
                {
                    id: '2',
                    title: 'Task 2',
                    todoListId: 'todolistId1',
                    addedDate: '',
                    deadline: '',
                    order: 0,
                    priority: TaskPriorities.Low,
                    description: '',
                    startDate: '',
                    status: TaskStatuses.New
                },
            ],
        };
    });

    it('should handle REMOVE-TASK action', () => {
        const action = removeTaskAC('1', 'todolistId1');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolistId1']).toHaveLength(1);
        expect(newState['todolistId1'][0].id).not.toBe('1');
    });

    it('should handle ADD-TASK action', () => {
        const action = addTaskAC('New Task', 'todolistId1');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolistId1']).toHaveLength(3);
        expect(newState['todolistId1'][0].title).toBe('New Task');
    });

    it('should handle CHANGE-TASK-STATUS action', () => {
        const action = changeTaskStatusAC('1', 'todolistId1', TaskStatuses.Completed);
        const newState = tasksReducer(initialState, action);

        expect(newState['todolistId1'][0].status).toBe(TaskStatuses.Completed);
    });

    it('should handle CHANGE-TASK-TITLE action', () => {
        const action = changeTaskTitleAC('1', 'New Title', 'todolistId1');
        const newState = tasksReducer(initialState, action);

        expect(newState['todolistId1'][0].title).toBe('New Title');
    });
});
