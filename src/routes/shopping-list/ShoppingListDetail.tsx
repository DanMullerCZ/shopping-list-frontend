import { ShoppingListDetailProvider } from "./ShoppingListDetailProvider";
import { ShoppingListDetailView } from "./ShoppingListDetailView";
import { LangSwitcher } from "../../components/common/LangSwitcher.tsx";

export function ShoppingListDetail() {
    return (
        <ShoppingListDetailProvider>
            <LangSwitcher />
            <ShoppingListDetailView />
        </ShoppingListDetailProvider>
    );
}
