import type { ShoppingListUserRole } from "./shoppingList.ts";

export type User = {
    id: string;
    name: string;
    token: string;
    roleInOpenedProject: ShoppingListUserRole | null
};
