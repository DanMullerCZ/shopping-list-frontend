import { ShoppingListDetailProvider } from "./ShoppingListDetailProvider";
import { ShoppingListDetailView } from "./ShoppingListDetailView";

export function ShoppingListDetail() {
    return (
        <ShoppingListDetailProvider>
            <ShoppingListDetailView />
        </ShoppingListDetailProvider>
    );
}
