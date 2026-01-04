import type {
    ShoppingList,
    ShoppingListStatus
} from "../../../types/shoppingList.ts";
import { ShoppingListCard } from "./ShoppingListCard.tsx";
import { EmptyShoppingListCard } from "./EmptyShoppingListCard.tsx";
import {useTranslation} from "react-i18next";

interface Props {
    lists: ShoppingList[];
    status: ShoppingListStatus;
    onCreateList: (name: string) => void;
}

export function TableView({ lists, status, onCreateList }: Props) {
    const { t } = useTranslation();
    const isActive = status === "active";

    const handleClickCreate = () => {
        const name = prompt(t("PROMPTS.NEW_SHOPPING_LIST_NAME"));
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
