import axios from 'axios';
import React from 'react';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import '../App.scss'
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

            <NavDropdown title="Meals" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/meals">Add</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/meal-list">Manage</NavDropdown.Item>
            </NavDropdown>

            <NavDropdown title="Workouts" id="collasible-nav-dropdown">
              <NavDropdown.Item href="/addworkout">Manage</NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/workoutList">Summary</NavDropdown.Item>
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
            <a className="navbar-brand">{props.state.user.first_name}, You're a <span className='couch-potato'>Couch</span> <span className='fit-potato'>Fit!</span> Pot ATO! 🥔</a>
            <Nav.Link href="/profile">Profile</Nav.Link>
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
