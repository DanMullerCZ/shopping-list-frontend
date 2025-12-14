import type {ShoppingListMember, ShoppingListUserRole} from "../../types/shoppingList";
import { useTranslation } from "react-i18next";

interface Props {
    members: ShoppingListMember[];
    isEditing: boolean;
    onDeleteMember: (id: string) => void;
    onAddMember: () => void;
    userRoleInList: ShoppingListUserRole;
}

export function ShoppingListMembers({
                                        members,
                                        isEditing,
                                        onDeleteMember,
                                        onAddMember,
                                        userRoleInList,
                                    }: Props) {
    const { t } = useTranslation();

    return (
        <section style={{ marginBottom: 16 }}>
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 8
                }}
            >
                <p style={{ margin: 0, fontWeight: 600 }}>{t("MEMBERS")}:</p>
                {userRoleInList === "owner" && (
                    <img
                        src="/user-plus.svg"
                        alt="user-plus-icon"
                        style={{ width: 20, height: 20, cursor: "pointer" }}
                        onClick={onAddMember}
                    />
                )}
            </div>

            <ul style={{ paddingLeft: 18, margin: 0 }}>
                {members.map((member) => (
                    <li key={member.id} style={{ marginBottom: 4 }}>
                        <span>{member.name}</span>
                        {isEditing && userRoleInList === "owner" && (
                            <button
                                style={{
                                    marginLeft: 8,
                                    fontSize: 12,
                                    color: "red",
                                    textDecoration: "underline",
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer"
                                }}
                                onClick={() => onDeleteMember(member.id)}
                            >
                                ({t("BTN.DELETE")})
                            </button>
                        )}
                    </li>
                ))}
            </ul>
        </section>
    );
}
