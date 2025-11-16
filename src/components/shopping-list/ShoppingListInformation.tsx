import * as React from "react";
import type {ShoppingListUserRole} from "../../types/shoppingList.ts";

interface Props {
    name: string;
    ownerName: string;
    isEditing: boolean;
    onEditShoppingListName: (name: string) => void;
    userRoleInList: ShoppingListUserRole;
}

export function ShoppingListInformation({
                                            name,
                                            ownerName,
                                            isEditing,
                                            onEditShoppingListName,
                                            userRoleInList
                                        }: Props) {

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onEditShoppingListName(e.target.value);
    };

    return (
        <section style={{ marginTop: 16, marginBottom: 16 }}>
            {isEditing && userRoleInList === "owner" ? (
                <input
                    value={name}
                    onChange={handleNameChange}
                    style={{
                        flex: 1,
                        marginRight: 8,
                        border: "1px solid #ccc",
                        borderRadius: 4,
                        padding: "4px 6px"
                    }}
                />
            ) : (
                <h1 style={{ fontSize: 28, marginBottom: 4 }}>{name}</h1>
            )}

            <p style={{ marginBottom: 12, color: "#666" }}>By {ownerName}</p>

            {isEditing && (
                <p style={{ marginTop: 8, fontSize: 12, color: "#999" }}>
                    Edit mode is active.
                </p>
            )}
        </section>
    );
}
