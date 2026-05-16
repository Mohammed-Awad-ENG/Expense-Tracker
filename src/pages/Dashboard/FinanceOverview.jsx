const Colors = ["#875CF5", "#FA2C37", "#FF6900"];
import CustomPieChart from "../../components/charts/CustomPieChart"
function FinanceOverview({ totalBalance, totalIncome, totalExpense }) {
    const BalanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expense", amount: totalExpense },
        { name: "Total Income", amount: totalIncome },
    ];

    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">Financial Overview</h5>
            </div>
            <CustomPieChart
                data={BalanceData}
                title="Total Balance"
                totalAmount={`${totalBalance}`}
                colors={Colors}
                showTextAnchor
            />
        </div>
    );
}

export default FinanceOverview;
