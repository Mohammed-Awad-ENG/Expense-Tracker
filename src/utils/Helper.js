import moment from "moment";

export const validateEmail = (email) => {
    return /^[^\s@]+@[^\s@]+$/.test(email);
};

export const addThousandSeparator = (num) => {
    if (num === null || isNaN(num)) return "";

    const [integerPart, decimalPart] = num.toString().split(".");
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ",");

    return `${formattedInteger}${decimalPart ? `.${decimalPart}` : ""}`;
};

export const prepareExpenseBarChartData = (data = []) => {
    const charData = data.map((item) => ({
        category: item?.category,
        amount: item?.amount,
    }));
    return charData;
};

export const prepareIncomeBarChartData = (data = []) => {
    const sortData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date),
    );
    const chartData = sortData.map(
        (item) => (
            {
                month: moment(item?.date).format("Do MMM"),
                amount: item?.amount,
                sources: item?.sources,
            }
        ),
    );
    return chartData;
};

export const prepareExpanseBarChartData = (data = []) => {
    const sortData = [...data].sort(
        (a, b) => new Date(a.date) - new Date(b.date),
    );
    const chartData = sortData.map(
        (item) => (
            {
                month: moment(item?.date).format("Do MMM"),
                amount: item?.amount,
                category: item?.category,
            }
        ),
    );
    return chartData;
};
