import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Header';
import Footer from './components/Footer';
import Loading from './components/Loading';
import Signup from './components/Signup';
import Login from './components/Login';
import AddWorkout from './components/AddWorkout';
import WorkoutList from './components/WorkoutList';
import Meals from './components/Meals';
import MealList from './components/MealList';
import Profile from './components/Profile';
import Summary from './components/Summary';
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
         <Route  exact path='/login' element={<Login loginStatus={this.loginStatus} />}/>
         <Route  exact path='/signup' element={<Signup handleLogin={this.handleLogin} />}/>
         <Route  exact path='/meals' element={<Meals state={this.state}/>}/>
         <Route  exact path='/meal-list' element={<MealList state={this.state}/>}/>
         <Route  exact path='/addworkout' element={<AddWorkout state={this.state}/>}/>
         <Route  exact path='/workoutList' element={<WorkoutList  state={this.state}/>}/>
         <Route  exact path='/summary' element={<Summary />}/>
         <Route  exact path='/profile' element={<Profile state={this.state} />}/>
         <Route  exact path='/loading' element={<Loading/>}/>
        </Routes>
      </BrowserRouter>
      <Footer />
      </>
    );
  }
}

export default App;