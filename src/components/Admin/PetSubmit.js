import React, { useRef } from 'react';
import { Button, Overlay, Tooltip } from 'react-bootstrap';
// import { useUserContext } from '../../context/UserContext';

function PetSubmit(props) {
  // const { error } = useUserContext();
  const target = useRef(null);
  return (
    <div className="submit-button">
      <Button
        ref={target}
        className="login-submit-button btn-skew-left"
        onClick={props.onPetAdd}
      >
        <span>Add This Pet</span>
      </Button>
      {/* {props.confirm && 'Profile saved'} */}
      <Overlay
        target={target.current}
        // show={error.show}
        placement="bottom"
      >
        {(props) => (
          <Tooltip id="overlay-example" {...props}>
            {/* {error.message} */}
          </Tooltip>
        )}
      </Overlay>
    </div>
  );
}

export default PetSubmit;
