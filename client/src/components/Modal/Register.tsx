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

const Register = ({ text, variant }: ModalProps) => {
  const [show, setShow] = useState(false);
  const [registerError, setRegisterError] = useState(null);

  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<CreateUserInput>({
    resolver: zodResolver(createUserSchema),
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  async function onSubmit(values: CreateUserInput) {
    try {
      await axios.post(`http://localhost:5000/api/users`, values);
    } catch (e: any) {
      setRegisterError(e.message);
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
          {registerError}
          <Modal.Title>{text}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <InputGroup className="mb-3">
            <InputGroup.Text>Email</InputGroup.Text>
            <FormControl type="email" {...register("email")} />
          </InputGroup>
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <InputGroup className="mb-3">
            <InputGroup.Text>Name</InputGroup.Text>
            <FormControl type="text" {...register("name")} />
          </InputGroup>
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <InputGroup className="mb-3">
            <InputGroup.Text>Password</InputGroup.Text>
            <FormControl type="password" {...register("password")} />
          </InputGroup>
          <ErrorMessage>{errors.password?.message}</ErrorMessage>

          <InputGroup className="mb-3">
            <InputGroup.Text>Confirm</InputGroup.Text>
            <FormControl
              type="password"
              {...register("passwordConfirmation")}
            />
          </InputGroup>
          <ErrorMessage>{errors.passwordConfirmation?.message}</ErrorMessage>
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

export default Register;
