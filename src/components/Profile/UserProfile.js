import { useState } from 'react';
import { useUserContext } from '../../libs/UserContext';
import SignupForm from '../Login/SignupForm';
import SubmitButton from '../Login/SubmitButton';
import UserBio from './UserBio';

function UserProfile() {
  const {
    loggedIn,
    user,
    updateUser,
    confirmSave,
    setConfirmSave,
    error,
    setError,
  } = useUserContext();

  async function updateUserHandler() {
    if (loggedIn) {
      const update = await updateUser(user._id);
      if (update) {
        setConfirmSave(true);
      } else {
        await setError({
          show: true,
          message: `Error! Couldn't update profile`,
        });
      }
    }
  }

  return (
    <div className="profile-form">
      <SignupForm />
      <UserBio />
      <SubmitButton
        type={'update'}
        confirm={confirmSave}
        onProfileEdit={updateUserHandler}
      />
    </div>
  );
}

export default UserProfile;
