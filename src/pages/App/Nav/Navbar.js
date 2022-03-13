import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Container, Nav } from "react-bootstrap";

const NavbarPage = () => {
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand>
          <Link to="home" className="navPage">
            Home
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Item>
              <Link className="navPage" to="post">
                Post
              </Link>
            </Nav.Item>
            <Nav.Item>
              <Link className="navPage" to="profile">
                Profile
              </Link>
            </Nav.Item>
            <Nav.Item>
              {!localStorage.getItem("token") && (
                <Link className="navPage" to="login">
                  Login
                </Link>
              )}
            </Nav.Item>
            <Nav.Item>
              {localStorage.getItem("token") && (
                <Link onClick={handleLogout} className="navPage" to="home">
                  Logout
                </Link>
              )}
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarPage;