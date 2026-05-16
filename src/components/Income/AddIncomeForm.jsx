import Input from "../inputs/Input";
import EmojiPickerProp from "../EmojiPickerProp.jsx";
import { useState } from "react";

function AddIncomeForm({ onAddIncome }) {
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
                label="Income Source"
                placeholder="Freelance, Salary, etc"
                type="text"
            />

            <Input
                value={Income.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={Income.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddIncome(Income)}
                >
                    Add Income
                </button>
            </div>
        </div>
    );
}

export default AddIncomeForm;