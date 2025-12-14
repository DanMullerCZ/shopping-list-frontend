import type {ShoppingListItem, ShoppingListUserRole} from "../../types/shoppingList";
import { ShoppingListItem as ShoppingListItemRow } from "./ShoppingListItem";
import {useTranslation} from "react-i18next";

interface Props {
    items: ShoppingListItem[];
    isEditing: boolean;
    onToggleComplete: (id: string) => void;
    onDeleteItem: (id: string) => void;
    onEditItemName: (id: string, name: string) => void;
    onAddItem: () => void;
    filter: "all" | "notCompleted";
    onFilterChange: (filter: "all" | "notCompleted") => void;
    userRoleInList: ShoppingListUserRole;
}

export function ItemList({
                             items,
                             isEditing,
                             onToggleComplete,
                             onDeleteItem,
                             onEditItemName,
                             onAddItem,
                             filter,
                             onFilterChange,
                             userRoleInList,
                         }: Props) {
    const { t } = useTranslation();

    return (
        <section>
            <div style={{ display: "flex", gap: 8, marginTop: 12, marginBottom: 6 }}>
                <button
                    onClick={() => onFilterChange("all")}
                    style={{
                        padding: "4px 12px",
                        borderRadius: 999,
                        border: "none",
                        backgroundColor: filter === "all" ? "#eee" : "#333",
                        color: filter === "all" ? "#000" : "#fff"
                    }}
                >
                    {t("BTN.ITEMS_CONTROL.ALL")}
                </button>
                <button
                    onClick={() => onFilterChange("notCompleted")}
                    style={{
                        padding: "4px 12px",
                        borderRadius: 999,
                        border: "none",
                        backgroundColor: filter === "notCompleted" ? "#eee" : "#333",
                        color: filter === "notCompleted" ? "#000" : "#fff"
                    }}
                >
                    {t("BTN.ITEMS_CONTROL.NOT_COMPLETED")}
                </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {items.map((item) => (
                    <ShoppingListItemRow
                        key={item.id}
                        item={item}
                        isEditing={isEditing}
                        onToggleComplete={onToggleComplete}
                        onDeleteItem={onDeleteItem}
                        onEditItemName={onEditItemName}
                    />
                ))}

                {!isEditing && userRoleInList !== "viewer" && (
                    <button
                        style={{
                            marginTop: 8,
                            padding: "12px 0",
                            borderRadius: 8,
                            border: "1px dashed #aaa",
                            backgroundColor: "#fafafa",
                            cursor: "pointer",
                            color: "black"
                        }}
                        onClick={onAddItem}
                    >
                        +
                    </button>
                )}
            </div>
        </section>
    );
}
