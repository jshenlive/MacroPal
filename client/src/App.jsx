import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Register from './components/Register';
import Login from './components/Login';
import Workout from './components/Workout';
import './App.scss';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }
  
  render() {
    return (
      <main>
        <nav>
          <Navbar />
        </nav>
          <Main />
          <Register />
          <Login />
          <Workout />
          <div className="index-footer">
          <Footer />
          </div>
      </main>
    );
  }
}

export default App;