import { ListOverviewProvider } from "./ListOverviewProvider.tsx";
import { ListOverviewView } from "./ListOverviewView.tsx";
import { LangSwitcher } from "../../components/common/LangSwitcher.tsx";

export function ListOverview() {
    return (
        <ListOverviewProvider>
            <LangSwitcher />
            <ListOverviewView />
        </ListOverviewProvider>
    );
}
