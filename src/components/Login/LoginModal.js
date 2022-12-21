import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useUserContext } from '../../libs/UserContext';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';
import '../../scss/LoginModal.scss';

function LoginModal(props) {
  const { loginShow } = useUserContext();

  console.log(loginShow);

  return (
    <Modal {...props} size="md" centered>
      <Modal.Header closeButton>
        <Modal.Title>
          {loginShow.type === 'signup'
            ? 'Create an account'
            : 'Log into your account'}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {loginShow.type === 'signup' ? <SignupForm /> : <LoginForm />}
      </Modal.Body>
    </Modal>
  );
}

export default LoginModal;
