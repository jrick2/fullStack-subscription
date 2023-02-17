import { Navbar, NavItem } from "react-bootstrap";
import { Link } from "react-router-dom";
import styled from "styled-components";

const Home = styled.h1`
  font-size: 1.5rem;
  color: blue;
`;
const Nav = () => {
  return (
    <Navbar>
      <NavItem>
        <Link to="/" className="nav-link">
          <Home>Home</Home>
        </Link>
      </NavItem>
      {localStorage.getItem("token") && (
        <NavItem>
          <Link to="/" className="nav-link">
            <Home>Logout</Home>
          </Link>
        </NavItem>
      )}
    </Navbar>
  );
};

export default Nav;
