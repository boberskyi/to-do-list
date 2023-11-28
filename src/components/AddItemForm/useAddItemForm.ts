import { useState, KeyboardEvent } from "react";

export const useAddItemForm = (callback: (newTitle: string) => void) => {
  const [inputValue, setInputValue] = useState<string>("");
  const [inputError, setInputError] = useState("");

  const addTaskAndResetTitle = () => {
    setInputError("");
    if (inputValue.trim() !== "") {
      callback(inputValue);
      setInputValue("");
    } else {
      setInputError("Error");
    }
  };

  const onTitleKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.code === "Enter") {
      addTaskAndResetTitle();
    }
  };

  const onAddTitleClickHandler = () => {
    addTaskAndResetTitle();
  };

  return {
    inputValue,
    inputError,
    setInputValue,
    addTaskAndResetTitle,
    onTitleKeyDownHandler,
    onAddTitleClickHandler,
  };
};
