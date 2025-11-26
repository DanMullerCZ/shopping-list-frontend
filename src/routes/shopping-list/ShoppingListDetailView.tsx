import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingListDetail } from "./ShoppingListDetailProvider";
import { ShoppingListInformation } from "../../components/shopping-list/ShoppingListInformation";
import { ShoppingListMembers } from "../../components/shopping-list/ShoppingListMembers";
import { ItemList } from "../../components/shopping-list/ItemList";
import type { ShoppingListItem as ShoppingListItemType, ShoppingListUserRole } from "../../types/shoppingList";

export function ShoppingListDetailView() {
    const { list, loading, error, setList } = useShoppingListDetail();
    const [isEditing, setIsEditing] = useState(false);
    const [filter, setFilter] = useState<"all" | "notCompleted">("all");
    const navigate = useNavigate();

    const getRandomRole = (enforcedIdx?: 0 | 1 | 2): ShoppingListUserRole => {
        const roles: ShoppingListUserRole[] = ["owner", "participant", "viewer"];
        const index = Math.floor(Math.random() * roles.length);
        return enforcedIdx !== undefined ? roles[enforcedIdx] : roles[index];
    }

    // can get random role for testing purposes if index is not provided
    const userRoleInList: ShoppingListUserRole = getRandomRole(0);

    if (loading) {
        return <div style={{ padding: 16 }}>Loading…</div>;
    }

    if (error) {
        return <div style={{ padding: 16 }}>Error: {error ?? "Unknown error"}</div>;
    }

    if (!list) {
        return <div style={{ padding: 16 }}>List Not Found</div>;
    }

    const filteredItems =
        filter === "all"
            ? list.items
            : list.items.filter((item) => !item.completed);

    const handleToggleComplete = (itemId: string) => {
        const items = list.items.map((item) =>
            item.id === itemId ? { ...item, completed: !item.completed } : item
        );
        setList({ ...list, items });
    };

    const handleBackButtonClick = () => {
        navigate(-1);
    }

    const handleShoppingListDelete = () => {
        if(confirm("Are you sure you want to delete whole shopping list?")) {
            setList(null);
            handleBackButtonClick();
        }
    }

    const handleDeleteItem = (itemId: string) => {
        if(confirm("Are you sure you want to delete this item?")) {
            const items = list.items.filter((item) => item.id !== itemId);
            setList({ ...list, items });
        }
    };

    const handleEditItemName = (itemId: string, name: string) => {
        const items = list.items.map((item) =>
            item.id === itemId ? { ...item, name } : item
        );
        setList({ ...list, items });
    };

    const handleEditShoppingListName = (name: string) => {
        setList({ ...list, name });
    };

    const handleAddItem = () => {
        const defaultNewItemName = "New Item";
        const itemName = prompt("Are you sure you want to add a shopping list?", defaultNewItemName);
        if(itemName !== null) {
            const newItem: ShoppingListItemType = {
                id: Math.random().toString(36).slice(2),
                name: itemName.length !== 0 ? itemName : defaultNewItemName,
                completed: false
            };
            setList({ ...list, items: [...list.items, newItem] });
        }
    };

    const handleDeleteMember = (memberId: string) => {
        if(confirm("Are you sure you want to delete this member?")) {
            setList({
                ...list,
                members: list.members.filter((m) => m.id !== memberId)
            });
        }
    };

    const handleAddMember = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const value = prompt("Enter email address");
        if (value !== null) {
            if(emailRegex.test(value)) {
                alert(`User ${value} got invite link!`);
            } else {
                alert(`Invalid email address!`);
            }
        }
    }

    return (
        <div
            style={{
                maxWidth: 420,
                margin: "0 auto",
                padding: 16,
                fontFamily: "system-ui, sans-serif"
            }}
        >
            <header style={{ display: "flex", justifyContent: "space-between" }}>
                {!isEditing ? (<button onClick={() => handleBackButtonClick()}>{"< Back"}</button>) : (<div></div>)}

                <div style={{ display: "flex", gap: 8 }}>
                    {!isEditing ? (
                        <>
                            {
                                userRoleInList === "owner" ?
                                    (<button onClick={() => handleShoppingListDelete()}>Delete</button>) :
                                    (<></>)
                            }
                            {
                                userRoleInList !== "viewer" ?
                                    (<button onClick={() => setIsEditing(true)}>Edit ✏️</button>) :
                                    (<></>)
                            }

                        </>
                    ) : (
                        <button onClick={() => setIsEditing(false)}>Finish ✏️</button>
                    )}
                </div>
            </header>

            <ShoppingListInformation
                name={list.name}
                ownerName={list.ownerName}
                isEditing={isEditing}
                onEditShoppingListName={handleEditShoppingListName}
                userRoleInList={userRoleInList}
            />

            <ShoppingListMembers
                members={list.members}
                isEditing={isEditing}
                onDeleteMember={handleDeleteMember}
                onAddMember={handleAddMember}
                userRoleInList={userRoleInList}
            />

            <ItemList
                items={filteredItems}
                isEditing={isEditing}
                onToggleComplete={handleToggleComplete}
                onDeleteItem={handleDeleteItem}
                onEditItemName={handleEditItemName}
                onAddItem={handleAddItem}
                filter={filter}
                onFilterChange={setFilter}
                userRoleInList={userRoleInList}
            />
        </div>
    );
}
