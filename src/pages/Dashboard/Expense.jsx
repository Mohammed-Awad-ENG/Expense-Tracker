import toast from "react-hot-toast";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import useUserAuth from "../../hooks/useUserAuth";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import { useState, useEffect } from "react";
import ExpenseOverview from "../../components/Expense/ExpenseOverview";
import Model from "../../components/Model";
import AddExpenseForm from "../../components/Expense/AddExpenseForm";
import ExpensesList from "../../components/Expense/ExpensesList.jsx";
import DeleteAlert from "../../components/DeleteAlert.jsx";
function Expense() {
    useUserAuth();
    const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [ExpenseData, setExpenseData] = useState([]);
    const [OpenDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchExpenseDetails = async () => {
        if (Loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.EXPENSE.GET_ALL_EXPENSES}`,
            );

            if (response.data) {
                setExpenseData(response.data);
            }
        } catch (error) {
            console.error("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddExpense = async (expense) => {
        const { category, amount, date, icon } = expense;
        if (!category.trim()) {
            toast.error("Category is required.");
            return;
        }

        if (!date) {
            toast.error("Date is required.");
            return;
        }
        try {
            await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
                category,
                amount,
                date,
                icon,
            });
            setOpenAddExpenseModal(false);
            toast.success("Income Added successfully");
            fetchExpenseDetails();
        } catch (err) {
            console.error("Error adding Income: ", err);
        }
    };
    const deleteExpense = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Expense details deleted successfully");
            fetchExpenseDetails();
        } catch (error) {
            console.error(
                "Error deleting Expenses:",
                error.response?.data?.message || error.message,
            );
        }
    };
    const handleDownloadExpenseData = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.EXPENSE.DOWNLOAD_EXPENSES,
                {
                    responseType: "blob",
                },
            );

            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.setAttribute("download", "Expenses_details.xlsx");

            document.body.appendChild(link);
            link.click();

            link.parentElement.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error downloading Expenses details: ", err);
            toast.error(
                "Filed to download Expenses details, Please try again.",
            );
        }
    };

    useEffect(() => {
        let cancelled = false;

        const fetchExpenseDetails = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(
                    API_PATHS.EXPENSE.GET_ALL_EXPENSES,
                );
                if (!cancelled && response.data) {
                    setExpenseData(response.data);
                }
            } catch (error) {
                console.error("Something went wrong. Please try again.", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchExpenseDetails();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <DashboardLayout activeMenu="Expenses">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <ExpenseOverview
                            transactions={ExpenseData}
                            onExpenseIncome={() => setOpenAddExpenseModal(true)}
                        />
                    </div>
                    <ExpensesList
                        transactions={ExpenseData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id });
                        }}
                        onDownload={handleDownloadExpenseData}
                    />
                </div>
                <Model
                    isOpen={openAddExpenseModal}
                    onClose={() => setOpenAddExpenseModal(false)}
                    title="Add Expense"
                >
                    <AddExpenseForm onAddExpense={handleAddExpense} />
                </Model>
                <Model
                    isOpen={OpenDeleteAlert.show}
                    onClose={() =>
                        setOpenDeleteAlert({ show: false, data: null })
                    }
                    title="Delete Expense"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this Expense?"
                        onDelete={() => deleteExpense(OpenDeleteAlert.data)}
                    />
                </Model>
            </div>
        </DashboardLayout>
    );
}

export default Expense;
