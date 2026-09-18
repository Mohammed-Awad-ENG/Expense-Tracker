import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/Helper";
import { useState, useContext } from "react";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { UserContext } from "../../context/UserContextCreation";
import { useTranslation } from "react-i18next";
// import uploadImage from "../../utils/uploadImage";
function SignUp() {
    const [ProfilePic, setProfilePic] = useState(null);
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState(null);
    const { setUser } = useContext(UserContext);
    const { t } = useTranslation();

    const navigate = useNavigate();
    /**
     * @param {SubmitEvent} e
     */
    const handleSignUp = async (e) => {
        let profileImageUrl = "";
        e.preventDefault();
        if (!ProfilePic) {
            setError(t('errorProfilePicture'));
            return;
        }
        if (!FullName) {
            setError(t('errorFullName'));
            return;
        }
        if (!validateEmail(Email)) {
            setError(t('errorValidEmail'));
            return;
        }
        if (!Password || Password.length < 8) {
            setError(t('errorPasswordLength'));
            return;
        }
        setError("");
        try {
            // if (ProfilePic) {
            //     const imageUploadRes = await uploadImage(ProfilePic);
            //     profileImageUrl = imageUploadRes.imageUrl || "";
            // }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName: FullName,
                email: Email,
                password: Password,
                profileImageUrl,
            });
            const { token, user } = response.data;
            if (token) {
                localStorage.setItem("token", token);
                setUser(() => user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else setError(t('errorSomethingWentWrong'));
        }
    };

    return (
        <AuthLayout>
            <div className="lg:W-[100%] h-auto mt:mt-0 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">
                    {t('createAnAccount')}
                </h3>
                <p className="text-xs text-slate-700 mt-1.25 mb-6 ">
                    {t('joinOurCommunityToday')}
                </p>
                <form onSubmit={handleSignUp}>
                    <ProfilePhotoSelector
                        image={ProfilePic}
                        setImage={setProfilePic}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* <Input
                            type="file"
                            label="Profile Picture"
                            onChange={(e) => setProfilePic(e.target.files[0])}
                        /> */}
                        <Input
                            value={FullName}
                            onChange={({ target }) => setFullName(target.value)}
                            label={t('fullName')}
                            placeholder={t('johnDoe')}
                            type="text"
                        />
                        <Input
                            value={Email}
                            onChange={({ target }) => setEmail(target.value)}
                            label={t('emailAddress')}
                            placeholder={t('johnDoeEmail')}
                            type="email"
                        />
                        <div className="md:col-span-2">
                            <Input
                                value={Password}
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                                label={t('password')}
                                placeholder={t('min8Characters')}
                                type="password"
                            />
                        </div>
                    </div>
                    {Error && (
                        <p className="text-red-500 text-xs pb-2.5">{Error}</p>
                    )}

                    <button type="submit" className="btn-primary">
                        {t('signUpButton')}
                    </button>
                    <p className="text-[13px] text-slate-800 mt-3 ">
                        {t('alreadyHaveAnAccount')}{" "}
                        <Link
                            className="cursor-pointer font-medium text-primary underline"
                            to="/login"
                        >
                            {t('login')}
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}

export default SignUp;
