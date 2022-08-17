import axios from 'axios'
import Loading from './Loading';
import React, { Component } from 'react';
import { Navigate } from "react-router-dom";
import {Link} from 'react-router-dom'
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import '../App.scss'

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      redirect: false,
      username: '',
      password: '',
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
    const {username, password} = this.state
    let user = {
      username: username,
      password: password
    }
    
    axios.post('/login', {user}, {withCredentials: true})
    .then(response => {

      if (response.status === 200) {
        this.props.loginStatus()
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
  
  handleErrors = () => {
    return (
      <div>
        <ul>
        {this.state.errors.map(error => {
        return <li key={error}>{error}</li>
          })}
        </ul>
      </div>
    )
  };

  render() {

    console.log('state', this.state);

    if (this.state.redirect) {
      return <Navigate to="/profile" />
    }
    const {username,password} = this.state;

    return (
    <Container fluid>
      <Row className="mt-5">
      <Loading/>
      </Row>
      <Row> </Row>
      <Row className="mt-5 mb-5">
        <Col></Col>
        <Col >
        <Form
          className="mb-2 form-login input-section" 
          onSubmit={this.handleSubmit}
        >
          <div className="login-text">
            PLease log in to continue...
          </div>
            <Form.Group >
            <Form.Label>Username</Form.Label>
            <Form.Control 
              type="text" 
              name= "username"
              placeholder="Username"
              value={username}
              onChange={this.handleChange}
            />
            </Form.Group>

            <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
            name="password"
            type="password"
            placeholder="Password" 
            value={password}
            onChange={this.handleChange}
            />
            </Form.Group>
            <Button className="font-bold mt-2" variant="info" type="submit">
               Login
            </Button>
              <div>
              or <Link to='/Signup'><span className="font-bold mt-2">sign up</span></Link>
              </div>
           </Form>
           </Col>
           <Col></Col>
         </Row>
         <Row> </Row>
       </Container>
     );
   }
}