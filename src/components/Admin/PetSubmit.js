import React, { useRef } from 'react';
import { Button, Overlay, Spinner, Tooltip } from 'react-bootstrap';

function PetSubmit(props) {
  const target = useRef(null);

  const { show, message } = props.petError;

  function petClickHandler() {
    if (props.action === 'create') {
      props.onPetAdd();
    } else if (props.action === 'edit') {
      props.onPetEdit();
    } else return;
  }

  return (
    <div className="submit-button">
      <Button
        ref={target}
        className="login-submit-button btn-skew-left"
        onClick={petClickHandler}
      >
        <span>{props.action === 'create' ? `Add` : `Edit`} This Pet</span>
        <span>{props.isLoading && <Spinner className="mx-3" />}</span>
      </Button>
      {/* {props.confirm && 'Profile saved'} */}
      <Overlay target={target.current} show={show} placement="top">
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {message}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

export default PetSubmit;
