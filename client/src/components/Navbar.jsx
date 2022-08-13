import axios from 'axios';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';

//-- Nav Bar -- //
export default function Fitpalnavbar(props) {
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
        <Navbar.Brand href="/">FitPal</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
          {!props.state.isLoggedIn && 
            <>
            <Nav.Link href="/">Home</Nav.Link>

            </>
          }
          {props.state.isLoggedIn && 
            <>
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/addworkout">Add Workout</Nav.Link>
            <Nav.Link href="/workoutsummary">Workout Summary</Nav.Link>
              <NavDropdown title="Dashboard" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/profile">Profile</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item href="/AddWorkout">
                Add Exercise
              </NavDropdown.Item>
              <NavDropdown.Item href="/workoutlist">Workouts</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item href="/workout">Add Food</NavDropdown.Item>
              <NavDropdown.Item href="/diet">Diet</NavDropdown.Item>
              <NavDropdown.Divider />

              <NavDropdown.Item href="/summary">
                Summary
              </NavDropdown.Item>
            </NavDropdown>
            </>
          }
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

            {props.state.isLoggedIn && 
            <>
            <Nav.Link href="/admin">Admin</Nav.Link>
            <Nav.Link eventKey={2} onClick={logout}>
            Log out
            </Nav.Link>
            </>
            }

          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
