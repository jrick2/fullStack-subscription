import { Container } from "react-bootstrap";
import styled from "styled-components";
import ModalComponent from "../Modal/Modal";

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
  font-weight: 400;
`;

const Hero = () => {
  return (
    <HeroComponent>
      <Container>
        <HeaderContainer>
          <Heading>Feed Your Mind To The Best</Heading>
          <SubHeading>
            Grow, learn and become more successful by reading some of the top
            article by highly reputable individual
          </SubHeading>
          <ModalComponent text="Signup" variant="primary" />
          <ModalComponent text="Login" variant="danger" />
        </HeaderContainer>
      </Container>
    </HeroComponent>
  );
};

export default Hero;
