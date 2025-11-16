import type { ShoppingListItem as ShoppingListItemType } from "../../types/shoppingList";
import * as React from "react";

interface Props {
    item: ShoppingListItemType;
    isEditing: boolean;
    onToggleComplete: (id: string) => void;
    onDeleteItem: (id: string) => void;
    onEditItemName: (id: string, name: string) => void;
}

export function ShoppingListItem({
                                     item,
                                     isEditing,
                                     onToggleComplete,
                                     onDeleteItem,
                                     onEditItemName
                                 }: Props) {
    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onEditItemName(item.id, e.target.value);
    };

    const baseStyle: React.CSSProperties = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "10px 12px",
        borderRadius: 8,
        border: "1px solid #ddd",
        backgroundColor: "#fff"
    };

    const textStyle: React.CSSProperties = {
        textDecoration: item.completed ? "line-through" : "none",
        color: item.completed ? "#999" : "#000",
        flex: 1,
        marginRight: 8
    };

    return (
        <div style={baseStyle}>
            {!isEditing ? (
                <span style={textStyle}>{item.name}</span>
            ) : (
                <input
                    value={item.name}
                    onChange={handleNameChange}
                    style={{
                        flex: 1,
                        marginRight: 8,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        padding: "4px 6px"
                    }}
                />
            )}

            {!isEditing ? (
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onToggleComplete(item.id)}>
                        {item.completed ? "❌" : "✔️"}
                    </button>
                </div>
            ) : (
                <div style={{ display: "flex", gap: 8 }}>
                    <button onClick={() => onDeleteItem(item.id)}>🗑️</button>
                </div>
            )}
        </div>
    );
}
