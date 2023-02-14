import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
// import { Resolver } from "@hookform/resolvers/zod";
import axios from "axios";
import styled from "styled-components";
import { object, string, TypeOf } from "zod";
import { Resolver } from "dns";
interface ModalProps {
  text: string;
  variant: string;
}

const ErrorMessage = styled.p`
  color: red;
`;

const createUserSchema = object({
  name: string().nonempty({
    message: "Name is required",
  }),
  password: string()
    .min(6, "Password too short - should be 6 chars minimum")
    .nonempty({
      message: "Password is required",
    }),
  passwordConfirmation: string().nonempty({
    message: "passwordConfirmation is required",
  }),
  email: string({
    required_error: "Email is required",
  })
    .email("Not a valid email")
    .nonempty({
      message: "Password is required",
    }),
}).refine((data) => data.password === data.passwordConfirmation, {
  message: "Passwords do not match",
  path: ["passwordConfirmation"],
});

type CreateUserInput = TypeOf<typeof createUserSchema>;

const Login = ({ text, variant }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, verifyPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleClick = async () => {
    let response;

    // const {
    //   register,
    //   formState: { errors },
    //   handleSubmit,
    // } = useForm<CreateUserInput>({
    //   resolver: Resolver(createUserSchema),
    // });
    try {
      const { data: registerData } = await axios.post(
        `http://localhost:5000/api/users`,
        {
          values: createUserSchema,
          // email,
          // name,
          // password,
          // passwordConfirmation,
        }
      );
      response = registerData;
    } catch (e: any) {
      setErrorMsg(e.message);
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
            <InputGroup.Text>Name</InputGroup.Text>
            <FormControl
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value as string)}
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

          <InputGroup className="mb-3">
            <InputGroup.Text>Confirm</InputGroup.Text>
            <FormControl
              type="password"
              value={passwordConfirmation}
              onChange={(e) => verifyPassword(e.target.value as string)}
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
