
import React, { Component } from 'react';
import axios from 'axios'
import {Link} from 'react-router-dom'
class Login extends Component {
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
      <div>
        <h1>Log In</h1>        
          <form onSubmit={this.handleSubmit}>
              <input
            placeholder="username"
            type="text"
            name="username"
            value={username}
            onChange={this.handleChange}
              />
          <input
            placeholder="email"
            type="text"
            name="email"
            value={email}
            onChange={this.handleChange}
          />
          <input
            placeholder="password"
            type="password"
            name="password"
            value={password}
            onChange={this.handleChange}
          />         
<button placeholder="submit" type="submit">
            Log In
          </button>          
          <div>
            or <Link to='/signup'>sign up</Link>
          </div>
          
         </form>
      </div>
    );
  }
}
export default Login;




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