import { ListOverviewProvider } from "./ListOverviewProvider.tsx";
import { ListOverviewView } from "./ListOverviewView.tsx";

export function ListOverview() {
    return (
        <ListOverviewProvider>
            <ListOverviewView />
        </ListOverviewProvider>
    );
}
