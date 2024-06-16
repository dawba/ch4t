import { ChangeEvent, useContext } from 'react';
import { UserContext, useUserContext } from '../providers/UserProvider.tsx';
import ImageUploader from '../customs/ImageUploader.tsx';
import useEditAccount from '../../hooks/useEditAccount.ts';
import FormNotification from '../customs/FormNotification.tsx';
import { ID } from '../../types/types.ts';

const SettingsView = () => {
  const { userId, username, email, profilePicture, setProfilePicture } =
    useUserContext();

  const {
    credentials,
    handleUsernameChange,
    handleEmailChange,
    handleConfirmPasswordChange,
    handlePasswordChange,
    handleChangeCredentials,
    errors,
    success,
  } = useEditAccount(userId as ID, email, username);

  const handleLogOut = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="w-full flex flex-col p-7 h-full">
      <ImageUploader image={profilePicture} setImage={setProfilePicture} />

      <p className="mt-8 ml-2 text-left text-sm">Username</p>
      <input
        type="text"
        className="mt-1 w-full"
        value={credentials.username}
        onChange={handleUsernameChange}
      />
      <p className="mt-6 ml-2 text-left text-sm">Email</p>
      <input
        type="text"
        className="mt-1 w-full"
        value={credentials.email}
        onChange={handleEmailChange}
      />

      <p className="mt-6 ml-2 text-left text-sm">Password</p>
      <input
        type="password"
        className="mt-1 w-full"
        value={credentials.password}
        onChange={handlePasswordChange}
      />
      <p className="mt-6 ml-2 text-left text-sm">Repeat password</p>
      <input
        type="password"
        className="mt-1 w-full"
        value={credentials.confirmPassword}
        onChange={handleConfirmPasswordChange}
      />

      <FormNotification errors={errors} success={success} />

      <div className="flex-grow"></div>

      <button
        className="mt-6 w-full bg-primary text-white py-2 rounded-md border border-primary-yellow"
        onClick={handleChangeCredentials}
      >
        Save changes
      </button>

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
