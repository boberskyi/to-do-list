import {addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer, TasksType} from './tasks-reducer'
import {addTodolistAC, removeTodolistAC} from "./todolists-reducer";

let startState:TasksType;

beforeEach(() => {
    startState = {
        'todolistId1': [
            {id: '1', title: 'CSS', isdone: false},
            {id: '2', title: 'JS', isdone: true},
            {id: '3', title: 'React', isdone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isdone: false},
            {id: '2', title: 'milk', isdone: true},
            {id: '3', title: 'tea', isdone: false}
        ]
    };
})

test('correct task should be deleted from correct array', () => {
    const action = removeTaskAC('2', 'todolistId2');
    const endState = tasksReducer(startState, action);

    expect(endState).toEqual({
        'todolistId1': [
            {id: '1', title: 'CSS', isdone: false},
            {id: '2', title: 'JS', isdone: true},
            {id: '3', title: 'React', isdone: false}
        ],
        'todolistId2': [
            {id: '1', title: 'bread', isdone: false},
            {id: '3', title: 'tea', isdone: false}
        ]
    })
})
test('correct task should be added to correct array', () => {
    const action = addTaskAC('juce', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId1'].length).toBe(3);
    expect(endState['todolistId2'].length).toBe(4);
    expect(endState['todolistId2'][0].id).toBeDefined();
    expect(endState['todolistId2'][0].title).toBe('juce');
    expect(endState['todolistId2'][0].isdone).toBe(false);
})
test('status of specified task should be changed', () => {
    const action = changeTaskStatusAC('2', 'todolistId2')
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].isdone).toBe(false);
    expect(endState['todolistId1'][1].isdone).toBe(true);
})
test('title of specified task should be changed', () => {
    const action = changeTaskTitleAC('2', 'New title', 'todolistId2');
    const endState = tasksReducer(startState, action)

    expect(endState['todolistId2'][1].title).toBe('New title');
    expect(endState['todolistId1'][1].title).toBe('JS');
})
test('new array should be added when new Todolist is added', () => {
    const action = addTodolistAC('new Todolist')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)
    const newKey = keys.find(k => k !== 'todolistId1' && k !== 'todolistId2')
    if (!newKey) {
        throw Error('new key should be added')
    }

    expect(keys.length).toBe(3)
    expect(endState[newKey]).toEqual([])
})
test('property with todolistId should be deleted', () => {
    const action = removeTodolistAC('todolistId2')
    const endState = tasksReducer(startState, action)
    const keys = Object.keys(endState)

    expect(keys.length).toBe(1)
    expect(endState['todolistId2']).not.toBeDefined()
})
