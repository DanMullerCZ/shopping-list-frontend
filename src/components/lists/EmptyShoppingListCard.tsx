import {useState} from "react";

interface Props {
    onCreate?: () => void; // you can wire it later
}

export function EmptyShoppingListCard({ onCreate }: Props) {
    const [hover, setHover] = useState(false);

    return (
        <div
            onClick={onCreate}
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            style={{
                padding: 16,
                borderRadius: 8,
                border: "1px solid #e0e0e0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                marginTop: 8,
                backgroundColor: hover ? "#fafafa" : "#fff",
                transition: "all 0.15s ease",
                transform: hover ? "scale(1.02)" : "scale(1)",
                boxShadow: hover
                    ? "0 2px 8px rgba(0,0,0,0.12)"
                    : "0 1px 3px rgba(0,0,0,0.06)"
            }}
        >
            <div
                style={{
                    width: 32,
                    height: 32,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 20,
                    color: "black"
                }}
            >
                +
            </div>
        </div>
    );
}
