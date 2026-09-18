import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionsInfoCard";
import moment from "moment";
import { useTranslation } from "react-i18next";

const IncomeList = ({ transactions, onDelete, onDownload }) => {
    const { t } = useTranslation();
    return (
        <div className="card">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{t('incomeSourcesTitle')}</h5>

                <button className="card-btn" onClick={onDownload}>
                    <LuDownload className="text-base" /> {t('downloadBtn')}
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2">
                {transactions?.map((income) => (
                    <TransactionInfoCard
                        key={income._id}
                        title={income.sources}
                        icon={income.icon}
                        date={moment(income.date).format("Do MMM YYYY")}
                        amount={income.amount}
                        type="income"
                        onDelete={() => onDelete(income._id)}
                    />
                ))}
            </div>
        </div>
    );
};

export default IncomeList;
