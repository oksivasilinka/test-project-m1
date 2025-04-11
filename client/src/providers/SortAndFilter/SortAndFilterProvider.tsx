
import React, { ReactNode, useState} from 'react';
import {SORT_TYPES, SortTypes} from "../../constants";
import {FilterSortContext} from "./SortAndFilterContext";

type SortAndFilterProviderProps = {
    children: ReactNode
}

export const SortAndFilterProvider = ({ children }: SortAndFilterProviderProps) => {
    const [query, setQuery] = useState('');
    const [sortBy, setSortBy] = useState<SortTypes>(SORT_TYPES.asc);

    return (
        <FilterSortContext.Provider value={{ query, setQuery, sortBy, setSortBy }}>
            {children}
        </FilterSortContext.Provider>
    );
};
