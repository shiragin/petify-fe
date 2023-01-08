import { useEffect } from 'react';
import { useUserContext } from '../../context/UserContext';
import SignupForm from '../Login/SignupForm';
import SubmitButton from '../Login/SubmitButton';

function UserProfile() {
  const {
    loggedIn,
    user,
    setUser,
    updateUser,
    confirmSave,
    setConfirmSave,
    setError,
    setLoginModalShow,
  } = useUserContext();

  async function updateUserHandler() {
    if (loggedIn) {
      const update = await updateUser(user._id);
      if (update === true) {
        setConfirmSave(true);
        setUser({ ...user });
      } else {
        console.log(update);
        await setError({
          show: true,
          message: update.message,
        });
      }
    }
  }

  useEffect(() => {
    setError({ show: false, message: '' });
    setLoginModalShow({ show: false });
  }, []);

  return (
    <div className="profile-form">
      <SignupForm />
      <SubmitButton
        type={'update'}
        confirm={confirmSave}
        onProfileEdit={updateUserHandler}
      />
    </div>
  );
}

export default UserProfile;
