import { useMemo } from "react";
import CustomPieChart from "../../components/charts/CustomPieChart";
import { useTranslation } from "react-i18next";
const Colors = ["#875CF5", "#FA2C37", "#FF6900"];

function ResentIncomeWithCart({ data, totalIncome }) {
    const { t } = useTranslation();
    


    const chartData = useMemo(() => {
    return data?.map((item) => ({
        name: item?.sources,
        amount: item?.amount,
    }));
}, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{t('last120DaysIncome')}</h5>
            </div>

            <CustomPieChart
                data={chartData}
                title={t('totalIncome')}
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={Colors}
            />
        </div>
    );
}

export default ResentIncomeWithCart;
