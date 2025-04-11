import {ListItem} from "../components";
import {ItemsData} from "../types";

type ListItemsProps = {
    items: ItemsData
    activeItemId: number | null
    handleItemClick: (id: number) => void
}

export const ListItems = ({items, handleItemClick, activeItemId}: ListItemsProps) => {

    return (
        <div className="list-container">
            <div className="list">
                {!items?.length && <span>Loading...</span>}
                {items?.map((item) => (
                    <ListItem
                        key={item.id}
                        isactive={activeItemId===item.id}
                        id={item.id}
                        name={item.name}
                        description={item.description}
                        onClick={handleItemClick}
                    />
                ))}
            </div>
        </div>
    )
}