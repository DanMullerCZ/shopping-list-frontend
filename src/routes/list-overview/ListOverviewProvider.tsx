import {
    createContext,
    useContext,
    useEffect,
    useState,
    type PropsWithChildren
} from "react";
import type { ShoppingList } from "../../types/shoppingList";
import { getShoppingLists, createShoppingList } from "../../api/shoppingList";

interface ListOverviewContextValue {
    lists: ShoppingList[];
    loading: boolean;
    error: string | null;
    userName: "John Doe";
    createList: (name: string) => Promise<void>;
}

const ListOverviewContext = createContext<ListOverviewContextValue | undefined>(
    undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export function useListOverview() {
    const ctx = useContext(ListOverviewContext);
    if (!ctx) {
        throw new Error("useListOverview must be used within ListOverviewProvider");
    }
    return ctx;
}

export function ListOverviewProvider({ children }: PropsWithChildren) {
    const [lists, setLists] = useState<ShoppingList[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const userName = "John Doe";

    const createList = async (name: string) => {
        setLoading(true);
        setError(null);

        try {
            await createShoppingList(name, userName);
            setLists((prev) => [...prev]);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        setLoading(true);
        setError(null);

        getShoppingLists()
            .then((data) => {
                setLists(data);
            })
            .catch((err: Error) => {
                setError(err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <ListOverviewContext.Provider value={{ lists, loading, error, userName, createList }}>
            {children}
        </ListOverviewContext.Provider>
    );
}
