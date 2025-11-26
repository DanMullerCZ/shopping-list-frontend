import * as React from "react";
import type { ShoppingListStatus } from "../../types/shoppingList";

interface Props {
    status: ShoppingListStatus;
    onChangeStatus: (status: ShoppingListStatus) => void;
}

export function TableViewControls({ status, onChangeStatus }: Props) {
    const commonStyle: React.CSSProperties = {
        padding: "4px 12px",
        borderRadius: 999,
        border: "none",
        cursor: "pointer",
        fontSize: 14
    };

    return (
        <div
            style={{
                display: "flex",
                gap: 8,
                marginBottom: 16,
                justifyContent: "center"
            }}
        >
            <button
                style={{
                    ...commonStyle,
                    backgroundColor: status === "active" ? "#eee" : "#333",
                    color: status === "active" ? "#000" : "#fff"
                }}
                onClick={() => onChangeStatus("active")}
            >
                Active
            </button>
            <button
                style={{
                    ...commonStyle,
                    backgroundColor: status === "archived" ? "#eee" : "#333",
                    color: status === "archived" ? "#000" : "#fff"
                }}
                onClick={() => onChangeStatus("archived")}
            >
                Archived
            </button>
        </div>
    );
}
