import { Container } from "react-bootstrap";
import styled from "styled-components";
import Login from "../Modal/Login";
import Register from "../Modal/Register";

const HeroComponent = styled.header`
  height: 60vh;
  background-image: url(https://images.unsplash.com/photo-1508020963102-c6c723be5764?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80);
  padding: 5rem 0;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const HeaderContainer = styled.div`
  background-color: rgb(5, 148, 112);
  padding: 3rem;
  color: white;
  width: 32.5rem;
`;

const Heading = styled.h1`
  font-size: 2.5rem;
`;

const SubHeading = styled.h4`
  margin: 1rem 0;
  font-size: 1.4.4rem;
`;

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Buy Our Course</Heading>
          <SubHeading>
            Your life is shit anyway, why waste your time there if you could
            waste your time here and make us money.
          </SubHeading>
          <Register text="Signup" variant="primary" />
          <Login text="Login" variant="danger" />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};

export default Hero;
