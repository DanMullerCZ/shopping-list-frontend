import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { User } from "../types/user";
import { getUserRoleInList, mockFetchUserProfile, mockLogin } from "../api/user";
import type {ShoppingListUserRole} from "../types/shoppingList.ts";

type AuthState = {
    user: User | null;
    isLoading: boolean;
    error: string | null
    login: (username: string, password: string) => Promise<void>;
    logout: () => void;
    refreshProfile: () => Promise<void>;
    setRoleInList: (listId: string) => ShoppingListUserRole | null;
};

const AuthContext = createContext<AuthState | undefined>(undefined);

const STORAGE_KEY = "auth_user";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const login = async (username: string, password: string) => {
        setError(null);
        const u = await mockLogin(username, password);
        setUser(u);
    };

    useEffect(() => {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (raw) {
                setUser(JSON.parse(raw));
            } else {
                void login("John Doe", "SECRET_PASSWORD")
            }
        } catch {
            // ignore broken storage
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (user) {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
        } else {
            localStorage.removeItem(STORAGE_KEY);
        }
    }, [user]);

    const logout = () => {
        setUser(null);
    };

    const refreshProfile = async () => {
        if (!user) return;
        setError(null);
        try {
            const profile = await mockFetchUserProfile(user.token);
            setUser({ ...user, ...profile });
        } catch (e) {
            setError(e instanceof Error ? e.message : "Unknown error");
        }
    };

    const setRoleInList: (listId: string) => ShoppingListUserRole | null = (listId: string): ShoppingListUserRole | null => {
        if (!user) return null;
        try {
            const role = getUserRoleInList(listId);
            setUser({ ...user, roleInOpenedProject: role });
            return role;
        } catch (e) {
            setError(e instanceof Error ? e.message : "Unknown error");
            return null;
        }
    }

    const value = useMemo<AuthState>(
        () => ({ user, isLoading, error, login, logout, refreshProfile, setRoleInList }),
        [user, isLoading, error]
    );

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
    return ctx;
}
