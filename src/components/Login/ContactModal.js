import { Button, Modal } from 'react-bootstrap';

function ContactModal(props) {
  const { name } = props.query;

  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header closeButton></Modal.Header>
      <Modal.Body>
        <h2>Message sent!</h2>
        <p>
          Thank you for reaching out, {name}. We have received your message and
          will respond promptly. In the meantime, feel free to check out our
          wide selection of adorable pets.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props?.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}

export default ContactModal;
