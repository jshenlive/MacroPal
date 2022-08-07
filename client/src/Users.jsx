import React from "react";
import axios from 'axios';
// import Form from "react-bootstrap/Form";
// import Button from "react-bootstrap/Button";

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
      alert(`Current state is
      ${JSON.stringify(this.state)}`)
    };

    render() {
      return (
        <section>
          <form autoComplete='off'  onSubmit={this.handleSubmit} className='registeration'>
            <lable>First Name</lable>
            <input 
              type='text'
              name= 'first_name'
              value={this.state.first_name}
              onChange={this.handleInputChange}
              placeholder='First Name'
            />
            <lable>Last Name</lable>
            <input 
              type='text'
              name= 'last_name'
              value={this.state.last_name}
              onChange={this.handleInputChange}
              placeholder='Last Name'
            />
            <lable>User Name</lable>
            <input 
              type='text'
              name= 'username'
              value={this.state.username}
              onChange={this.handleInputChange}
              placeholder='User Name'
            />
            <lable>Email</lable>
            <input 
              type='email'
              name= 'email'
              value={this.state.email}
              onChange={this.handleInputChange}
              placeholder='Email Address'
            />
            <lable>Password</lable>
            <input 
              type='password'
              name= 'password'
              value={this.state.password}
              onChange={this.handleInputChange}
              placeholder='Password'
            />
            <lable>Password Confirmation</lable>
            <input 
              type='password'
              name= 'password_confirmation'
              value={this.state.password_confirmation}
              onChange={this.handleInputChange}
              placeholder='Password Confirmation'
            />
            <lable>Age</lable>
            <input 
              type='number'
              name= 'age'
              value={this.state.age}
              onChange={this.handleInputChange}
              placeholder='Age'
            />
            <lable>Weight (Kg)</lable>
            <input 
              type='number'
              name= 'weight_kg'
              value={this.state.weight_kg}
              onChange={this.handleInputChange}
              placeholder='Weight in KG'
            />
            <lable>Height (Cm)</lable>
            <input 
              type='number'
              name= 'height_cm'
              value={this.state.height_cm}
              onChange={this.handleInputChange}
              placeholder='Height in CM'
            />
            <button type="submit" >Register</button>
          </form>
        </section>
      );
    }
}
