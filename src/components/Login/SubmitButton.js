import React, { useRef } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
import { useUserContext } from '../../libs/UserContext';

function SubmitButton({ type }) {
  const { error } = useUserContext();
  const target = useRef(null);

  return (
    <div>
      <Button
        ref={target}
        className="login-submit-button btn-skew-left"
        type="submit"
        value="Submit"
      >
        <span>{type === 'signup' ? 'Sign Up' : 'Log In'}</span>
      </Button>
      <Overlay target={target.current} show={error.show} placement="bottom">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {error.message}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

export default SubmitButton;
