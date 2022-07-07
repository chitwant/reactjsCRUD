import React from "react";
import { useSelector } from "react-redux";
import {
  Navbar,
  NavbarBrand,
  DropdownItem,
  NavItem,
  NavLink,
  Nav,
  Collapse,
  DropdownToggle,
  DropdownMenu,
  UncontrolledDropdown,
  NavbarToggler,
} from "reactstrap";
const NavigationBar = ({ logout }) => {
  let user = useSelector((state) => state.auth);
  return (
    <>
      <Navbar color="light" container="lg" expand="md" light>
        <NavbarBrand href="/">CRUD APP</NavbarBrand>
        <NavbarToggler onClick={function noRefCheck() {}} />
        <Collapse navbar>
          <Nav className="ms-auto" navbar>
            {!user.isAuthenticated ? (
              <>
                {" "}
                <NavItem>
                  <NavLink href="/register">Register</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/login">Login</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/fileupload">FileUpload</NavLink>
                </NavItem>
              </>
            ) : (
              <UncontrolledDropdown inNavbar nav>
              <DropdownToggle caret nav>
                {user.username.charAt(0).toUpperCase() + user.username.slice(1)}
              </DropdownToggle>
              <DropdownMenu right>
                <DropdownItem onClick={logout}>Logout</DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
            )}

           
          </Nav>
        </Collapse>
      </Navbar>
    </>
  );
};
export default NavigationBar;
