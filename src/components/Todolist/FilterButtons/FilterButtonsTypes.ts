import {FilterValueType} from "../../../state/todolists-reducer";

export type FilterButtonsProps = {
    activeBtn: FilterValueType;
    onFilterClickHandler: (value: FilterValueType) => void;
};