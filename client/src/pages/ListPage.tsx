import React, { useEffect, useMemo, useState } from 'react';
import { SubTitle} from '../components';
import useData from '../hooks/useData';
import useSort from '../hooks/useSort';
import {FilterAndSort, ListItems} from "../views";
import {useSortAndFilter} from "../providers";
import useFilter from "../hooks/useFilter";

function ListPage() {
    const items = useData();
    const {setQuery, query, setSortBy, sortBy: sortByDefault} = useSortAndFilter()

    const {sortedItems, sortBy, handleSortClick} = useSort({items, sortBy: sortByDefault, setSortBy});
    const {filteredItems} = useFilter({items: sortedItems, query})

    const [activeItemId,  setActiveItemId] = useState<number| null>(null);

    const activeItemText = useMemo(() => activeItemId ?? 'Empty', [activeItemId]);
    
    const handleItemClick = (id: number) => {
        setActiveItemId(id);
    };

    useEffect(() => {
        setQuery?.(query);
    }, [query]);


  return (
    <div className={'list-wrapper'}>
        <div className="list-header">
            <h1 className={'list-title'}>Items List</h1>
            <SubTitle>{activeItemText}</SubTitle>
            <FilterAndSort setQuery={setQuery} query={query} sortBy={sortBy} handleSortClick={handleSortClick}/>
        </div>
        <ListItems items={filteredItems} handleItemClick={handleItemClick} activeItemId={activeItemId}/>
    </div>
  );
}

export default ListPage;
