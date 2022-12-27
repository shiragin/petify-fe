import React, { useEffect, useState, useRef } from 'react';
import { Form, Button, Overlay, Tooltip } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useUserContext } from '../../libs/UserContext';
import SubmitButton from './SubmitButton';

function SignupForm() {
  const {
    loginModalShow,
    setLoginModalShow,
    user,
    setUser,
    createNewUser,
    loggedIn,
    error,
    setError,
  } = useUserContext();

  const navigate = useNavigate();

  function clickHandler() {
    setLoginModalShow({ show: true, type: 'login' });
  }

  function userFormHandler(e, field) {
    setError({ show: false });
    const newField = {};
    newField[field] = e.target.value;
    setUser({ ...user, ...newField });
  }

  async function userSubmitHandler(e) {
    e.preventDefault();
    const signup = await createNewUser(user);
    if (signup || loggedIn) {
      navigate('/');
    } else {
      await setError({ show: true, message: `Error! Couldn't sign up` });
    }
  }

  useEffect(() => {
    if (loggedIn) {
      setLoginModalShow({ show: false, type: 'login' });
      navigate('/');
    }
  }, [loggedIn]);

  return (
    <Form
      className="login"
      onSubmit={(e) => userSubmitHandler(e)}
      onFocus={() => setError({ show: false })}
    >
      <Form.Group className="split">
        <div>
          <Form.Label className="login-firstname-label">First name</Form.Label>
          <Form.Control
            className="login-firstname-input"
            type="text"
            required
            placeholder="First name"
            value={user?.firstName}
            onChange={(e) => userFormHandler(e, 'firstName')}
          />
        </div>
        <div>
          <Form.Label className="login-lastname-label">Last name</Form.Label>
          <Form.Control
            className="login-lastname-input"
            type="text"
            required
            placeholder="Last name"
            value={user?.lastName}
            onChange={(e) => userFormHandler(e, 'lastName')}
          />
        </div>
      </Form.Group>
      <Form.Group>
        <Form.Label className="login-email-label">Email Address</Form.Label>
        <Form.Control
          className="login-email-input"
          type="email"
          required
          placeholder="Email Address"
          value={user?.email}
          onChange={(e) => userFormHandler(e, 'email')}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label className="login-phone-label">Phone number</Form.Label>
        <Form.Control
          className="login-phone-input"
          type="tel"
          required
          placeholder="Phone number"
          value={user?.phoneNumber}
          onChange={(e) => userFormHandler(e, 'phoneNumber')}
        />
      </Form.Group>
      <Form.Group className="split">
        <div>
          <Form.Label className="login-password-label">Password</Form.Label>
          <Form.Control
            className="login-password-input"
            type="password"
            label="Create password"
            required
            placeholder="Password"
            value={user?.password}
            onChange={(e) => userFormHandler(e, 'password')}
          />
        </div>
        <div>
          <Form.Label className="login-confirm-label">
            Confirm password
          </Form.Label>
          <Form.Control
            className="login-confirm-input"
            type="password"
            label="Create password"
            required
            placeholder="Password"
            value={user?.passwordConfirm}
            onChange={(e) => userFormHandler(e, 'passwordConfirm')}
          />
        </div>
      </Form.Group>
      {/* <Button
        ref={target}
        className="login-submit-button btn-skew-left"
        type="submit"
        value="Submit"
      >
        <span>Sign up</span>
      </Button>
      <Overlay target={target.current} show={error.show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {error.message}
          </Tooltip>
        )}
      </Overlay> */}
      <SubmitButton type={loginModalShow.type} />
      <div className="login-footer">
        Already have an account?{' '}
        <a href="#" onClick={clickHandler}>
          Log in
        </a>
      </div>
    </Form>
  );
}

export default SignupForm;
