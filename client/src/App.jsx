import React, { Component } from 'react';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Footer from './components/Footer';
import Login from './components/Login';
import Register from './components/Register';

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
          <Footer />
      </main>
    );
  }
}

export default App;