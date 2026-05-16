import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

function Input({ value, onChange, label, placeholder, type }) {
    const [ShowPassword, setShowPassword] = useState(false);

    return (
        <div>
            <div className="text-[13px] text-slate-500">{label}</div>
            <div className="input-box">
                <input
                    placeholder={placeholder}
                    value={value}
                    onChange={(e) => onChange(e)}
                    className="w-full bg-transparent outline-none"
                    type={
                        type == "password"
                            ? ShowPassword
                                ? "text"
                                : "password"
                            : type
                    }
                />
                {type == "password" && (
                    <>
                        {ShowPassword ? (
                            <FaRegEye
                                size={22}
                                className="text-primary cursor-pointer"
                                onClick={() =>
                                    setShowPassword(() => !ShowPassword)
                                }
                            />
                        ) : (
                            <FaRegEyeSlash
                                size={22}
                                onClick={() =>
                                    setShowPassword(() => !ShowPassword)
                                }
                                className="text-slate-400 cursor-pointer"
                            />
                        )}
                    </>
                )}
            </div>
        </div>
    );
}

export default Input;
