import type { ShoppingList, ShoppingListStatus } from "../types/shoppingList";

const mockMembers = [
    { id: "1", name: "Jane Doe" },
    { id: "2", name: "Alice Doe" },
    { id: "3", name: "Bob Doe" }
];

const mockItems = [
    { id: "1", name: "Shopping List Item", completed: false },
    { id: "2", name: "Shopping List Item (checked)", completed: true }
];

const mockLists: ShoppingList[] = [
    {
        id: "1",
        name: "Shopping List 1",
        ownerName: "John Doe",
        members: mockMembers,
        items: mockItems,
        status: "active"
    },
    {
        id: "2",
        name: "Shopping List 2",
        ownerName: "Jane Doe",
        members: mockMembers,
        items: mockItems,
        status: "active"
    },
    {
        id: "3",
        name: "Shopping List 3",
        ownerName: "John Doe",
        members: mockMembers,
        items: mockItems,
        status: "archived"
    }
];

let nextId = mockLists.length + 1;

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getShoppingLists(
    status?: ShoppingListStatus
): Promise<ShoppingList[]> {
    await delay(100);

    if (!status) return mockLists;

    return mockLists.filter((list) => list.status === status);
}

export async function getShoppingList(id: string): Promise<ShoppingList> {
    await delay(100);

    const list = mockLists.find((l) => l.id === id);
    if (!list) {
        throw new Error("List not found");
    }

    return list;
}

export async function deleteShoppingList(id: string): Promise<void> {
    await delay(100);

    const index = mockLists.findIndex((l) => l.id === id);
    if (index === -1) {
        throw new Error("List not found");
    }

    mockLists.splice(index, 1);
}

export async function updateShoppingList(id: string, list: ShoppingList): Promise<void> {
    await delay(100);

    const index = mockLists.findIndex((l) => l.id === id);
    if (index === -1) {
        throw new Error("List not found");
    }

    mockLists[index] = list;
}

export async function createShoppingList(
    name: string,
    ownerName: string
): Promise<ShoppingList> {
    await delay(100);

    const newList: ShoppingList = {
        id: String(nextId++),
        name,
        ownerName,
        members: [],
        items: [],
        status: "active"
    };

    mockLists.push(newList);
    return newList;
}
