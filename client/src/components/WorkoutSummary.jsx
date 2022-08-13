import Axios from "axios";
import React, { useState, useEffect, } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';

export default function WorkoutSummary (props) {

  //states
  const [userWorkoutData, setUserWorkoutData] = useState("");


//get day:
const today = new Date();
const day = String(today.getDate()).padStart(2, '0');
console.log('today', today)
console.log('day', day)

  //Get work out data for a user //
  useEffect(() => {

    if (props.state.user.id) {
    Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {

      setUserWorkoutData(res.data);
    })
  }

  }, [props.state]);

  console.log('userWorkoutData', userWorkoutData);

//loop to get last 2 day workout data
const lastTwoDayWorkoutData = () => {

  for (let i = day; i <= i-6; i--) {
    
  }
}


return (
  <Container className="mt-5">
  <h1>List of exercises: </h1>


  <h3>Day: Date </h3>
  <div>Total Calories:</div>
  <div>Total MInutes:</div>



  </Container>
);

}