import axios from 'axios';
import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.scss'

// -- Controlled component - React form -- //
export default class SignupForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      first_name: '',
      last_name: '',
      username: '',
      email: '',
      age: '',
      weight_kg: '',
      height_cm: '',
      password: '',
      password_confirmation: '',
    };
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleInputChange(event) {
    this.setState({
        [event.target.name]: event.target.value,
    })
  }

    handleSubmit = (event) => {
      event.preventDefault();

      axios
      .post(
        "/api/users",
        {"user": this.state}
      )
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    };

    render() {
      return (
        <Container fluid className="mb-5">
        <Row> </Row>
        <Row className="mt-2">
          <Col></Col>
          <Col >
          <Form autoComplete="off"  onSubmit={this.handleSubmit} className="registerForm">
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
              value={this.state.first_name}
              onChange={this.handleInputChange}
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
              value={this.state.last_name}
              onChange={this.handleInputChange}
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
              value={this.state.username}
              onChange={this.handleInputChange}
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
              value={this.state.email}
              onChange={this.handleInputChange}
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
              value={this.state.password}
              onChange={this.handleInputChange}
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
              value={this.state.password_confirmation}
              onChange={this.handleInputChange}
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
              value={this.state.age}
              onChange={this.handleInputChange}
              placeholder="Age"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Weight (Kg)</Form.Label>
              <Form.Control 
              type="number"
              name= "weight_kg"
              value={this.state.weight_kg}
              onChange={this.handleInputChange}
              placeholder="Weight in KG"
              />
            </Form.Group>

            <Form.Group className="mb-2">
              <Form.Label>Height (Cm)</Form.Label>
              <Form.Control 
              type="number"
              name= "height_cm"
              value={this.state.height_cm}
              onChange={this.handleInputChange}
              placeholder="Height in CM"
              />
            </Form.Group>

            <Button className="mt-2" variant="info" type="submit">
              Submit
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
