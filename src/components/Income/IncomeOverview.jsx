import { useMemo } from "react";
import { prepareIncomeBarChartData } from "../../utils/Helper";
import CustomBarChart from "../charts/CustomBarChart";
import { LuPlus } from "react-icons/lu";

function IncomeOverview({ transactions, onAddIncome }) {
    const CartData = useMemo(
        () => prepareIncomeBarChartData(transactions),
        [transactions],
    );

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">Income Overview</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        track your earnings over time and analyze your income.
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    Add Income
                </button>
            </div>
            <div className="mt-10">
                <CustomBarChart data={CartData} />
            </div>
        </div>
    );
}

export default IncomeOverview;
