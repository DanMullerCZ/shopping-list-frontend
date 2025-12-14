import { useState } from "react";
import { useNavigate } from "react-router-dom";
import type { ShoppingList } from "../../types/shoppingList";
import { useListOverview } from "../../routes/list-overview/ListOverviewProvider.tsx";
import { useTranslation } from "react-i18next";

interface Props {
    list: ShoppingList;
}

export function ShoppingListCard({ list }: Props) {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const { userName } = useListOverview();
    const isArchived = list.status === "archived";

    const [hover, setHover] = useState(false);

    return (
        <div
            onClick={() => navigate(`/lists/${list.id}`)}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                padding: 12,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                backgroundColor: hover ? "#fafafa" : "#fff",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                cursor: "pointer",
                opacity: isArchived ? 0.5 : 1,
                transition: "all 0.15s ease",
                transform: hover ? "scale(1.02)" : "scale(1)",
                boxShadow: hover
                    ? "0 2px 8px rgba(0,0,0,0.12)"
                    : "0 1px 3px rgba(0,0,0,0.06)"
            }}
        >
            <div>
                <div style={{ fontWeight: 600, marginBottom: 4, color: "black" }}>
                    {list.name}
                </div>
                <div style={{ fontSize: 12, color: "#555" }}>
                    {t("AUTHOR")}: {list.ownerName}{" "}
                    {list.ownerName === userName ? `(${t("MISC.YOU")})` : ""}
                </div>
            </div>

            <div
                style={{
                    fontSize: 24,
                    color: isArchived ? "#aaa" : hover ? "#666" : "#000",
                    transition: "color 0.15s ease"
                }}
            >
                &gt;
            </div>
        </div>
    );
}
