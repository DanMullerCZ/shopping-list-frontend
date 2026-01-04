export function ThemeSwitcher() {
    const toggleTheme = () => {
        const root = document.documentElement;
        const current = root.dataset.theme;
        const next = current === "dark" ? "light" : "dark";

        root.dataset.theme = next;
        localStorage.setItem("theme", next);
    };

    return (
        <button onClick={toggleTheme} style={buttonStyle}>
            Toggle theme
        </button>
    );
}

const buttonStyle: React.CSSProperties = {
    padding: "6px 12px",
    borderRadius: 6,
    border: "1px solid var(--border)",
    background: "var(--bg-elevated)",
    color: "var(--text)",
    cursor: "pointer"
};
