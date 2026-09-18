import { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/Helper";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { UserContext } from "../../context/UserContextCreation";
import { useTranslation } from "react-i18next";

function Login() {
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState(null);
    const [loading, setLoading] = useState(false);
    const { setUser } = useContext(UserContext);
    const navigate = useNavigate();
    const { t } = useTranslation();

    async function handelLogin(e) {
        e.preventDefault();

        if (!validateEmail(Email)) {
            setError(t('errorValidEmailLogin'));
            return;
        }
        if (!Password) {
            setError(t('errorPasswordLogin'));
            return;
        }

        setError("");
        setLoading(true);

        try {
            const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
                email: Email,
                password: Password,
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                setUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError(t('errorSomethingWentWrong'));
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <AuthLayout>
            <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">{t('welcomeBack')}</h3>
                <p className="text-xs text-slate-700 mt-1.25 mb-6">
                    {t('pleaseEnterYourDetailsToLogIn')}
                </p>
                <form onSubmit={handelLogin}>
                    <Input
                        value={Email}
                        onChange={({ target }) => setEmail(target.value)}
                        label={t('emailAddress')}
                        placeholder={t('userEmailExample')}
                        type="text"
                    />
                    <Input
                        value={Password}
                        onChange={({ target }) => setPassword(target.value)}
                        label={t('password')}
                        placeholder={t('min8Characters')}
                        type="password"
                    />
                    {Error && <p className="text-red-500 text-xs pb-2.5">{Error}</p>}
                    <button type="submit" className="btn-primary" disabled={loading}>
                        {loading ? t('loggingIn') : t('loginUpper')}
                    </button>
                    <p className="text-[13px] text-slate-800 mt-3">
                        {t('dontHaveAccount')}{" "}
                        <Link to="/signUp" className="cursor-pointer font-medium text-primary underline">
                            {t('signUpLink')}
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}

export default Login;