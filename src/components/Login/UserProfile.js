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
  } = useUserContext();

  async function updateUserHandler() {
    if (loggedIn) {
      const update = await updateUser(user._id);
      if (update) {
        setConfirmSave(true);
        setUser({ ...user });
        // setUser({ ...user }, { password: '', passwordConfirm: '' });
      } else {
        await setError({
          show: true,
          message: `Error! Couldn't update profile`,
        });
      }
    }
  }

  useEffect(() => {
    setError({ show: false, message: '' });
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
