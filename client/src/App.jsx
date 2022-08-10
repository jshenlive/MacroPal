import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Workout from './components/Workout';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user_id: {},
      username: "",
      age: "",
      avatar_url: "",
      city: "",
      country: "",
      province: "",
      email: "",
      first_name: "",
      last_name: "",
      height_cm: "",
      weight_kg: "",
      is_admin: "",
    }
  }
  
  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {

    this.setState({
      isLoggedIn: true,
      user_id: data.data.user.id,
      username: data.data.user.username,
      age: data.data.user.age,
      avatar_url: data.data.user.avatar_url,
      city: data.data.user.city,
      country: data.data.user.country,
      province: data.data.user.province,
      email: data.data.user.email,
      first_name: data.data.user.first_name,
      last_name: data.data.user.last_name,
      height_cm: data.data.user.height_cm,
      weight_kg: data.data.user.weight_kg,
      is_admin: data.data.user.is_admin,
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {}
    })
  }

  loginStatus = () => {
    axios.get('/logged_in', 
   {withCredentials: true})    
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response)
      } else {
        this.handleLogout()
      }
    })
    .catch(error => console.log('api errors:', error))
  };



  render() {

    return (
      <>
      <Navbar state={this.state}/>
      <BrowserRouter>
        <Routes>
         <Route  exact path='/' element={<Main/>}/>
         <Route  exact path='/login' element={<Login handleLogin={this.handleLogin} />}/>
         <Route  exact path='/signup' element={<Signup handleLogin={this.handleLogin} />}/>
         <Route  exact path='/workout' element={<Workout state={this.state}/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
      </>
    );
  }

}

export default App;