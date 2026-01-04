import { LangSwitcher } from "../../common/LangSwitcher";
import { ThemeSwitcher } from "../../common/ThemeSwitcher";
import { useAuth } from "../../../auth/AuthContext.tsx";

export function Navbar() {
    const { user } = useAuth();

    return (
        <header style={styles.navbar}>
            <div style={styles.left}>
                <LangSwitcher />
            </div>

            {
                user ?
                    <div style={styles.center}>
                        {user.name} {user.roleInOpenedProject ? <span style={styles.role}>({user.roleInOpenedProject})</span> : <span></span>}
                    </div>
                    : <div style={styles.center}></div>
            }

            <div style={styles.right}>
                <ThemeSwitcher />
            </div>
        </header>
    );
}

const styles: Record<string, React.CSSProperties> = {
    navbar: {
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "8px 16px",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg-elevated)",
        color: "var(--text)",
        position: "sticky",
        top: 0,
        zIndex: 10
    },
    left: {
        justifySelf: "start"
    },
    center: {
        justifySelf: "center",
        fontWeight: 600
    },
    role: {
        opacity: 0.7,
        fontWeight: 400
    },
    right: {
        justifySelf: "end"
    }
};
