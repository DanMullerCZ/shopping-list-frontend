import type {
    ShoppingList,
    ShoppingListStatus
} from "../../types/shoppingList";
import { ShoppingListCard } from "./ShoppingListCard";
import { EmptyShoppingListCard } from "./EmptyShoppingListCard";

interface Props {
    lists: ShoppingList[];
    status: ShoppingListStatus;
    onCreateList: (name: string) => void;
}

export function TableView({ lists, status, onCreateList }: Props) {
    const isActive = status === "active";

    const handleClickCreate = () => {
        const name = prompt("Name of the new shopping list:");
        if (!name) return;
        onCreateList(name);
    };

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {lists.map((list) => (
                <ShoppingListCard key={list.id} list={list} />
            ))}

            {isActive && <EmptyShoppingListCard onCreate={handleClickCreate} />}
        </div>
    );
}
