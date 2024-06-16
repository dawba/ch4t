import { ChangeEvent, useContext, useEffect, useRef } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import ImageUploader from '../customs/ImageUploader.tsx';

const SettingsView = () => {
  const userContext = useContext(UserContext);
  const imageUploaderRef = useRef<{ uploadImage: () => void }>(null);

  const {
    username,
    email,
    profilePicture,
    setUsername,
    setEmail,
    setProfilePicture,
    userId,
  } = userContext;

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  const handleUpload = () => {
    if (imageUploaderRef.current) {
      imageUploaderRef.current.uploadImage();
    }
  };

  useEffect(() => {
    handleUpload();
  }, [profilePicture]);

  return (
    <div className="w-full flex flex-col p-7">
      <ImageUploader
        image={profilePicture}
        setImage={setProfilePicture}
        imageContext={'User'}
        id={userId}
      />

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

      <div className="flex-grow"></div>

      <button
        className="mt-6 w-full bg-primary text-white py-2 rounded-md border border-primary-yellow"
        onClick={handleLogOut}
      >
        Log out
      </button>
    </div>
  );
};

export default SettingsView;
