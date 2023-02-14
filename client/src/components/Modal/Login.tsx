import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import styled from "styled-components";
interface ModalProps {
  text: string;
  variant: string;
}

const ErrorMessage = styled.p`
  color: red;
`;

const Login = ({ text, variant }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const handleClick = async () => {
    let response;
    const { data: loginData } = await axios.post(
      `http://localhost:5000/api/sessions`,
      {
        email,
        password,
      }
    );
    response = loginData;
    if (response.errors.length) {
      return setErrorMsg(response.errors[0].msg);
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
              onChange={(e) => setEmail(e.target.value as string)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value as string)}
            />
          </InputGroup>
        </Modal.Body>
        <Modal.Footer>
          {errorMsg && <ErrorMessage>{errorMsg}</ErrorMessage>}
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

export default Login;
