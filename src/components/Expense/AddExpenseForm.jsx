import Input from "../inputs/Input";
import EmojiPickerProp from "../EmojiPickerProp.jsx";
import { useState } from "react";
import { useTranslation } from "react-i18next";

function AddExpenseForm({ onAddExpense }) {
    const { t } = useTranslation();
    const [Expense, setExpense] = useState({
        category: "",
        amount: "",
        date: "",
        icon: "",
    });

    const handleChange = (key, val) => {
        setExpense((prevExpense) => ({
            ...prevExpense,
            [key]: val,
        }));
    };

    return (
        <div>
            <EmojiPickerProp 
                icon={Expense.icon}
                onSelect={(selectedIcon) => handleChange("icon", selectedIcon)}
            />
            
            <Input
                value={Expense.category}
                onChange={({ target }) => handleChange("category", target.value)}
                label={t('expenseSourceLabel')}
                placeholder={t('expenseSourcePlaceholder')}
                type="text"
            />

            <Input
                value={Expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label={t('amountLabel')}
                placeholder=""
                type="number"
            />

            <Input
                value={Expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label={t('dateLabel')}
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(Expense)}
                >
                    {t('addExpenseBtn')}
                </button>
            </div>
        </div>
    );
}

export default AddExpenseForm;