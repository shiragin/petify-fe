import { Button, Modal } from 'react-bootstrap';

function PetModal(props) {
  const { pet, status } = props;
  console.log(pet, status);
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton>
        {/* <Modal.Title id="contained-modal-title-vcenter">
          Congratulations!
        </Modal.Title> */}
      </Modal.Header>
      <Modal.Body>
        <h2>
          {status === 'Adopted' || status === 'Fostered'
            ? `Congratulations!`
            : `Shame on you`}
        </h2>
        <p>
          {status === 'Adopted' || status === 'Fostered'
            ? `You ${status.toLowerCase()} ${pet}!`
            : `You abandoned ${pet}, you evil person of evilness!`}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default PetModal;
