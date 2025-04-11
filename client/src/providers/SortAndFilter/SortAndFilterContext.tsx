import {createContext, useContext} from "react";
import {SortTypes} from "../../constants";


export type FilterSortContextProps = {
    query: string,
    setQuery?: ( query: string )=> void,
    sortBy: SortTypes
    setSortBy? : (sortBy: SortTypes) => void
}

export  const FilterSortContext = createContext<FilterSortContextProps | null>(null)


export const useSortAndFilter = (): FilterSortContextProps => {
    const context = useContext<FilterSortContextProps | null>(FilterSortContext);
    if (!context) {
        throw new Error("SortAndFilterProvider Context no exist");
    }
    return context;
};