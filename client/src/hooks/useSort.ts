import { useMemo } from 'react';
import {ItemsData} from "../types";
import {SORT_TYPES, SortTypes} from "../constants";

type UseSortArg = {
	items: ItemsData,
	sortBy: SortTypes,
	setSortBy?: (sortBy: SortTypes)=> void
}

type UseSortReturn = {
	sortedItems: UseSortArg['items'],
	sortBy: UseSortArg['sortBy'],
	handleSortClick: () => void
}

function useSort({items, sortBy, setSortBy}: UseSortArg): UseSortReturn  {

	const sortedItems = useMemo(() => {
		if (sortBy === SORT_TYPES.asc) {
			return [...items].sort((a, b) => b.id - a.id)
		}
		
		return items;
	}, [items, sortBy]);
	
	const handleSortClick = () => {
		if (sortBy === SORT_TYPES.asc) {
			setSortBy?.(SORT_TYPES.desc);
		}
		if (sortBy === SORT_TYPES.desc) {
			setSortBy?.(SORT_TYPES.asc);
		}
	}

	return {sortedItems, sortBy, handleSortClick}
}

export default useSort;
