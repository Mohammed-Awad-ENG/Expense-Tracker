import { useMemo } from "react";
import { prepareExpenseBarChartData } from "../../utils/Helper";
import CustomBarChart from "../../components/charts/CustomBarChart";
import { useTranslation } from "react-i18next";
function Last120DaysExpenses({ data }) {
    const { t } = useTranslation();
    // const [chartData, setChartData] = useState([]);

    const chartData = useMemo(() => {
        return prepareExpenseBarChartData(data);
    }, [data]);
    // useEffect(() => {
    //     const result = prepareExpenseBarChartData(data);
    //     setChartData(result);
    //     return () => {};
    // }, [data]);

    return (
        <div className="card col-span-1">
            <div className="flex items-center justify-between">
                <h5 className="text-lg">{t('last30DaysExpenses')}</h5>
            </div>
            <CustomBarChart data={chartData} />
        </div>
    );
}
export default Last120DaysExpenses;
