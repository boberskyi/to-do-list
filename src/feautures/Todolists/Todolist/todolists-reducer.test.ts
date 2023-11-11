import {
    createTodolistAC, changeTodolistFilterAC,
    changeTodolistTitleAC,
    removeTodolistAC,
    TodolistDomainType,
    todolistsReducer
} from "./todolists-reducer";
import {RequestStatusType} from "../../../App/app-reducer";

describe('todolistsReducer', () => {
    let initialState:TodolistDomainType[];

    beforeEach(() => {
        // Set up the initial state before each test
        initialState = [
            {
                id: 'todolistId1',
                addedDate: '',
                order: 0,
                title: 'What to learn',
                filter: 'All',
                entityStatus: 'idle'
            },
        ];
    });

    it('should handle REMOVE-TODOLIST action', () => {
        const action = removeTodolistAC('todolistId1');
        const newState = todolistsReducer(initialState, action);

        expect(newState).toHaveLength(0);
    });

    // it('should handle ADD-TODOLIST action', () => {
    //     const action = createTodolistAC('New Todolist');
    //     const newState = todolistsReducer(initialState, action);
    //
    //     // Expect that a new todolist is added to the state
    //     expect(newState).toHaveLength(2);
    //     expect(newState[1].title).toBe('New Todolist');
    //     expect(newState[1].filter).toBe('All');
    // });

    it('should handle CHANGE-TODOLIST-TITLE action', () => {
        const action = changeTodolistTitleAC('todolistId1', 'Updated Title');
        const newState = todolistsReducer(initialState, action);

        // Expect that the title of the todolist is updated
        expect(newState[0].title).toBe('Updated Title');
    });

    it('should handle CHANGE-TODOLIST-FILTER action', () => {
        const action = changeTodolistFilterAC('todolistId1', 'Completed');
        const newState = todolistsReducer(initialState, action);

        // Expect that the filter of the todolist is updated
        expect(newState[0].filter).toBe('Completed');
    });
});
