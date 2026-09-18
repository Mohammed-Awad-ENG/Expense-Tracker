import { useTranslation } from "react-i18next";

function CharAvatar({ fullName }) {
    const { t } = useTranslation();
    const words = fullName ? fullName.split(" ") : [t('u')];
    let initials = ""

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }
    initials = initials.toUpperCase();

    return (
        <div className="w-16 h-16 rounded-full mx-auto mb-4 bg-gray-200 flex items-center justify-center">
            <span className="text-lg font-bold">{initials}</span>
        </div>
    );
}

export default CharAvatar;
