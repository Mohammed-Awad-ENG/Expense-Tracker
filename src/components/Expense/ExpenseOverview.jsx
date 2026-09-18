import { useMemo } from "react";
import { prepareExpanseBarChartData } from "../../utils/Helper";
import CustomLineChart from "../charts/CustomLineChart.jsx";
import { LuPlus } from "react-icons/lu";
import { useTranslation } from "react-i18next";
function ExpenseOverview({ transactions, onExpenseIncome }) {
    const { t } = useTranslation();
    const CartData = useMemo(() => {
        return prepareExpanseBarChartData(transactions);
    }, [transactions]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">{t('expenseOverviewTitle')}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {t('expenseOverviewDesc')}
                    </p>
                </div>

                <button className="add-btn" onClick={onExpenseIncome}>
                    <LuPlus className="text-lg" />
                    {t('addExpenseBtn')}
                </button>
            </div>
            <div className="mt-10">
                <CustomLineChart data={CartData} />
            </div>
        </div>
    );
}

export default ExpenseOverview;
