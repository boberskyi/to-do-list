import { FilterValueType } from "../Todolist/todolists-reducer";

export type FilterButtonsProps = {
  activeBtn: FilterValueType;
  onFilterClickHandler: (value: FilterValueType) => void;
};
