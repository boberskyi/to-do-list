import {
  changeTodolistEntityStatusAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  clearTodosDataAC,
  createTodolistAC,
  removeTodolistAC,
  setTodolistAC,
  TodolistDomainType,
  todolistsReducer,
} from "./todolists-reducer";
import { TodolistType } from "../../../todolist-api";

describe("todolistsReducer", () => {
  let initialState: TodolistDomainType[];

  beforeEach(() => {
    initialState = [
      {
        id: "todolistId1",
        addedDate: "",
        order: 0,
        title: "What to learn",
        filter: "All",
        entityStatus: "idle",
      },
    ];
  });

  it("should handle REMOVE-TODOLIST", () => {
    const action = removeTodolistAC("todolistId1");
    const nextState = todolistsReducer(initialState, action);

    expect(nextState).toEqual([]);
  });

  it("should handle ADD-TODOLIST", () => {
    const todolist: TodolistType = {
      id: "todolistId2",
      title: "New Todolist",
      addedDate: "",
      order: 0,
    };
    const action = createTodolistAC(todolist);
    const nextState = todolistsReducer(initialState, action);

    expect(nextState).toEqual([
      ...initialState,
      { ...todolist, filter: "All", entityStatus: "idle" },
    ]);
  });

  it("should handle CHANGE-TODOLIST-TITLE", () => {
    const action = changeTodolistTitleAC("todolistId1", "New Title");
    const nextState = todolistsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: "todolistId1",
        addedDate: "",
        order: 0,
        title: "New Title",
        filter: "All",
        entityStatus: "idle",
      },
    ]);
  });

  it("should handle CHANGE-TODOLIST-FILTER", () => {
    const action = changeTodolistFilterAC("todolistId1", "Completed");
    const nextState = todolistsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: "todolistId1",
        addedDate: "",
        order: 0,
        title: "What to learn",
        filter: "Completed",
        entityStatus: "idle",
      },
    ]);
  });

  it("should handle SET-TODOLIST", () => {
    const todolists = [
      {
        id: "todolistId2",
        title: "Todolist 2",
        addedDate: "",
        order: 1,
        entityStatus: "idle",
        filter: "All",
      },
      {
        id: "todolistId3",
        title: "Todolist 3",
        addedDate: "",
        order: 2,
        entityStatus: "idle",
        filter: "All",
      },
    ];
    const action = setTodolistAC(todolists);
    const nextState = todolistsReducer(initialState, action);

    expect(nextState.length).toBe(3); // Check if the length is as expected

    const firstItem = nextState[0];
    expect(firstItem.id).toBe("todolistId1");
    expect(firstItem.addedDate).toBe(""); // Check addedDate separately
    expect(firstItem.order).toBe(0); // Check order separately
    expect(firstItem.title).toBe("What to learn");
    expect(firstItem.filter).toBe("All");
    expect(firstItem.entityStatus).toBe("idle");

    expect(nextState.slice(1)).toEqual(todolists); // Check the rest of the array
  });

  it("should handle CHANGE-TODOLIST-ENTITY-STATUS", () => {
    const action = changeTodolistEntityStatusAC("todolistId1", "loading");
    const nextState = todolistsReducer(initialState, action);

    expect(nextState).toEqual([
      {
        id: "todolistId1",
        addedDate: "",
        order: 0,
        title: "What to learn",
        filter: "All",
        entityStatus: "loading",
      },
    ]);
  });

  it("should handle CLEAR-DATA", () => {
    const action = clearTodosDataAC();
    const nextState = todolistsReducer(initialState, action);

    expect(nextState).toEqual([]);
  });
});
