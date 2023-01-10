import { Navbar, NavItem, NavLink } from "react-bootstrap";
import styled from "styled-components";

const Home = styled.h1`
  font-size: 1.5rem;
`;
const Nav = () => {
  return (
    <Navbar>
      <NavItem>
        <NavLink>
          <Home>Home</Home>
        </NavLink>
      </NavItem>
    </Navbar>
  );
};

export default Nav;
