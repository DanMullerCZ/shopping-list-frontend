import { Pie, PieChart, Tooltip } from 'recharts';
import type {ShoppingListItem} from "../../types/shoppingList.ts";

interface Props {
    listItems: ShoppingListItem[],
    isAnimationActive?: boolean
}

export function CompletionPieChart({ listItems, isAnimationActive = true }: Props) {
    const data: [
        { name: "completed", count: number },
        { name: "not_completed", count: number }
    ] = [
        { name: "completed", count: 0 },
        { name: "not_completed", count: 0 },
    ];

    for (const listItem of listItems) {
        if(listItem.completed) {
            data[0].count++;
        } else {
            data[1].count++;
        }
    }

    return (
        <PieChart width={200} height={200}>
            <Pie
                activeShape={{
                    fill: 'red',
                }}
                data={data}
                dataKey="count"
                isAnimationActive={isAnimationActive}
            />
            <Tooltip defaultIndex={2} />
        </PieChart>
    );
}
