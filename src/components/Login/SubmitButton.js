import React, { useRef } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { useUserContext } from '../../context/UserContext';

function SubmitButton(props) {
  const { error } = useUserContext();
  const target = useRef(null);

  return (
    <div className="submit-button">
      <Button
        ref={target}
        className="login-submit-button btn-skew-left"
        type="submit"
        value="Submit"
        onClick={props.onProfileEdit}
      >
        <span>
          {props.type === 'login'
            ? 'Log In'
            : props.type === 'signup'
            ? 'Sign Up'
            : props.confirm
            ? 'Profile saved'
            : 'Save Profile'}
        </span>
      </Button>
      {/* {props.confirm && 'Profile saved'} */}
      <Overlay target={target.current} show={error?.show} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {error?.message}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

export default SubmitButton;
