export interface ShoppingListItem {
    id: string;
    name: string;
    completed: boolean;
}

export interface ShoppingListMember {
    id: string;
    name: string;
}

export type ShoppingListStatus = "active" | "archived";

export interface ShoppingList {
    id: string;
    name: string;
    ownerName: string;
    members: ShoppingListMember[];
    items: ShoppingListItem[];
    status: ShoppingListStatus;
}

export type ShoppingListUserRole = "owner" | "participant" | "viewer";
