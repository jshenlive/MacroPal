import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Signup from './components/Signup';
import Login from './components/Login';
import Exercise from './components/Exercise';
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
          <Signup />
          <Login />
          <Exercise />
          <div className="index-footer">
          <Footer />
          </div>
      </main>
    );
  }
}

export default App;