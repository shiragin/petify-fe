import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useUserContext } from '../../libs/UserContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import '../../scss/LoginModal.scss';

function LoginModal(props) {
  const { loginModalShow } = useUserContext();

  // console.log(loginShow);

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {loginModalShow.type === 'signup'
            ? 'Create an account'
            : 'Log into your account'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loginModalShow.type === 'signup' ? <SignupForm /> : <LoginForm />}
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
