import Axios from "axios";
import React, { useState, useEffect, } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Exercise from "./Exercise";


export default function WorkoutList (props) {

  const [userWorkoutData, setUserWorkoutData] = useState([]);

//this state contains selected day
const [startDate, setStartDate] = useState(null);

////Calculate date(Today)

let dateObj = new Date();

let month = dateObj.getUTCMonth() + 1; //months from 1-12
if (month < 10) {
  month = '0' + month
}
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
const todayDate = year + "-" + month + "-" + day;

  //Get work out data for a specific user and date//
  useEffect(() => {

    if (props.state.user.id) {
    Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {

      res.data.map((item) => {

        if (item.date === startDate.toISOString().substring(0, 10)) {

          setUserWorkoutData(item);
        }
      })

    })
  }

  }, [startDate]);
  //////////////////////////////////////////////

  console.log('userWorkoutData.id', userWorkoutData.id)

  return (

    <Container className="mt-3">

    <Row>
    <h4 className="mb-1">Find summary of your activities</h4>

    <div className="mb-1">Please select a date to view</div>
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      maxDate={new Date()}
      showDisabledMonthNavigation
      className="mb-3"
      inline
    />
    </Row>

    {userWorkoutData.id &&
      <Row className="mb-5">
      <Col>
      <div>Workout Duration: {userWorkoutData.workout_duration} minutes</div>
      <div>Total Workout Calories: {userWorkoutData.total_workout_calories} </div>
      <div>Work out Created at {userWorkoutData.date} </div>
      <div>Last updated: {userWorkoutData.updated_at} </div>
      </Col>
      <hr></hr>
      {userWorkoutData.id && <Exercise workoutId={userWorkoutData.id} />}
      </Row>
    }
    </Container>
  );

}

