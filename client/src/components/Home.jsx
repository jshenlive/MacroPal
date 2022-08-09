//client/src/Home.js
import React from 'react';
import { render } from 'react-dom';
import axios from 'axios';
import {Link} from 'react-router-dom'

const Home = () => {

  const logout = ()=>{
  axios.post('/logout')
    .then(()=>
    {
      window.location = "/"
    })
    .catch(error => console.log('api errors:', error))
  }
  return (
    <div>
      <Link to='/login'>Log In</Link>
      <br></br>
      <Link to='/signup'>Sign Up</Link>
      <br></br>
      <button placeholder="submit" type="submit" onClick={logout}>
            Log out
          </button>  
    </div>
  );
  
};
export default Home;