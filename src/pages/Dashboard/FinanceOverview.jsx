const Colors = ["#875CF5", "#FA2C37", "#FF6900"];
import CustomPieChart from "../../components/charts/CustomPieChart"
import { useTranslation } from "react-i18next";
function FinanceOverview({ totalBalance, totalIncome, totalExpense }) {
    const { t } = useTranslation();
    const BalanceData = [
        { name: t('totalBalance'), amount: totalBalance },
        { name: t('totalExpense'), amount: totalExpense },
        { name: t('totalIncome'), amount: totalIncome },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{t('financialOverview')}</h5>
            </div>
            <CustomPieChart
                data={BalanceData}
                title={t('totalBalance')}
                totalAmount={`${totalBalance}`}
                colors={Colors}
                showTextAnchor
            />
        </div>
    );
}

export default FinanceOverview;
