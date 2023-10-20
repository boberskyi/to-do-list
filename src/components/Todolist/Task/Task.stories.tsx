import type { Meta, StoryObj } from '@storybook/react';
import {Task} from "./Task";
import {useState} from "react";
import {TaskType} from "../TodolistTypes";
import {StoreProviderDecorator} from "../../../state/StoreProviderDecorator";
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../../state/store";

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
        task: {id: 'string', title: 'Primary', isdone: false},
        tdlId: 'Primary',

    },
    decorators: [StoreProviderDecorator]
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

const PrimaryTask = () => {
    let task = {id: 'id1', title: 'Primary task', isdone: false};
    return <Task task={task} tdlId={'todolistId1'} />
}
export const Primary: Story = {
    render: () => <PrimaryTask />
};
const CheckedTask = () => {
    let task = {id: 'id1', title: 'Primary task', isdone: true};
    return <Task task={task} tdlId={'todolistId1'} />
}
export const Checked: Story = {
    render: () => <CheckedTask />
};
const WorkingTask = () => {
    let task = useSelector<AppRootStateType, TaskType>(state => state.tasks['todolistId1'][0])
    if(!task) task = {id: 'id1', title: 'Tasks deleted', isdone: true}
    return <Task task={task} tdlId={'todolistId1'} />
}
export const Working: Story = {
    render: () => <WorkingTask />
};