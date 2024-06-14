import { ChangeEvent, useContext } from 'react';
import { ReactComponent as GalleryIcon } from '../../assets/gallery_icon.svg';
import placeholderPath from '../../assets/pfp_placeholder.jpg';
import { UserContext } from "../UserProvider.tsx";

const SettingsView = () => {
    const userContext = useContext(UserContext);

    if (!userContext) {
        throw new Error('SettingsView must be used within a UserProvider');
    }

    const { username, email, pfp, setUsername, setEmail, setPfp } = userContext;

    const handleImageUpload = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPfp(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
        setUsername(event.target.value);
    };

    const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    return (
        <div className="w-full flex flex-col p-7">
            <label className="relative flex flex-col items-center self-center group">
                <input
                    type="file"
                    className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                    onChange={handleImageUpload}
                />
                <div className="w-32 h-32 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden mt-6 relative border-2 border-primary-yellow">
                    <img src={pfp !== '' ? pfp : placeholderPath} alt="Profile" className="w-full h-full object-cover" />
                    <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-80 transition-opacity flex items-center justify-center">
                        <GalleryIcon className="w-8 h-8 text-white opacity-0 group-hover:opacity-100" />
                    </div>
                </div>
            </label>
            <p className="mt-8 ml-2 text-left text-sm">Username</p>
            <input
                type="text"
                className="mt-1 w-full"
                value={username}
                onChange={handleUsernameChange}
            />
            <p className="mt-6 ml-2 text-left text-sm">Email</p>
            <input
                type="text"
                className="mt-1 w-full"
                value={email}
                onChange={handleEmailChange}
            />
        </div>
    );
};

export default SettingsView;
