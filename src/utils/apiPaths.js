export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
export const API_PATHS = {
    AUTH: {
        LOGIN: "/api/auth/login",
        REGISTER: "/api/auth/register",
        GET_USER_INFO: "/api/auth/getUser",
    },
    DASHBOARD: {
        GET_DATA: "/api/dashboard",
    },
    INCOME: {
        ADD_INCOME: "/api/income/add",
        GET_ALL_INCOME: "/api/income/get",
        DOWNLOAD_INCOME: "/api/income/download",
        DELETE_INCOME: (incomeID) => `/api/income/${incomeID}`,
    },
    EXPENSE: {
        ADD_EXPENSE: "/api/expense/add",
        GET_ALL_EXPENSES: "/api/expense/get",
        DOWNLOAD_EXPENSES: "/api/expense/download",
        DELETE_EXPENSE: (expenseID) => `/api/expense/${expenseID}`,
    },
    IMAGE: {
        UPLOAD_IMAGE: "/api/auth/upload-image",
    },
};
