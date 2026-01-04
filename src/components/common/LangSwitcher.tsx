import { useTranslation } from 'react-i18next';
import type { ChangeEvent } from "react";

export function LangSwitcher() {
    const { i18n } = useTranslation();

    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) => {
        void i18n.changeLanguage(e.target.value);
    };

    const supportedLanguages = [
        { name: "English", value: "en" },
        { name: "Čeština", value: "cs" }
    ] as const;

    return (
        <select onChange={handleLanguageChange} value={i18n.language}>
            {
                supportedLanguages.map((lang) => (
                    <option key={lang.value} value={lang.value}>{lang.name}</option>
                ))
            }
        </select>
    );
}
