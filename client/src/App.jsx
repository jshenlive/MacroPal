import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Workout from './components/Workout';
import Home from './components/Home';
// import Login from './components/Login';
import axios from 'axios';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoggedIn: false,
      user: {},
      message: 'Click the button to load data!'
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
    axios.get('http://localhost:3001/logged_in', 
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

      <BrowserRouter>
        <Routes>
         <Route  exact path='/' element={<Main/>}/>
         {/* <Route  exact path='/logout'/> */}
         <Route  exact path='/login' element={<Login/>}/>
         <Route  exact path='/signup' element={<Signup/>}/>
        </Routes>
    </BrowserRouter>

    );
  }

  // render() {
  //   return (
  //     <main>
  //       <nav>
  //         <Navbar />
  //       </nav>
  //         <Main />
  //         <Register />
  //         <Workout />
  //         <Login />
  //         <div className="index-footer">
  //         <Footer />
  //         </div>
  //     </main>
  //   );
  // }
}

export default App;