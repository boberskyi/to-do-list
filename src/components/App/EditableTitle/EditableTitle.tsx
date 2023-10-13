import React, {ChangeEvent, memo, useState} from 'react';
import TextField from '@mui/material/TextField';
import {EditableTitleType} from "./EditableTitleTypes";

export const EditableTitle:React.FC<EditableTitleType> = memo(({...props}) => {
    console.log('Editable Title');

    const [editableMod, setEditableMod] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(props.oldTitle)

    const onTitleClicked = () => setEditableMod(true);
    const onInputLeave = () => {
        setEditableMod(false);
        props.callback(newTitle);
    }
    const onTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        <div>
            {
                editableMod
                    ? <TextField value={newTitle}
                               type="text"
                               onChange={onTitleChange}
                               onBlur={onInputLeave}
                               autoFocus
                               variant="standard" />
                    : <span onDoubleClick={onTitleClicked}>{props.oldTitle}</span>
            }

        </div>
    );
});