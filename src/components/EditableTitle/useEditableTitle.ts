import { ChangeEvent, useState } from "react";

export const useEditableTitle = (initialTitle: string, callback: (newTitle: string) => void) => {
  const [isEditable, setEditable] = useState(false);
  const [newTitle, setNewTitle] = useState(initialTitle);

  const startEditing = () => {
    setEditable(true);
  };

  const saveChanges = () => {
    setEditable(false);
    callback(newTitle);
  };

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(e.currentTarget.value);
  };

  return {
    isEditable,
    newTitle,
    startEditing,
    saveChanges,
    handleTitleChange,
  };
};
