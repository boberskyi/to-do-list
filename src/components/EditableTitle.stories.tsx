import type { Meta, StoryObj } from '@storybook/react';
import {EditableTitle} from "./EditableTitle";
import {useState} from "react";

// More on how to set up stories at: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
const meta = {
    title: 'Todolists/EditableTitle',
    component: EditableTitle,
    parameters: {
        // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
        layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/react/writing-docs/autodocs
    tags: ['autodocs'],
    // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
    argTypes: {
        callback: {
            action: 'Clicked',
            description: 'Editable text changed'
        }
    },
    args: {
        oldTitle: 'Old title'
    }
} satisfies Meta<typeof EditableTitle>;

export default meta;
type Story = StoryObj<typeof meta>;

// More on writing stories with args: https://storybook.js.org/docs/react/writing-stories/args
export const Primary: Story = {};
const WorkingEditableTitle = () => {
    const [title, setTitle] = useState<string>('Old title');
    return <EditableTitle oldTitle={title} callback={(newTitle:string) => setTitle(newTitle)} />
}
export const Working: Story = {
    render: () => <WorkingEditableTitle />
}