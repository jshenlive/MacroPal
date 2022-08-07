import React, { Component } from 'react';
import axios from 'axios';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      array: [],
      exercises: []
    }
  }

  fetchData = () => {
    axios.get('/api/exercises') // You can simply make your requests to "/api/whatever you want"
    .then((response) => {
      // handle success
      console.log('get object', response.data) // The entire response from the Rails API

      
      // console.log('get message', response.data) // Just the message
      this.setState({
        array: [...response.data],
        exercises: [this.state.array.map((exer)=>{
          return (
            <li>
               {exer.name}
            </li>
          )
        })]
      });

      // console.log();
    })
    
    .catch(e=>{
      console.log(e);
      console.log("something went wrong");
    })
  }


  render() {
    return (
      <div className="App">
        <h1>{this.state.exercises}</h1>
        <button onClick={this.fetchData} >
          Fetch Data
        </button>        
      </div>
    );
  }
}

export default App;



// import React, {useState, Component } from 'react';
// import axios from 'axios';
// import './App.css';
// import SearchBar from './searchBar'
// import { response } from 'express';

// class App extends Component {

//   // submitHandler = function (event) {
//   //   event.preventDefault();
//   //   axios.post('/api/workout', {"workout":{
//   //     user_id: 1,
//   //     date: '2022-08-07',
//   //   }})
//   //   .then(() => console.log('Variables sent'))
//   //   .catch(() => console.log('Nashod'))
//   // };

//   getExercise = () =>{
//     axios.get('/api/exercises')
//     .then((response)=>{
//       return response.data
//     })
//     .catch((e)=>e.error)
//   }

//   exercises = App.getExercise().map((exer)=>{
//     return (
//       <li>
//         exer.name
//       </li>
//     )

//   })

//   // fetchData = () => {
//   //   axios.get('/api/workout') // You can simply make your requests to "/api/whatever you want"
//   //   .then((response) => {
//   //     // handle success
//   //     console.log('user object', response.data) // The entire response from the Rails API

//   //     console.log('user message', response.data.message) // Just the message
//   //     this.setState({
//   //       message: response.data.message
//   //     });
//   //   }) 
//   // }
//   render() {
//     return (
//       <div className="App">
//         {App.exercises}    
//       </div>
//     );
//   }

// }

// export default App;
