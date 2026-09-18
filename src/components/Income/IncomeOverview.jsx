import { useMemo } from "react";
import { prepareIncomeBarChartData } from "../../utils/Helper";
import CustomBarChart from "../charts/CustomBarChart";
import { LuPlus } from "react-icons/lu";
import { useTranslation } from "react-i18next";

function IncomeOverview({ transactions, onAddIncome }) {
    const { t } = useTranslation();
    const CartData = useMemo(
        () => prepareIncomeBarChartData(transactions),
        [transactions],
    );

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <div className="">
                    <h5 className="text-lg">{t('incomeOverviewTitle')}</h5>
                    <p className="text-xs text-gray-400 mt-0.5">
                        {t('incomeOverviewDesc')}
                    </p>
                </div>

                <button className="add-btn" onClick={onAddIncome}>
                    <LuPlus className="text-lg" />
                    {t('addIncomeBtn')}
                </button>
            </div>
            <div className="mt-10">
                <CustomBarChart data={CartData} />
            </div>
        </div>
    );
}

export default IncomeOverview;
