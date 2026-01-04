import {useEffect, useState} from "react";
import { useNavigate } from "react-router-dom";
import { useShoppingListDetail } from "./ShoppingListDetailProvider";
import { ShoppingListInformation } from "../../components/core/shopping-list/ShoppingListInformation";
import { ShoppingListMembers } from "../../components/core/shopping-list/ShoppingListMembers";
import { ItemList } from "../../components/core/shopping-list/ItemList";
import type { ShoppingListItem as ShoppingListItemType, ShoppingListUserRole } from "../../types/shoppingList";
import { useTranslation } from "react-i18next";
import { CompletionPieChart } from "../../components/core/shopping-list/CompletionPieChart.tsx";
import { useAuth } from "../../auth/AuthContext.tsx";

export function ShoppingListDetailView() {
    const { t } = useTranslation();
    const { list, loading, error, setList } = useShoppingListDetail();
    const { setRoleInList } = useAuth();
    const [isEditing, setIsEditing] = useState(false);
    const [filter, setFilter] = useState<"all" | "notCompleted">("all");
    const navigate = useNavigate();
    const [userRoleInList, setUserRoleInList] = useState<ShoppingListUserRole | null>(null);

    useEffect(() => {
        if (!list)
            return;
        const role = setRoleInList(list.id);
        setUserRoleInList(role);
    }, [list?.id]);
    
    if (loading) {
        return <div style={{ padding: 16 }}>{t("STATE.LOADING")}</div>;
    }

    if (error) {
        return <div style={{ padding: 16 }}>{t("STATE.ERROR")}: {error ?? "Unknown error"}</div>;
    }

    if (!list) {
        return <div style={{ padding: 16 }}>{t("NOT_FOUND", { item: 'List' })}</div>;
    }

    if (!userRoleInList) {
        return <div style={{ padding: 16 }}>{t("NOT_FOUND", { item: 'List' })}</div>;
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
        if(confirm(t("CONFIRMS.DELETE.SHOPPING_LIST"))) {
            setList(null);
            handleBackButtonClick();
        }
    }

    const handleDeleteItem = (itemId: string) => {
        if(confirm(t("CONFIRMS.DELETE.ITEM"))) {
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
        const defaultNewItemName = t("DEFAULTS.NEW_SHOPPING_LIST_ITEM");
        const itemName = prompt(t("PROMPTS.ADD_SHOPPING_LIST"), defaultNewItemName);
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
        if(confirm(t("CONFIRMS.DELETE.MEMBER"))) {
            setList({
                ...list,
                members: list.members.filter((m) => m.id !== memberId)
            });
        }
    };

    const handleAddMember = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const value = prompt(t("PROMPTS.ENTER_EMAIL"));
        if (value !== null) {
            if(emailRegex.test(value)) {
                alert(t("ALERTS.INVITE_SENT", { value }));
            } else {
                alert(t("ALERTS.INVALID_EMAIL"));
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
                {!isEditing ? (<button onClick={() => handleBackButtonClick()}>{"< " + t("BTN.BACK")}</button>) : (<div></div>)}

                <div style={{ display: "flex", gap: 8 }}>
                    {!isEditing ? (
                        <>
                            {
                                userRoleInList === "owner" ?
                                    (<button onClick={() => handleShoppingListDelete()}>{t("BTN.DELETE")}</button>) :
                                    (<></>)
                            }
                            {
                                userRoleInList !== "viewer" ?
                                    (<button onClick={() => setIsEditing(true)}>{t("BTN.EDIT")} ✏️</button>) :
                                    (<></>)
                            }

                        </>
                    ) : (
                        <button onClick={() => setIsEditing(false)}>{t("BTN.FINISH")} ✏️</button>
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

            <CompletionPieChart
                listItems={list.items}
                isAnimationActive={true}
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
