export interface ShoppingListItem {
    id: string;
    name: string;
    completed: boolean;
}

export interface ShoppingListMember {
    id: string;
    name: string;
}

export interface ShoppingList {
    id: string;
    name: string;
    ownerName: string;
    members: ShoppingListMember[];
    items: ShoppingListItem[];
}

export type ShoppingListUserRole = "owner" | "participant" | "viewer";
