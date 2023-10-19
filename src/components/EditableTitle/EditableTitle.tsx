import TextField from "@mui/material/TextField";
import {EditableTitleType} from "./EditableTitleTypes";
import {useEditableTitle} from "./useEditableTitle";

export const EditableTitle: React.FC<EditableTitleType> = ({ oldTitle, callback }) => {
    const { isEditable, newTitle, startEditing, saveChanges, handleTitleChange } = useEditableTitle(
        oldTitle,
        callback
    );

    return (
        <div>
            {isEditable ? (
                <TextField
                    value={newTitle}
                    type="text"
                    onChange={handleTitleChange}
                    onBlur={saveChanges}
                    autoFocus
                    variant="standard"
                />
            ) : (
                <span onDoubleClick={startEditing}>{oldTitle}</span>
            )}
        </div>
    );
};