import Input from "../inputs/Input";
import EmojiPickerProp from "../EmojiPickerProp.jsx";
import { useState } from "react";

function AddExpenseForm({ onAddExpense }) {
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
                label="Expense Source"
                placeholder="Freelance, Salary, etc"
                type="text"
            />

            <Input
                value={Expense.amount}
                onChange={({ target }) => handleChange("amount", target.value)}
                label="Amount"
                placeholder=""
                type="number"
            />

            <Input
                value={Expense.date}
                onChange={({ target }) => handleChange("date", target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end mt-6">
                <button
                    type="button"
                    className="add-btn add-btn-fill"
                    onClick={() => onAddExpense(Expense)}
                >
                    Add Expense
                </button>
            </div>
        </div>
    );
}

export default AddExpenseForm;