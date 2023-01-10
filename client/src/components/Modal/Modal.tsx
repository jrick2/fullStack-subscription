import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";

interface ModalProps {
  text: string;
  variant: string;
  isSignUp: boolean;
}
const ModalComponent = ({ text, variant, isSignUp }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = async () => {
    let data;
    if (isSignUp) {
      await axios.post("/auth/register", {
        email,
        password,
      });
    }
  };
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
            <FormControl
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalComponent;
