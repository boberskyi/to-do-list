import type {Meta, StoryObj} from '@storybook/react';
import {Task} from "./Task";
import {StoreProviderDecorator} from "../../../state/StoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";
import {TaskPriorities, TaskStatuses, TaskType} from "../../../todolist-api";

const meta = {
    title: 'Todolists/Task',
    component: Task,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
    argTypes: {

    },
    args: {
        task: {
            id: 'string',
            title: 'Primary',
            addedDate: '',
            deadline: '',
            description: '',
            order: 0,
            priority: TaskPriorities.Low,
            startDate: '',
            status: TaskStatuses.New,
            todoListId: 'id1'
        },
        tdlId: 'Primary',

    },
    decorators: [StoreProviderDecorator]
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

const PrimaryTask = () => {
    let task = {
        id: 'id1',
        title: 'Primary task',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.New,
        todoListId: 'id1'
    };
    return <Task task={task} tdlId={'todolistId1'} />
}
export const Primary: Story = {
    render: () => <PrimaryTask />
};
const CheckedTask = () => {
    let task = {
        id: 'id1',
        title: 'Primary task',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.Completed,
        todoListId: 'id1'
    };
    return <Task task={task} tdlId={'todolistId1'} />
}
export const Checked: Story = {
    render: () => <CheckedTask />
};
const WorkingTask = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    if(!task) task = {
        id: 'id1',
        title: 'Tasks deleted',
        addedDate: '',
        deadline: '',
        description: '',
        order: 0,
        priority: TaskPriorities.Low,
        startDate: '',
        status: TaskStatuses.New,
        todoListId: 'id1'
    }
    return <Task task={task} tdlId={'todolistId1'} />
}
export const Working: Story = {
    render: () => <WorkingTask />
};