import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {},
      message: 'Click the button to load data!',
    }
  }
  
  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {
    this.setState({
      isLoggedIn: true,
      user: data.user
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
        </Routes>
      </BrowserRouter>
      <Footer />
      </>
    );
  }

}

export default App;