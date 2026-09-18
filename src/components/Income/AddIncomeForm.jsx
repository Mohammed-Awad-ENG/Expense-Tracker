import Input from "../inputs/Input";
import EmojiPickerProp from "../EmojiPickerProp.jsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function AddIncomeForm({ onAddIncome }) {
    const { t } = useTranslation();
    const [Income, setIncome] = useState({
        sources: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, val) => {
        setIncome((prevIncome) => ({
            ...prevIncome,
            [key]: val,
        }));
    };

    return (
        <div>
            <EmojiPickerProp 
                icon={Income.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            
            <Input
                value={Income.sources}
                onChange={({ target }) => handleChange("sources", target.value)}
                label={t('incomeSourceLabel')}
                placeholder={t('incomeSourcePlaceholder')}
                type="text"
            />

            <Input
                value={Income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label={t('amountLabel')}
                placeholder=""
                type="number"
            />

            <Input
                value={Income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label={t('dateLabel')}
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddIncome(Income)}
                >
                    {t('addIncomeBtn')}
                </button>
            </div>
        </div>
    );
}

export default AddIncomeForm;