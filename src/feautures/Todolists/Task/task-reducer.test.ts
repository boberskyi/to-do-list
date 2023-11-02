import {
    updateTaskAC,
    removeTaskAC,
    tasksReducer,
    TasksType,
    addTaskAC,
    setTasksAC,
} from './tasks-reducer';
import { TaskPriorities, TaskStatuses } from '../../../todolist-api'; // Replace with the actual path

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
                    status: TaskStatuses.New,
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
                    status: TaskStatuses.New,
                },
            ],
        };
    });

    it('should add a task to the state', () => {
        const task = {
            id: '3',
            title: 'Test Task',
            todoListId: 'todolistId1',
            addedDate: '',
            deadline: '',
            order: 0,
            priority: TaskPriorities.Low,
            description: '',
            startDate: '',
            status: TaskStatuses.New,
        };
        const action = addTaskAC(task);

        const newState = tasksReducer(initialState, action);

        // Add your assertions here to check if the task was added correctly.
        expect(newState['todolistId1']).toHaveLength(3);
        expect(newState['todolistId1'][2].id).toBe('3');
        expect(newState['todolistId1'][2].title).toBe('Test Task');
    });

    it('should remove a task from the state', () => {
        const taskId = '1';
        const tdlId = 'todolistId1';
        const action = removeTaskAC(taskId, tdlId);

        const newState = tasksReducer(initialState, action);

        // Add your assertions here to check if the task was removed correctly.
        expect(newState['todolistId1']).toHaveLength(1);
        expect(newState['todolistId1'][0].id).toBe('2');
    });

    it('should update a task in the state', () => {
        const tdlId = 'todolistId1';
        const taskId = '1';
        const domainModel = { title: 'Updated Title' };
        const action = updateTaskAC(tdlId, taskId, domainModel);

        const newState = tasksReducer(initialState, action);

        // Add your assertions here to check if the task was updated correctly.
        expect(newState['todolistId1'][0].title).toBe('Updated Title');
    });

    it('should set tasks in the state', () => {
        const tdlId = 'todolistId1';
        const tasks = [
            {
                id: '3',
                title: 'Task 3',
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                status: TaskStatuses.New,
            },
            {
                id: '4',
                title: 'Task 4',
                todoListId: 'todolistId1',
                addedDate: '',
                deadline: '',
                order: 0,
                priority: TaskPriorities.Low,
                description: '',
                startDate: '',
                status: TaskStatuses.New,
            },
        ];
        const action = setTasksAC(tdlId, tasks);

        const newState = tasksReducer(initialState, action);

        // Add your assertions here to check if tasks were set correctly.
        expect(newState['todolistId1']).toHaveLength(2);
        expect(newState['todolistId1'][0].id).toBe('3');
        expect(newState['todolistId1'][1].id).toBe('4');
    });
});
