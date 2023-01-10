import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";

interface ModalProps {
  text: string;
  variant: string;
}
const ModalComponent = ({ text, variant }: ModalProps) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  return (
    <>
      <Button
        style={{ margin: "7px", paddingRight: "1.5rem", paddingLeft: "1.5rem" }}
        size="lg"
        onClick={handleShow}
        variant={variant}
      >
        {text}
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type="email" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type="password" />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary">Submit</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
