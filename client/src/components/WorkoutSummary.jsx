import Axios from "axios";
import React, { useState, useEffect, } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import '../App.scss';

export default function WorkoutSummary (props) {

  //states
  const [userWorkoutData, setUserWorkoutData] = useState("");
  const [periodWorkoutData, setPeriodWorkoutData] = useState("");

////Calculate date(Today)

let dateObj = new Date();

let month = dateObj.getUTCMonth() + 1; //months from 1-12
if (month < 10) {
  month = '0' + month
}
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
const todayDate = year + "-" + month + "-" + day;

  //Get work out data for a user //
  useEffect(() => {

    if (props.state.user.id) {
    Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {

      setUserWorkoutData(res.data);
    })
  }

  }, [props.state]);

  console.log('userWorkoutData', userWorkoutData);


  /////get workout data for last 7 days
  useEffect(() => {
  const getWorkoutDataLast7Days = () => {

    const last7Days = userWorkoutData.slice(-7)
    setPeriodWorkoutData(last7Days)

  }
  getWorkoutDataLast7Days()
}, [userWorkoutData]);


return (
  <Container className="container-margins">
  <h1 className="mb-5">Past 7 Days Workouts: </h1>

  {periodWorkoutData && periodWorkoutData.map((item, index) => {
    
            return (

              <div key={index}>

              <h4>Date: {item.date} </h4>
              <div>Total Calories:  {item.total_workout_calories} </div>
              <div>Total Minutes:  {item.workout_duration} </div>
              <hr></hr>

              </div>
            )
      })}

  <h1 className="mb-3">Total Calories burned: 2560 Calories</h1>
  <h1 >Total Hour Working out: 8 Hours 36 Minutes</h1>
  </Container>
);

}