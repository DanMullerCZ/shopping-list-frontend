import { useState } from "react";
import { useListOverview } from "./ListOverviewProvider.tsx";
import type { ShoppingListStatus } from "../../types/shoppingList";
import { TableViewControls } from "../../components/lists/TableViewControls";
import { TableView } from "../../components/lists/TableView";
import {useTranslation} from "react-i18next";
import {ListBarChart} from "../../components/lists/ListsBarChart.tsx";

export function ListOverviewView() {
    const { t } = useTranslation();
    const { lists, loading, error, createList  } = useListOverview();
    const [ status, setStatus ] = useState<ShoppingListStatus>("active");

    if (loading) {
        return (
            <div style={{ padding: 16, textAlign: "center" }}>{t("STATE.LOADING")}</div>
        );
    }

    if (error) {
        return (
            <div style={{ padding: 16, textAlign: "center", color: "red" }}>
                {t("STATE.ERROR")}: {error}
            </div>
        );
    }

    const handleCreateList = async (name: string) => {
        if (!name.trim()) return;
        await createList(name.trim());
    };

    const filtered = lists.filter((list) => list.status === status);

    return (
        <div
            style={{
                maxWidth: 420,
                margin: "0 auto",
                padding: 16,
                fontFamily: "system-ui, sans-serif"
            }}
        >
            <header style={{ textAlign: "center", marginBottom: 16 }}>
                <h1 style={{ margin: 0, fontSize: 24 }}>{t("APP_NAME")}</h1>
            </header>

            <ListBarChart lists={filtered} />

            <TableViewControls status={status} onChangeStatus={setStatus} />
            <TableView lists={filtered} status={status} onCreateList={handleCreateList} />
        </div>
    );
}
