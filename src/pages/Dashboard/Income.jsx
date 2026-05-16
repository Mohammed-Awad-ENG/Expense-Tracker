import { useState, useEffect } from "react";
import DashboardLayout from "../../components/layouts/DashboardLayout";
import IncomeOverview from "../../components/Income/IncomeOverview";
import axiosInstance from "../../utils/axiosinstance";
import { API_PATHS } from "../../utils/apiPaths";
import Model from "../../components/Model";
import AddIncomeForm from "../../components/Income/AddIncomeForm";
import toast from "react-hot-toast";
import IncomeList from "../../components/Income/IncomeList";
import DeleteAlert from "../../components/DeleteAlert";
import useUserAuth from "../../hooks/useUserAuth";
const Income = () => {
    useUserAuth();
    const [openAddIncomeModal, setOpenAddIncomeModal] = useState(false);
    const [Loading, setLoading] = useState(false);
    const [IncomeData, setIncomeData] = useState([]);
    const [OpenDeleteAlert, setOpenDeleteAlert] = useState({
        show: false,
        data: null,
    });

    const fetchIncomeDetails = async () => {
        if (Loading) return;

        setLoading(true);

        try {
            const response = await axiosInstance.get(
                `${API_PATHS.INCOME.GET_ALL_INCOME}`,
            );

            if (response.data) {
                setIncomeData(response.data);
            }
        } catch (error) {
            console.error("Something went wrong. Please try again.", error);
        } finally {
            setLoading(false);
        }
    };

    const handleAddIncome = async (income) => {
        const { sources, amount, date, icon } = income;
        if (!sources.trim()) {
            toast.error("Amount should be a valid number greater than 0.");
            return;
        }

        if (!date) {
            toast.error("Date is required.");
            return;
        }
        try {
            await axiosInstance.post(API_PATHS.INCOME.ADD_INCOME, {
                sources,
                amount,
                date,
                icon,
            });
            setOpenAddIncomeModal(false);
            toast.success("Income Added successfully");
            fetchIncomeDetails();
        } catch (err) {
            console.error("Error adding Income: ", err);
        }
    };
    const deleteIncome = async (id) => {
        try {
            await axiosInstance.delete(API_PATHS.INCOME.DELETE_INCOME(id));
            setOpenDeleteAlert({ show: false, data: null });
            toast.success("Income details deleted successfully");
            fetchIncomeDetails();
        } catch (error) {
            console.error(
                "Error deleting income:",
                error.response?.data?.message || error.message,
            );
        }
    };
    const handleDownloadIncomeData = async () => {
        try {
            const response = await axiosInstance.get(
                API_PATHS.INCOME.DOWNLOAD_INCOME,
                {
                    responseType: "blob",
                },
            );

            const blob = new Blob([response.data], {
                type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
            });

            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url; // Make sure to explicitly set the href attribute
            link.setAttribute("download", "Income_details.xlsx");

            document.body.appendChild(link);
            link.click();

            link.parentElement.removeChild(link);
            window.URL.revokeObjectURL(url);
        } catch (err) {
            console.error("Error downloading Income details: ", err);
            toast.error("Filed to download Income details, Please try again.");
        }
    };

    useEffect(() => {
        let cancelled = false;

        const fetchIncomeDetails = async () => {
            setLoading(true);
            try {
                const response = await axiosInstance.get(
                    API_PATHS.INCOME.GET_ALL_INCOME,
                );
                if (!cancelled && response.data) {
                    setIncomeData(response.data);
                }
            } catch (error) {
                console.error("Something went wrong. Please try again.", error);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };

        fetchIncomeDetails();

        return () => {
            cancelled = true;
        };
    }, []);

    return (
        <DashboardLayout activeMenu="Income">
            <div className="my-5 mx-auto">
                <div className="grid grid-cols-1 gap-6">
                    <div className="">
                        <IncomeOverview
                            transactions={IncomeData}
                            onAddIncome={() => setOpenAddIncomeModal(true)}
                        />
                    </div>
                    <IncomeList
                        transactions={IncomeData}
                        onDelete={(id) => {
                            setOpenDeleteAlert({ show: true, data: id });
                        }}
                        onDownload={handleDownloadIncomeData}
                    />
                </div>
                <Model
                    isOpen={openAddIncomeModal}
                    onClose={() => setOpenAddIncomeModal(false)}
                    title="Add Income"
                >
                    <AddIncomeForm onAddIncome={handleAddIncome} />
                </Model>

                <Model
                    isOpen={OpenDeleteAlert.show}
                    onClose={() =>
                        setOpenDeleteAlert({ show: false, data: null })
                    }
                    title="Delete Income"
                >
                    <DeleteAlert
                        content="Are you sure you want to delete this income?"
                        onDelete={() => deleteIncome(OpenDeleteAlert.data)}
                    />
                </Model>
            </div>
        </DashboardLayout>
    );
};

export default Income;
