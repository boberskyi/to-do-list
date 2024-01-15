import {
  FilterValueType,
  TodolistDomainType,
  todolistsAction,
  todolistsReducer,
} from "./todolists-reducer";

const initialTodolistState: TodolistDomainType[] = [
  {
    id: "1",
    title: "Todolist 1",
    filter: "All",
    entityStatus: "idle",
    addedDate: "",
    order: 0,
  },
  {
    id: "2",
    title: "Todolist 2",
    filter: "All",
    entityStatus: "idle",
    addedDate: "",
    order: 0,
  },
];

test("should add a new todolist", () => {
  const initialState = [...initialTodolistState];
  const newTodolist = {
    id: "3",
    title: "New Todolist",
    filter: "All",
    entityStatus: "idle",
    addedDate: "",
    order: 0,
  };

  const action = todolistsAction.addTodolist({ todolist: newTodolist });
  const newState = todolistsReducer(initialState, action);

  expect(newState.length).toBe(initialState.length + 1);
  expect(newState).toContainEqual(newTodolist);
});
test("should remove a todolist", () => {
  const initialState = [...initialTodolistState];

  const action = todolistsAction.removeTodolist({ tdlId: "1" });
  const newState = todolistsReducer(initialState, action);

  expect(newState.length).toBe(initialState.length - 1);
  expect(newState.every((tdl) => tdl.id !== "1")).toBe(true);
});
test("should change the title of a todolist", () => {
  const initialState = [...initialTodolistState];
  const newTitle = "New Title";

  const action = todolistsAction.changeTodolistTitle({ tdlId: "1", newTitle });
  const newState = todolistsReducer(initialState, action);

  expect(newState.find((tdl) => tdl.id === "1")?.title).toBe(newTitle);
});
test("should change the filter of a todolist", () => {
  const initialState = [...initialTodolistState];
  const newFilter: FilterValueType = "Completed";

  const action = todolistsAction.changeTodolistFilter({ tdlId: "1", filter: newFilter });
  const newState = todolistsReducer(initialState, action);

  expect(newState.find((tdl) => tdl.id === "1")?.filter).toBe(newFilter);
});
test("should set the todolists with the provided list", () => {
  const initialState: TodolistDomainType[] = [];
  const action = todolistsAction.setTodolists({ todolists: initialTodolistState });
  const newState = todolistsReducer(initialState, action);

  expect(newState.length).toBe(initialTodolistState.length);
  expect(newState).toEqual(initialTodolistState);
});
test("should clear the todolists data", () => {
  const initialState = [...initialTodolistState];
  const action = todolistsAction.clearData;
  const newState = todolistsReducer(initialState, action);

  expect(newState.length).toBe(0);
});
