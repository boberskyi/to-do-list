import React from 'react';
import Button from '@mui/material/Button';
import {FilterButtonsProps} from "./FilterButtonsTypes";

const FilterButtons: React.FC<FilterButtonsProps> = ({ activeBtn, onFilterClickHandler }) => {
    return (
        <>
            <Button
                variant={activeBtn === 'All' ? 'contained' : 'outlined'}
                onClick={() => onFilterClickHandler('All')}
            >
                All
            </Button>
            <Button
                variant={activeBtn === 'Active' ? 'contained' : 'outlined'}
                onClick={() => onFilterClickHandler('Active')}
            >
                Active
            </Button>
            <Button
                variant={activeBtn === 'Completed' ? 'contained' : 'outlined'}
                onClick={() => onFilterClickHandler('Completed')}
            >
                Completed
            </Button>
        </>
    );
};

export default FilterButtons;