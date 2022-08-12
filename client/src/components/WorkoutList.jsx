import Axios from "axios";
import React, { useState, useEffect, } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import Exercise from "./Exercise";

export default function WorkoutList (props) {

  console.log('props', props)

  const [userWorkoutData, setUserWorkoutData] = useState("");

  useEffect(() => {
    
    if (props.state.user.id) {
    Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {

      setUserWorkoutData(res.data[0]);
    })
  }

  }, [props.state]);


  return (
    <Container>

      <Row className="mt-5">
      <Col >
      <div>Workout Duration: {userWorkoutData.workout_duration} minutes</div>
      <div>Total Workout Calories: {userWorkoutData.total_workout_calories} </div>
      <div>Work out Created at {userWorkoutData.date} </div>
      <div>Last updated: {userWorkoutData.updated_at} </div>
      </Col>
      <hr></hr>
      {userWorkoutData.id && <Exercise workoutId={userWorkoutData.id} />}
      </Row>

    </Container>
  );

}

