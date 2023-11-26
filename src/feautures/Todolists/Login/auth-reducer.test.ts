import {authReducer, InitialStateType, setIsLoggedInAC} from "./auth-reducer";

describe('authReducer tests', () => {
    let initialState:InitialStateType;

    beforeEach(() => {
        initialState = {
            isLoggedIn: false
        };
    });

    test('should handle SET-IS-LOGGED-IN action', () => {
        const newState = authReducer(initialState, setIsLoggedInAC(true));
        expect(newState.isLoggedIn).toBe(true);
    });

});