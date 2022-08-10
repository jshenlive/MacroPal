import React from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

//-- Nav Bar -- //
export default function Fitpalnavbar(props) {
console.log('props', props);
  const logout = () => {
    axios.post('/logout')
    .then(()=>
    {
      window.location = "/"
    })
    .catch(error => console.log('api errors:', error))
  }
  
  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark" sticky="top" >
      <Container>
        <Navbar.Brand href="#home">FitPal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#features">Home</Nav.Link>
            <Nav.Link href="#pricing">Admin</Nav.Link>
            <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="/Workout">
                Add Exercise
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Add Food</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="#action/3.4">
                Summary
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
          <Nav>

            {!props.state.isLoggedIn && 
            <>
            <Nav.Link eventKey={2} href="http://localhost:3000/signup">
              Sign up
            </Nav.Link>
            <Nav.Link eventKey={2} href="http://localhost:3000/login">
              Login
            </Nav.Link>
            </>
            }

            {props.state.isLoggedIn && <Nav.Link 
            eventKey={2}
            onClick={logout}
             >
            Log out
            </Nav.Link>}

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
