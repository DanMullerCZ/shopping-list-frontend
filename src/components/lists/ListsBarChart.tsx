import { BarChart, Legend, XAxis, YAxis, CartesianGrid, Tooltip, Bar } from 'recharts';
import type { ShoppingList } from "../../types/shoppingList.ts";

interface Props {
    lists: ShoppingList[];
    isAnimationActive?: boolean;
}

export function ListBarChart({ lists, isAnimationActive = true }: Props) {
    const data: { name: string, completed: number, total: number }[] = [];

    for (const list of lists) {
        data.push({
            name: list.name,
            completed: list.items.filter(i => i.completed).length,
            total: list.items.length,
        })
    }

    return (
        <BarChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={data}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width="auto" interval={1} />
            <Tooltip />
            <Legend />
            <Bar dataKey="completed" fill="#8884d8" isAnimationActive={isAnimationActive} />
            <Bar dataKey="total" fill="#82ca9d" isAnimationActive={isAnimationActive} />
        </BarChart>
    )
};
