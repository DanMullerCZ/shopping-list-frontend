import type {ShoppingList} from "../types/shoppingList";

const mockList: ShoppingList = {
    id: "1",
    name: "Shopping List 1",
    ownerName: "John Doe",
    members: [
        { id: "1", name: "Jane Doe" },
        { id: "2", name: "Alice Doe" },
        { id: "3", name: "Bob Doe" }
    ],
    items: [
        { id: "1", name: "Shopping List Item", completed: false },
        { id: "2", name: "Shopping List Item (checked)", completed: true }
    ]
};

export async function getShoppingList(id: string): Promise<ShoppingList> {
    // pretend to call `/lists/:id`
    await new Promise(resolve => setTimeout(resolve, 400));

    if (id !== mockList.id) {
        throw new Error("List not found");
    }

    return mockList;
}
