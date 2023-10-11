import type { Meta, StoryObj } from '@storybook/react';
import {Task} from "./Task";
import {action} from '@storybook/addon-actions';

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
        // callback: {
        //     description: 'Btn clicked',
        //     action: 'clicked'
        // },
    },
} satisfies Meta<typeof Task>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {
    args: {
        task: {id: 'string', title: 'Primary', isdone: false},
        tdlId: 'Primary',
        removeTask: action('Removed'),
        updateTaskTitle: action('Updated Title'),
        chnageCheckboxStatus: action('Changed Checkbox Status')
    }
};
export const Checked: Story = {
    args: {
        task: {id: 'string', title: 'Checked', isdone: true},
        tdlId: 'Checked',
        removeTask: action('Removed'),
        updateTaskTitle: action('Updated Title'),
        chnageCheckboxStatus: action('Changed Checkbox Status')
    }
};