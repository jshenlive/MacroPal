import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Header';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Workout from './components/Workout';
import Workoutlist from './components/Workoutlist';
import Meals from './components/Meals';
import Foodlist from './components/Foodlist';
import Profile from './components/Profile';
import Summary from './components/Summary';
import Controlpanel from './components/Controlpanel';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {},
    }
  }
  
  componentDidMount() {
    this.loginStatus()
  }

  handleLogin = (data) => {
    console.log('app-data', data)
    this.setState({
      isLoggedIn: true,
      user: data.user,
    })
  }

  handleLogout = () => {
    this.setState({
    isLoggedIn: false,
    user: {},
    })
  }

  loginStatus = () => {
    axios.get('/logged_in', 
   {withCredentials: true})    
    .then(response => {
      if (response.data.logged_in) {
        this.handleLogin(response.data)
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
         <Route  exact path='/meals' element={<Meals/>}/>
         <Route  exact path='/diet' element={<Foodlist/>}/>
         <Route  exact path='/workoutlist' element={<Workoutlist/>}/>
         <Route  exact path='/admin' element={<Controlpanel />}/>
         <Route  exact path='/summary' element={<Summary />}/>
         <Route  exact path='/profile' element={<Profile state={this.state} />}/>
        </Routes>
      </BrowserRouter>
      <Footer />
      </>
    );
  }
}

export default App;