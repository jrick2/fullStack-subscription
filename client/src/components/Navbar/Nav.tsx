import { Navbar, NavItem, NavLink } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../../context";
import styled from "styled-components";
import "./Nav.css";

const LeftNavContainer = styled.div`
  margin-left: auto;
`;

const Nav = () => {
  const [state, setState] = useContext(UserContext);

  const navigate = useNavigate();

  const handleLogout = () => {
    setState({ data: null, loading: false, error: null });
    localStorage.removeItem("accessToken");
    navigate("/");
  };
  return (
    <Navbar className="nav-bar">
      <NavItem>
        <Link to="/" className="nav-link">
          Home
        </Link>
      </NavItem>

      {state.data && (
        <LeftNavContainer>
          <NavItem>
            <NavLink onClick={handleLogout}>Logout</NavLink>
          </NavItem>
        </LeftNavContainer>
      )}
    </Navbar>
  );
};

export default Nav;
