import type { Meta, StoryObj } from '@storybook/react';
import {Task} from "./Task";
import {action} from '@storybook/addon-actions';
import {useState} from "react";
import {TaskType} from "../TodolistTypes";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Todolists/Task',
    component: Task,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        removeTask: { action: 'Removed' },
        updateTaskTitle: { action: 'Updated Title' },
        chnageCheckboxStatus: { action: 'Changed Checkbox Status' }
    },
    args: {
        task: {id: 'string', title: 'Primary', isdone: false},
        tdlId: 'Primary',

    }
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};
export const Checked: Story = {
    args: {
        task: {id: 'string', title: 'Checked', isdone: true},
    }
};
const WorkingTask = () => {
    const [task, setTask] = useState<TaskType>({id: 'string', title: 'Primary', isdone: false});

    return <Task task={task}
                 tdlId={'string'}
                 removeTask={action(`Removed task id: ${task.id}`)}
                 updateTaskTitle={(newTitle: string) => setTask({...task, id: 'newId', title: newTitle})}
                 chnageCheckboxStatus={() => setTask({...task, isdone: !task.isdone})} />
}
export const Working: Story = {
    render: () => <WorkingTask />
};