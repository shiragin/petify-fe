import { useEffect, useState } from 'react';
import { usePetsContext } from '../../context/PetsContext';
import { useUserContext } from '../../context/UserContext';
import SignupForm from '../Login/SignupForm';
import SubmitButton from '../Login/SubmitButton';
import ConfirmModal from './ConfirmModal';

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

  const [confirmModalShow, setConfirmModalShow] = useState(false);

  async function updateUserHandler() {
    if (loggedIn) {
      const update = await updateUser(user._id);
      if (update === true) {
        setConfirmSave(true);
        setUser({ ...user });
        setConfirmModalShow(true);
      } else {
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
      <ConfirmModal
        show={confirmModalShow}
        onHide={() => setConfirmModalShow(false)}
      />
    </div>
  );
}

export default UserProfile;
