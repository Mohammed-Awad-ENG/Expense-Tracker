import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionsInfoCard";
import moment from "moment";
import { useTranslation } from "react-i18next";

const ExpensesList = ({ transactions, onDelete, onDownload }) => {
    const { t } = useTranslation();
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{t('expensesSourcesTitle')}</h5>

                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> {t('downloadBtn')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((expenses) => (
                    <TransactionInfoCard
                        key={expenses._id}
                        title={expenses.category}
                        icon={expenses.icon}
                        date={moment(expenses.date).format("Do MMM YYYY")}
                        amount={expenses.amount}
                        type="expenses"
                        onDelete={() => onDelete(expenses._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default ExpensesList;
