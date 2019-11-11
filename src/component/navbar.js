import React from "react";
import { Navbar, Nav, Form, Button } from "react-bootstrap";
import brand from "./svgs/dashboard.svg";
import keyhole from "./svgs/keyhole.svg";
import find from "./svgs/search.svg";

export default ({ classes }) => {
  return (
    <Navbar
      className={classes.navbar}
      collapseOnSelect={true}
      expand="sm"
      variant="dark"
      fixed="top"
    >
      <Navbar.Brand href="#home">
        <img src={`${brand}`} alt="brand" />
        &nbsp;Proptype
      </Navbar.Brand>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto">
          <Nav.Link href="#home">Home</Nav.Link>
          <Nav.Link href="#dashboard">Dashboard</Nav.Link>
        </Nav>
        <Nav.Item>
          <Form inline>
            {/* <FormControl type="text" placeholder="Search" /> */}
            <Button variant="link">
              <img src={find} alt="find" />
            </Button>
            <Button variant="link">
              <img src={keyhole} alt="keyhole" />
            </Button>
          </Form>
        </Nav.Item>
      </Navbar.Collapse>
    </Navbar>
  );
};
