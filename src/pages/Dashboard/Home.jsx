import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { IoMdCard } from "react-icons/io";
import InfoCard from "../../components/cards/InfoCard";
import { addThousandSeparator } from "../../utils/Helper";
import { LuHandCoins, LuWalletMinimal } from "react-icons/lu";
import RecentTransactions from "../../components/Dashboard/RecentTransactions";
import FinanceOverview from "../Dashboard/FinanceOverview";
import ExpensesTransactions from "../Dashboard/ExpensesTransactions";
import Last120DaysExpenses from "../Dashboard/Last120DaysExpenses";
import ResentIncomeWithCart from "../Dashboard/ResentIncomeWithCart";
import ResentIncome from "../Dashboard/ResentIncome";
function Home() {
    useUserAuth();

    const navigate = useNavigate();
    const [DashboardData, setDashboardData] = useState(null);
    // eslint-disable-next-line no-unused-vars
    const [Loading, setLoading] = useState(false);



    useEffect(() => {
        let cancelled = false;

        const fetchDashboardData = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(
                    API_PATHS.DASHBOARD.GET_DATA,
                );
                if (!cancelled && response.data) {
                    setDashboardData(response.data);
                }
            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchDashboardData();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <DashboardLayout activeMenu="Dashboard">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <InfoCard
                        icon={<IoMdCard />}
                        title="Total Balance"
                        value={addThousandSeparator(
                            DashboardData?.totalBalance || 0,
                        )}
                        color="bg-primary"
                    />
                    <InfoCard
                        icon={<LuWalletMinimal />}
                        title="Total Income"
                        value={addThousandSeparator(
                            DashboardData?.totalIncome || 0,
                        )}
                        color="bg-orange-500"
                    />
                    <InfoCard
                        icon={<LuHandCoins />}
                        title="Total Expenses"
                        value={addThousandSeparator(
                            DashboardData?.totalExpense || 0,
                        )}
                        color="bg-red-500"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                    <RecentTransactions
                        transactions={DashboardData?.recentTransactions || []}
                        onSeeMore={() => navigate("/expense")}
                    />
                    <FinanceOverview
                        totalBalance={DashboardData?.totalBalance || 0}
                        totalIncome={DashboardData?.totalIncome || 0}
                        totalExpense={DashboardData?.totalExpense || 0}
                    />

                    <Last120DaysExpenses
                        data={
                            DashboardData?.last120DaysExpense?.transactions ||
                            []
                        }
                    />
                    <ResentIncomeWithCart
                        data={
                            DashboardData?.last120DaysIncome?.transactions.slice(
                                0,
                                4,
                            ) || []
                        }
                        totalIncome={DashboardData?.totalIncome || 0}
                    />
                    <ExpensesTransactions
                        transactions={
                            DashboardData?.last120DaysExpense?.transactions ||
                            []
                        }
                        onSeeMore={() => navigate("/expense")}
                    />
                    <ResentIncome
                        transactions={
                            DashboardData?.last120DaysIncome?.transactions || []
                        }
                        onSeeMore={() => navigate("/income")}
                    />
                </div>
            </div>
        </DashboardLayout>
    );
}

export default Home;
