import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { FaChevronCircleRight, FaChevronCircleUp } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../context/UserContext';
import SubmitButton from './SubmitButton';
import UserBio from './UserBio';

function SignupForm() {
  const {
    loginModalShow,
    setLoginModalShow,
    user,
    setUser,
    createNewUser,
    loggedIn,
    setError,
    setConfirmSave,
  } = useUserContext();

  const [changePassword, setChangePassword] = useState();

  const navigate = useNavigate();

  function clickHandler() {
    setLoginModalShow({ show: true, type: 'login' });
  }

  function userFormHandler(e, field) {
    setError({ show: false });
    setConfirmSave(false);
    const newField = {};
    newField[field] = e.target.value;
    setUser({ ...user, ...newField });
  }

  async function userSubmitHandler(e) {
    e.preventDefault();
    const signup = await createNewUser(user);
    if (loggedIn || signup === true) {
      navigate('/');
      setLoginModalShow({ show: false });
    } else {
      await setError({ show: true, message: signup });
    }
  }

  useEffect(() => {
    if (user) return;
    if (loggedIn && loginModalShow.show) {
      setLoginModalShow({ show: false, type: 'login' });
      navigate('/');
    }
  }, [loggedIn]);

  return (
    <Form
      className="login"
      onSubmit={(e) => {
        userSubmitHandler(e);
      }}
      onFocus={() => setError({ show: false })}
    >
      <Form.Group className="form-group split">
        <div>
          <Form.Label className="profile-label">First name</Form.Label>
          <Form.Control
            className="profile-input"
            type="text"
            required
            placeholder="First name"
            value={user?.firstName}
            onChange={(e) => userFormHandler(e, 'firstName')}
          />
        </div>
        <div>
          <Form.Label className="profile-label">Last name</Form.Label>
          <Form.Control
            className="profile-input"
            type="text"
            required
            placeholder="Last name"
            value={user?.lastName}
            onChange={(e) => userFormHandler(e, 'lastName')}
          />
        </div>
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="profile-label">Email address</Form.Label>
        <Form.Control
          className="profile-input"
          type="email"
          required
          placeholder="Email Address"
          value={user?.email}
          onChange={(e) => userFormHandler(e, 'email')}
        />
      </Form.Group>
      <Form.Group className="form-group">
        <Form.Label className="profile-label">Phone number</Form.Label>
        <Form.Control
          className="profile-input"
          type="tel"
          required
          placeholder="Phone number"
          value={user?.phoneNumber}
          onChange={(e) => userFormHandler(e, 'phoneNumber')}
        />
      </Form.Group>
      {loginModalShow.show || <UserBio />}
      {loginModalShow.show || (
        <Form.Label className="profile-label">
          Change password{' '}
          <FaChevronCircleUp
            className={changePassword ? 'arrow-click active' : 'arrow-click'}
            onClick={() => {
              setChangePassword(!changePassword);
              setUser({ ...user, newPassword: '', oldPassword: '' });
            }}
          />
        </Form.Label>
      )}
      {changePassword && (
        <Form.Group className="form-group mt-3">
          <Form.Label className="profile-label">Current password</Form.Label>
          <Form.Control
            className="profile-input"
            type="password"
            required
            placeholder="Enter current password"
            onChange={(e) => userFormHandler(e, 'oldPassword')}
          />
        </Form.Group>
      )}
      {(changePassword || loginModalShow.show) && (
        <Form.Group className="form-group split">
          <div>
            <Form.Label className="profile-label">
              {loginModalShow.show ? 'Password' : 'New password'}
            </Form.Label>
            <Form.Control
              className="profile-input"
              type="password"
              label="Create password"
              required
              placeholder="Enter password"
              onChange={
                loginModalShow.show
                  ? (e) => userFormHandler(e, 'password')
                  : (e) => userFormHandler(e, 'newPassword')
              }
            />
          </div>
          <div>
            <Form.Label className="profile-label">
              {loginModalShow.show
                ? 'Confirm password'
                : 'Confirm new password'}
            </Form.Label>
            <Form.Control
              className="profile-input"
              type="password"
              label="Create password"
              required
              placeholder="Confirm password"
              // value={user?.passwordConfirm}
              onChange={(e) => userFormHandler(e, 'passwordConfirm')}
            />
          </div>
        </Form.Group>
      )}
      {loginModalShow.show && !loggedIn && (
        <div className="login-footer">
          <SubmitButton
            type={loginModalShow.show ? loginModalShow.type : 'update'}
          />
          Already have an account?{' '}
          <a href="#" onClick={clickHandler}>
            Log in
          </a>
        </div>
      )}
    </Form>
  );
}

export default SignupForm;
