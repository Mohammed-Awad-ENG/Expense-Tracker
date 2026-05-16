import { useMemo } from "react";
import CustomPieChart from "../../components/charts/CustomPieChart";
const Colors = ["#875CF5", "#FA2C37", "#FF6900"];

function ResentIncomeWithCart({ data, totalIncome }) {
    


    const chartData = useMemo(() => {
    return data?.map((item) => ({
        name: item?.sources,
        amount: item?.amount,
    }));
}, [data]);

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Last 120 Days Income</h5>
            </div>

            <CustomPieChart
                data={chartData}
                title="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={Colors}
            />
        </div>
    );
}

export default ResentIncomeWithCart;
