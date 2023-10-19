import type { Meta, StoryObj } from '@storybook/react';
import {useState} from "react";
import { EditableTitle } from './EditableTitle';

const meta = {
    title: 'Todolists/EditableTitle',
    component: EditableTitle,
    parameters: {
        layout: 'centered',
    },
    tags: ['autodocs'],
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

export const Primary: Story = {};
const WorkingEditableTitle = () => {
    const [title, setTitle] = useState<string>('Old title');
    return <EditableTitle oldTitle={title} callback={(newTitle:string) => setTitle(newTitle)} />
}
export const Working: Story = {
    render: () => <WorkingEditableTitle />
}