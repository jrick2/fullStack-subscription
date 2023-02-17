import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

interface ModalProps {
  text: string;
  variant: "primary" | "secondary" | "danger";
}

const ErrorMessage = styled.p`
  color: red;
`;

const Register = ({ text, variant }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, verifyPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const navigate = useNavigate();
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    let response;
    try {
      const { data: registerData } = await axios.post(
        "http://localhost:5000/api/users",
        {
          email,
          name,
          password,
          passwordConfirmation,
        }
      );
      response = registerData;
      navigate("/articles");
      localStorage.setItem("token", response.data.token);
    } catch (e: any) {
      setErrorMsg(e.message);
    }
  };

  return (
    <>
      <Button
        onClick={handleShow}
        variant={variant}
        size="lg"
        style={{ marginRight: "1rem", padding: "0.5rem 3rem" }}
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
          {errorMsg && <ErrorMessage>{"Invalid Email"}</ErrorMessage>}
          <InputGroup className="mb-3">
            <InputGroup.Text>Name</InputGroup.Text>
            <FormControl
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{"Name is required"}</ErrorMessage>}
          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{"Password to short"}</ErrorMessage>}
          <InputGroup className="mb-3">
            <InputGroup.Text>Confirm</InputGroup.Text>
            <FormControl
              type="password"
              value={passwordConfirmation}
              onChange={(e) => verifyPassword(e.target.value)}
            />
          </InputGroup>
          {errorMsg && <ErrorMessage>{"Password do not match"}</ErrorMessage>}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClick}>
            {text}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Register;
