import { useEffect, useState } from 'react';
import { ItemsData } from "../types";

type UseFilterArg = {
	items: ItemsData,
	query: string
}

type UseFilterReturn = {
	filteredItems: UseFilterArg['items'];
};

function useFilter({items, query = ''}: UseFilterArg): UseFilterReturn {
	const [filteredItems, setFilteredItems] = useState<ItemsData>(items);

	useEffect(() => {
		const searchQuery = query.toLowerCase().trim().replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
		const filtered =  items.filter(item => `${item.id}`.includes(searchQuery));
		setFilteredItems(filtered);
	}, [items, query]);

	return { filteredItems };
}

export default useFilter;