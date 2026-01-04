import type { ShoppingListUserRole } from "../types/shoppingList.ts";
import type { User } from "../types/user";

const getMockedRandomRole = (enforcedIdx?: 0 | 1 | 2): ShoppingListUserRole => {
    const roles: ShoppingListUserRole[] = ["owner", "participant", "viewer"];
    const index = Math.floor(Math.random() * roles.length);
    return enforcedIdx !== undefined ? roles[enforcedIdx] : roles[index];
}

export function getUserRoleInList(listId: string): ShoppingListUserRole {
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    const data = { listId }; data;

    return getMockedRandomRole();
}

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function mockLogin(username: string, _password: string): Promise<User> {
    await wait(400);

    return {
        id: crypto.randomUUID(),
        name: username || "John Doe",
        token: "mock-token-" + Math.random().toString(16).slice(2),
        roleInOpenedProject: null,
    };
}

export async function mockFetchUserProfile(token: string): Promise<Pick<User, "id" | "name">> {
    await wait(250);

    if (!token.startsWith("mock-token-")) {
        throw new Error("Unauthorized");
    }

    return { id: "server-user-id", name: "John Doe" };
}

