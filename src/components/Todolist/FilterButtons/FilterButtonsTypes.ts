import { FilterValueType } from '../../../AppTypes';

export type FilterButtonsProps = {
    activeBtn: FilterValueType;
    onFilterClickHandler: (value: FilterValueType) => void;
};