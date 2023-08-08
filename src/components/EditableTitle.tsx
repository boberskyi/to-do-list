import React, {ChangeEvent, useState} from 'react';

type EditableTitleType = {
    oldTitle: string,
    callback: (newTitle:string) => void
}
export const EditableTitle:React.FC<EditableTitleType> = ({oldTitle,callback}) => {
    const [editableMod, setEditableMod] = useState<boolean>(false);
    const [newTitle, setNewTitle] = useState<string>(oldTitle)

    const onTitleClicked = () => setEditableMod(true);
    const onInputLeave = () => {
        setEditableMod(false);
        callback(newTitle);
    }
    const onTitleChange = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }

    return (
        <div>
            {
                editableMod
                    ? <input value={newTitle}
                             type="text"
                             onChange={onTitleChange}
                             onBlur={onInputLeave}
                             autoFocus />
                    : <span onDoubleClick={onTitleClicked}>{oldTitle}</span>
            }

        </div>
    );
};