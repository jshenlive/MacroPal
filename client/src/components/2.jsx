import React, { useState, useEffect, useLayoutEffect } from "react";
import Axios from "axios";
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import WorkoutEdit2 from "./3";

export default function WorkoutEdit (props) {

  const [userWorkoutData, setUserWorkoutData] = useState("");

  console.log('props', props)
  console.log('props.state.user.id', props.state.user.id)


  const fetchUserWorkoutData = async() => {
    //get workout data Object for a user
    const userWorkout = await Axios.get(`/api/workouts/user/${props.state.user.id}`)

      setUserWorkoutData(userWorkout.data[0]);

    };


  useLayoutEffect(() => {

    fetchUserWorkoutData();

  }, [props.state]);

console.log('userWorkoutData', userWorkoutData)

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
        {userWorkoutData.id && <WorkoutEdit2 workoutId={userWorkoutData.id} />}
      </Row>

    </Container>
  );

}