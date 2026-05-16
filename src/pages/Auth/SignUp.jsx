import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/Helper";
import { useState, useContext } from "react";
import ProfilePhotoSelector from "../../components/inputs/ProfilePhotoSelector";
import { API_PATHS } from "../../utils/apiPaths";
import axiosInstance from "../../utils/axiosinstance";
import { UserContext } from "../../context/UserContextCreation";
import uploadImage from "../../utils/uploadImage";
function SignUp() {
    const [ProfilePic, setProfilePic] = useState(null);
    const [FullName, setFullName] = useState("");
    const [Email, setEmail] = useState("");
    const [Password, setPassword] = useState("");
    const [Error, setError] = useState(null);
    const { setUser } = useContext(UserContext);

    const navigate = useNavigate();
    /**
     * @param {SubmitEvent} e
     */
    const handleSignUp = async (e) => {
        let profileImageUrl = "";
        e.preventDefault();
        if (!ProfilePic) {
            setError("Please upload a profile picture");
            return;
        }
        if (!FullName) {
            setError("Please enter your full name");
            return;
        }
        if (!validateEmail(Email)) {
            setError("Please enter a valid email address");
            return;
        }
        if (!Password || Password.length < 8) {
            setError("Password must be at least 8 characters long");
            return;
        }
        setError("");
        try {
            if (ProfilePic) {
                const imageUploadRes = await uploadImage(ProfilePic);
                profileImageUrl = imageUploadRes.imageUrl || "";
            }
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
            } else setError("Something went wrong. Please try again.");
        }
    };

    return (
        <AuthLayout>
            <div className="lg:W-[100%] h-auto mt:mt-0 md:h-full flex flex-col justify-center">
                <h3 className="text-xl font-semibold text-black">
                    Create an Account
                </h3>
                <p className="text-xs text-slate-700 mt-1.25 mb-6 ">
                    Join our community today!
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
                            label="Full Name"
                            placeholder="John Doe"
                            type="text"
                        />
                        <Input
                            value={Email}
                            onChange={({ target }) => setEmail(target.value)}
                            label="Email Address"
                            placeholder="john.doe@example.com"
                            type="email"
                        />
                        <div className="md:col-span-2">
                            <Input
                                value={Password}
                                onChange={({ target }) =>
                                    setPassword(target.value)
                                }
                                label="Password"
                                placeholder="Min 8 Characters"
                                type="password"
                            />
                        </div>
                    </div>
                    {Error && (
                        <p className="text-red-500 text-xs pb-2.5">{Error}</p>
                    )}

                    <button type="submit" className="btn-primary">
                        SIGN UP
                    </button>
                    <p className="text-[13px] text-slate-800 mt-3 ">
                        Already have an account?{" "}
                        <Link
                            className="cursor-pointer font-medium text-primary underline"
                            to="/login"
                        >
                            Login
                        </Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    );
}

export default SignUp;
