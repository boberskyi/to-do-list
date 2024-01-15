import { tasksReducer, TasksType, taskThunks } from "./tasks-reducer";
import { TaskPriorities, TaskStatuses } from "../../../todolist-api";

describe("tasksReducer", () => {
  let initialState: TasksType;

  beforeEach(() => {
    initialState = {
      todolistId1: [
        {
          id: "1",
          title: "Task 1",
          todoListId: "todolistId1",
          addedDate: "",
          deadline: "",
          order: 0,
          priority: TaskPriorities.Low,
          description: "",
          startDate: "",
          status: TaskStatuses.New,
        },
        {
          id: "2",
          title: "Task 2",
          todoListId: "todolistId1",
          addedDate: "",
          deadline: "",
          order: 0,
          priority: TaskPriorities.Low,
          description: "",
          startDate: "",
          status: TaskStatuses.New,
        },
      ],
    };
  });

  it("should set tasks in the state", () => {
    const tdlId = "todolistId1";
    const tasks = [
      {
        id: "3",
        title: "Task 3",
        todoListId: "todolistId1",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        status: TaskStatuses.New,
      },
      {
        id: "4",
        title: "Task 4",
        todoListId: "todolistId1",
        addedDate: "",
        deadline: "",
        order: 0,
        priority: TaskPriorities.Low,
        description: "",
        startDate: "",
        status: TaskStatuses.New,
      },
    ];
    const action = taskThunks.setTasksTC.fulfilled({ tdlId, tasks }, "requestId", tdlId);

    const newState = tasksReducer(initialState, action);

    expect(newState["todolistId1"]).toHaveLength(tasks.length);
    expect(newState["todolistId1"]).toEqual(tasks);
  });
});
