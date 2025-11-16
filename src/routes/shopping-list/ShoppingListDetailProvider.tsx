import {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren
} from "react";
import { useParams } from "react-router-dom";
import type {ShoppingList} from "../../types/shoppingList";
import { getShoppingList } from "../../api/shoppingList";

interface ShoppingListDetailContextValue {
    list: ShoppingList | null;
    loading: boolean;
    error: string | null;
    setList: (list: ShoppingList | null) => void;
}

const ShoppingListDetailContext =
    createContext<ShoppingListDetailContextValue | undefined>(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export function useShoppingListDetail() {
    const ctx = useContext(ShoppingListDetailContext);
    if (!ctx) {
        throw new Error(
            "useShoppingListDetail must be used within ShoppingListDetailProvider"
        );
    }
    return ctx;
}

export function ShoppingListDetailProvider({ children }: PropsWithChildren) {
    const { id } = useParams<{ id: string }>();
    const [list, setList] = useState<ShoppingList | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!id) {
            setError("Missing list id");
            setLoading(false);
            return;
        }

        setLoading(true);
        setError(null);

        getShoppingList(id)
            .then((data) => {
                setList(data);
            })
            .catch((err: Error) => {
                setError(err.message);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [id]);

    return (
        <ShoppingListDetailContext.Provider
            value={{ list, loading, error, setList }}
        >
            {children}
        </ShoppingListDetailContext.Provider>
    );
}
