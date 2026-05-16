import { useRef, useState } from "react";
import { LuTrash, LuUpload, LuUser } from "react-icons/lu";

function ProfilePhotoSelector({ image, setImage }) {
    const inputRef = useRef(null);
    const [PreviewUrl, setPreviewUrl] = useState(null);

    function handleImageChange(e) {
        const file = e.target.files[0];
        if (file) {
            setImage(file);
            setPreviewUrl(URL.createObjectURL(file));
        }
    }
    const handleRemoveImage = () => {
        setImage(null);
        setPreviewUrl(null);
        inputRef.current.value = null;
    };
    const onChooseFile = () => {
        inputRef.current.click();
    };

    return (
        <div className="flex justify-center mb-6">
            <input
                type="file"
                accept="image/*"
                ref={inputRef}
                onChange={handleImageChange}
                className="hidden"
            />

            <div className="relative w-20 h-20">
                {image ? (
                    // SHOW PREVIEW when image exists
                    <div>
                        <img
                            src={PreviewUrl}
                            alt="profile"
                            className="w-20 h-20 rounded-full object-cover "
                        />
                        <button
                            type="button"
                            onClick={handleRemoveImage}
                            className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded-full absolute -bottom-1 -right-1 border"
                        >
                            <LuTrash size={16} />
                        </button>
                    </div>
                ) : (
                    <div className="w-20 h-20 flex items-center justify-center bg-purple-100 rounded-full">
                        <LuUser className="text-4xl text-purple-600" />
                        <button
                            type="button"
                            onClick={onChooseFile}
                            className="w-8 h-8 flex items-center justify-center border bg-blue-600 text-white rounded-full absolute -bottom-1 -right-1"
                        >
                            <LuUpload size={16} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}

export default ProfilePhotoSelector;
