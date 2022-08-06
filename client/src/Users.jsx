import React from "react";
import axios from 'axios';

export default function Users () {

  const submitHandler = function (event) {
    event.preventDefault();
    axios.post('/api/users', {"user":{
      first_name: 'Jack',
      last_name: 'Howard',
      username: 'Jacky',
      email: 'Jacky@gmail.com',
      age: 25,
      weight_kg: 56,
      height_cm: 190,
      password: '12345',
      password_confirmation: '12345',
    }})
    .then(() => console.log('Variables sent'))
    .catch(() => console.log('Nashod'))
  };

  return (
    <section>
      <form autoComplete="off"  onSubmit={submitHandler} className="registeration">
        <lable>First Name</lable>
        <input type="text" placeholder="First Name"/>
        <lable>Last Name</lable>
        <input type="text" placeholder="Last Name"/>
        <lable>User Name</lable>
        <input type="text" placeholder="User Name"/>
        <lable>Email</lable>
        <input type="email" placeholder="Email Address"/>
        <lable>Password</lable>
        <input type="password" placeholder="Password"/>
        <lable>Password Confirmation</lable>
        <input type="password" placeholder="Password Confirmation"/>
        <lable>Age</lable>
        <input type="number" placeholder="Age"/>
        <lable>Weight (Kg)</lable>
        <input type="number" placeholder="Weight"/>
        <lable>Height (Cm)</lable>
        <input type="number" placeholder="Height"/>
        <button type="submit" >Register</button>
      </form>
    </section>
  );
}