import moment from "moment";
import { LuArrowRight } from "react-icons/lu";
import TransactionsInfoCard from "../cards/TransactionsInfoCard";
function RecentTransactions({ transactions, onSeeMore }) {
    return (
        <div className="card">
            <div className="flex items-center justify-between ">
                <h5 className="text-lg">Recent Transactions</h5>
                <button className="card-btn" onClick={onSeeMore}>
                    See All <LuArrowRight className="text-base" />
                </button>
            </div>
            <div className="mt-6">
                {transactions?.slice(0, 5)?.map((item) => {
                    return (
                        <TransactionsInfoCard
                            key={item._id}
                            title={
                                item.type == "expense"
                                    ? item.category
                                    : item.sources
                            }
                            icon={item.icon}
                            date={moment(item.date).format("Do MMM YYYY")}
                            amount={item.amount}
                            type={item.type}
                            hideDeleteBtn
                        />
                    );
                })}
            </div>
        </div>
    );
}

export default RecentTransactions;
