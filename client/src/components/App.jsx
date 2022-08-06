import React, { Component } from 'react';
import axios from 'axios';
import Navbar from './Navbar';
import Main from './Main';
import Footer from './Footer';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      message: 'Click the button to load data!'
    }
  }

  fetchData = () => {
    axios.get('/api/data') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {

      this.setState({
        message: response.data.message
      });
    }) 
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
      // <div className="App">
      //   <h1>{ this.state.message }</h1>
      //   <button onClick={this.fetchData} >
      //     Fetch Data
      //   </button>        
      // </div>