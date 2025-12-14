import { useTranslation } from 'react-i18next';
import type { ChangeEvent } from "react";

export function LangSwitcher() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        void i18n.changeLanguage(e.target.value);
        // TODO: refresh page?
    };

    return (
        <select onChange={handleLanguageChange} value={i18n.language}>
            <option value='en'>English</option>
            <option value='cs'>Čeština</option>
        </select>
    );
}
