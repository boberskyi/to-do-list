import type { Meta, StoryObj } from "@storybook/react";
import React, { KeyboardEvent, useState } from "react";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { AddItemForm } from "./AddItemForm";
import { AddItemFormType } from "./AddItemFormTypes";
import { StyledAddForm } from "./AddItemFormStyles";

const meta = {
  title: "Todolists/AddItemForm",
  component: AddItemForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    callback: {
      description: "Btn clicked",
      action: "clicked",
    },
  },
} satisfies Meta<typeof AddItemForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {};

export const WithError: React.FC<AddItemFormType> = ({ callback }) => {
  const [inputError, setInputError] = useState("Error");
  let [newTitle, setNewTitle] = useState<string>("");

  const addTaskAndResetTitle = () => {
    setNewTitle("");

    if (newTitle.trim() !== "") {
      callback(newTitle);
      setInputError("");
    } else {
      setInputError("Error");
    }
  };
  const onTitleChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNewTitle(e.currentTarget.value);
  const onTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    e.code === "Enter" && addTaskAndResetTitle();
  };
  const onAddTitleClickHandler = () => addTaskAndResetTitle();

  return (
    <Paper variant="outlined">
      <StyledAddForm>
        <TextField
          value={newTitle}
          onChange={onTitleChangeHandler}
          onKeyDown={onTitleKeyDownHandler}
          label={inputError === "" ? "Write task" : inputError}
          size={"small"}
          error={inputError !== ""}
          variant="outlined"
        />

        <Button
          variant="outlined"
          size="large"
          disabled={newTitle === ""}
          onClick={onAddTitleClickHandler}
          endIcon={<AddCircleOutlineIcon />}
        >
          Add
        </Button>
      </StyledAddForm>
    </Paper>
  );
};
