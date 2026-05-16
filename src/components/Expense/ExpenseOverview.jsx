import { useMemo } from "react";
import { prepareExpanseBarChartData } from "../../utils/Helper";
import CustomLineChart from "../charts/CustomLineChart.jsx";
import { LuPlus } from "react-icons/lu";
function ExpenseOverview({ transactions, onExpenseIncome }) {
    const CartData = useMemo(() => {
        return prepareExpanseBarChartData(transactions);
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Expense Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        track your Expenses over time and analyze your Expense.
                    </p>
                </div>

                <button className="add-btn" onClick={onExpenseIncome}>
                    <LuPlus className="text-lg" />
                    Add Expense
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={CartData} />
            </div>
        </div>
    );
}

export default ExpenseOverview;
