import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import '../App.scss'

// -- Controlled component - React form -- //
export default class Signup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      password: '',
      password_confirmation: '',
      age: '',
      weight_kg: '',
      height_cm: '',
      errors: ''
    };
  }

handleChange = (event) => {
    const {name, value} = event.target
    this.setState({
      [name]: value
    })
  };

  handleSubmit = (event) => {
    event.preventDefault()
    const {username, email, password, password_confirmation, first_name, last_name, age, weight_kg, height_cm } = this.state
    let user = {
      username: username,
      email: email,
      password: password,
      password_confirmation: password_confirmation,
      first_name: first_name,
      last_name: last_name,
      age: age,
      weight_kg: weight_kg,
      height_cm: height_cm,
    }

axios.post('/api/users', {user}, {withCredentials: true})
    .then(response => {

      if (response.status == 200) {
        this.props.handleLogin(response.data)
        this.setState({
          redirect: true
        })
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };

  // redirect = () => {

  // };

handleErrors = () => {
    return (
      <div>
        <ul>{this.state.errors.map((error) => {
          return <li key={error}>{error}</li>
        })}
        </ul> 
      </div>
    )
  };

    render() {
      if (this.state.redirect) {
        return <Navigate to="/" />
      }
      const {username, email, password, password_confirmation, first_name, last_name, age, weight_kg, height_cm } = this.state

      return (
        <Container fluid className="mb-5">
        <Row> </Row>
        <Row className="mt-2">
          <Col></Col>
          <Col >
          <Form 
          autoComplete="off"  
          onSubmit={this.handleSubmit}
          className="singup-form"
          >
            <div className="loginText">
              Sign up today!
            </div>
            <Row> 
              <Col>
              <Form.Group className="mb-2">
              <Form.Label>First Name</Form.Label>
              <Form.Control 
              type="text"
              name= "first_name"
              value={first_name}
              onChange={this.handleChange}
              placeholder="First Name"
              />
            </Form.Group>
              </Col>

              <Col>
              <Form.Group className="mb-2">
              <Form.Label>Last Name</Form.Label>
              <Form.Control 
              type="text"
              name= "last_name"
              value={last_name}
              onChange={this.handleChange}
              placeholder="Last Name"
              />
            </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
              <Form.Group className="mb-2">
              <Form.Label>User Name</Form.Label>
              <Form.Control 
              type="text"
              name= "username"
              value={username}
              onChange={this.handleChange}
              placeholder="User Name"
              />
            </Form.Group>
              </Col>

              <Col>
              <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control 
              type="email"
              name= "email"
              value={email}
              onChange={this.handleChange}
              placeholder="Email Address"
              />
            </Form.Group>
              </Col>

            </Row>

            <Row>
              <Col>
              <Form.Group className="mb-2">
              <Form.Label>Password</Form.Label>
              <Form.Control 
              type="password"
              name= "password"
              value={password}
              onChange={this.handleChange}
              placeholder="Password"
              />
            </Form.Group>
              </Col>

              <Col>
              <Form.Group className="mb-2">
              <Form.Label>Password Confirmation</Form.Label>
              <Form.Control 
              type="password"
              name= "password_confirmation"
              value={password_confirmation}
              onChange={this.handleChange}
              placeholder="Password Confirmation"
              />
            </Form.Group>
              </Col>
            </Row>

            <Form.Group className="mb-2">
              <Form.Label>Age</Form.Label>
              <Form.Control 
              type="number"
              name= "age"
              value={age}
              onChange={this.handleChange}
              placeholder="Age"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Weight (Kg)</Form.Label>
              <Form.Control 
              type="number"
              name= "weight_kg"
              value={weight_kg}
              onChange={this.handleChange}
              placeholder="Weight in KG"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Height (Cm)</Form.Label>
              <Form.Control 
              type="number"
              name= "height_cm"
              value={height_cm}
              onChange={this.handleChange}
              placeholder="Height in CM"
              />
            </Form.Group>

            <Button 
            className="mt-2" 
            variant="info" 
            type="submit">
              Sign Up
            </Button>
          </Form>
          </Col>
          <Col></Col>
        </Row>
        <Row> </Row>
      </Container>
      );
    }
}
