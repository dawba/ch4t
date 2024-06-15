import { ChangeEvent, useContext } from 'react';
import { UserContext } from '../providers/UserProvider.tsx';
import ImageUploader from '../customs/ImageUploader.tsx';

const SettingsView = () => {
  const userContext = useContext(UserContext);

  if (!userContext) {
    throw new Error('SettingsView must be used within a UserProvider');
  }

  const {
    username,
    email,
    profilePicture,
    setUsername,
    setEmail,
    setProfilePicture,
  } = userContext;

  const handleUsernameChange = (event: ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  return (
    <div className="w-full flex flex-col p-7">
      <ImageUploader image={profilePicture} setImage={setProfilePicture} />

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
