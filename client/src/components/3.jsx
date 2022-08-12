import React, { useState, useEffect, useLayoutEffect } from "react";
import Axios from "axios";
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';

export default function WorkoutEdit2 (props) {

  const [userWorkoutDetails, setUserWorkoutDetails] = useState("");

console.log('props', props)


    useLayoutEffect(() => {

      const workoutDetails = async() => {
 
       const userWorkoutDetails = await Axios.get(`/api/workouts/${props.workoutId}`)
       setUserWorkoutDetails(userWorkoutDetails);
     
     };
 
     workoutDetails();
   }, [props.workoutId]);



  console.log('userWorkoutDetails', userWorkoutDetails)

  return (
    <Container>
      <Row className="mt-5">

        <hr>{userWorkoutDetails.data}</hr>
        <Col>
        <div></div>
        
        </Col>

      </Row>

    </Container>
  );

}