import { Modal, Button, InputGroup, FormControl } from "react-bootstrap";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import styled from "styled-components";
import { object, string, TypeOf } from "zod";
interface ModalProps {
  text: string;
  variant: string;
}

const ErrorMessage = styled.p`
  color: red;
`;

const createSessionSchema = object({
  email: string().nonempty({
    message: "Email is required",
  }),
  password: string().nonempty({
    message: "Password is required",
  }),
});

type CreateSessionInput = TypeOf<typeof createSessionSchema>;

const Login = ({ text, variant }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [loginError, setLoginError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateSessionInput>({
    resolver: zodResolver(createSessionSchema),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function onSubmit(values: CreateSessionInput) {
    try {
      await axios.post(`http://localhost:5000/api/users`, values);
    } catch (e: any) {
      setLoginError(e.message);
    }
    console.log({ errors });
  }

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
        {loginError}
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type="email" {...register("email")} />
          </InputGroup>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type="password" {...register("password")} />
          </InputGroup>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit(onSubmit)}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Login;
