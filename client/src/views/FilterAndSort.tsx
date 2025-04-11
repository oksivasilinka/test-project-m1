import {ChangeEvent}  from 'react'
import {FilterSortContextProps} from "../providers";

type FilterAndSortProps =  Omit<FilterSortContextProps, 'setSortBy'>  & {
    handleSortClick: () => void
}

export const FilterAndSort = ({setQuery, query, sortBy, handleSortClick}: FilterAndSortProps) => {
    const handleQueryChange = (event: ChangeEvent<HTMLInputElement>) => {
        setQuery?.(event.target.value);
    }

    return (
        <>
            <button onClick={handleSortClick}>Sort {sortBy}</button>
            <input type="text" placeholder={'Filter by ID'} value={query} onChange={handleQueryChange} />
        </>
    )
}