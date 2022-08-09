import React, { Component } from 'react';
import axios from 'axios'
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.scss'
import {Link} from 'react-router-dom'

export default class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { 
      username: '',
      email: '',
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
    const {username, email, password} = this.state
    let user = {
      username: username,
      email: email,
      password: password
    }
    
    axios.post('http://localhost:3001/login', {user}, {withCredentials: true})
    .then(response => {
      if (response.data.logged_in) {
        this.props.handleLogin(response.data)
        // this.redirect()
      } else {
        this.setState({
          errors: response.data.errors
        })
      }
    })
    .catch(error => console.log('api errors:', error))
  };
  
  redirect = () => {
    this.props.history.push('/')
  }
  
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
    const {username, email, password} = this.state
    return (
    <Container fluid>
      <Row> </Row>
      <Row className="mt-5 mb-5">
        <Col></Col>
        <Col >
        <Form
          className="mb-2" 
          onSubmit={this.handleSubmit}
        >
          <div className="loginText">
            PLease log in to continue...
          </div>
            <Form.Group >
            <Form.Label>Email address</Form.Label>
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
            <Button className="mt-2" variant="info" type="submit">
               Login
             </Button>
              <div>
              or <Link to='/Signup'>sign up</Link>
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



// import React from 'react';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Button from 'react-bootstrap/Button';
// import Form from 'react-bootstrap/Form';
// import './Login.scss'

// export default function BasicExample() {
//   return (
//     <Container fluid>
//       <Row> </Row>
//       <Row className="mt-5 mb-5">
//         <Col></Col>
//         <Col >
//         <Form>
//           <div className="loginText">
//             PLease log in to continue...
//           </div>
//           <Form.Group className="mb-2" controlId="formBasicEmail">
//             <Form.Label>Email address</Form.Label>
//             <Form.Control type="email" placeholder="Enter email" />
//             <Form.Text className="text-muted">
//               We'll never share your email with anyone else.
//             </Form.Text>
//           </Form.Group>

//           <Form.Group className="mb-2" controlId="formBasicPassword">
//             <Form.Label>Password</Form.Label>
//             <Form.Control type="password" placeholder="Password" />
//           </Form.Group>
//           <Button className="mt-2" variant="info" type="submit">
//             Submit
//           </Button>
//         </Form>
//         </Col>
//         <Col></Col>
//       </Row>
//       <Row> </Row>
//     </Container>
//   );
// }