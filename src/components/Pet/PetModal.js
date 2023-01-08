import { Button, Modal } from 'react-bootstrap';

function PetModal(props) {
  const { pet, status, action, type, name, update } = props;
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        {status && (
          <h2>
            {status === 'Adopted' || status === 'Fostered'
              ? `Congratulations!`
              : `Shame on you!`}
          </h2>
        )}
        {action && <h2>Pet {action.split(' ')[0]}</h2>}
        {status && (
          <p>
            {status === 'Adopted' || status === 'Fostered'
              ? `You ${status.toLowerCase()} ${pet}.\n You're going to be so happy together.`
              : `You abandoned ${pet},\n you evil person. Have you no heart?`}
          </p>
        )}
        {action && (
          <p>
            The {type.toLowerCase()} {name} was successfully {action} Petify
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PetModal;
