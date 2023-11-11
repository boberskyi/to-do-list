import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import {AddItemFormType} from "./AddItemFormTypes";
import {useAddItemForm} from "./useAddItemForm";
import Paper from "@mui/material/Paper";
import {StyledAddForm} from "./AddItemFormStyles";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const AddItemForm: React.FC<AddItemFormType> = ({ callback, disabled }) => {
    const { inputValue, inputError, setInputValue, addTaskAndResetTitle, onTitleKeyDownHandler, onAddTitleClickHandler } =
        useAddItemForm(callback);

    return (
        <Paper variant="outlined">
            <StyledAddForm>
                <TextField
                    value={inputValue}
                    onChange={(e) => setInputValue(e.currentTarget.value)}
                    onKeyDown={onTitleKeyDownHandler}
                    label={inputError === '' ? 'Write task' : inputError}
                    size={'small'}
                    error={inputError !== ''}
                    variant="outlined"
                    disabled={disabled}
                />

                <Button
                    variant="outlined"
                    size="large"
                    disabled={inputValue === '' || disabled}
                    onClick={onAddTitleClickHandler}
                    endIcon={<AddCircleOutlineIcon />}
                >
                    Add
                </Button>
            </StyledAddForm>
        </Paper>
    );
};