import Axios from "axios";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel, NavItem } from 'react-bootstrap';

export default function WorkoutEdit2 (props) {
const [userWorkoutDetails, setUserWorkoutDetails] = useState({});
const [exerciseEdit, setExerciseEdit] = useState(false);

/////////// Get Exercise Info//////

  useEffect(() => {

    Axios.get(`/api/workouts/${props.workoutId}`).then (res => {

      setUserWorkoutDetails(res.data)

    });

  }, [])

   console.log('userWorkoutDetails', userWorkoutDetails)

const exercises = userWorkoutDetails.exercises;
// console.log('exercises', exercises)

let test = userWorkoutDetails.line_exercises;
if (test) {
  test = userWorkoutDetails.line_exercises[0]
}
console.log('test', test)

/////////////////////////////////

////// Delete Exercise ///////
const deleteExercise = (exerciseId) => {

  Axios.DELETE(`/api/line_exercises/${exerciseId}`).then (res => {

    
  })

    }

//////// Edit Exercise ///////
const editExercise = (exerciseId) => {

    setExerciseEdit(true)

  Axios.get(`/api/line_exercises/${exerciseId}`).then (res => {


  })

    }


  return (
    <Container>
      <Row>
        <h1 className="mb-5">List of exercises: </h1>
      {exercises && exercises.map((item, index) => {
        return (
          <div key={index}>

            <div>
            <h4>Name: </h4>{item.exercise.name}
            </div>
    
            <div>
            <h4>Duration: </h4>{item.exercise_duration}
            </div>
    
            <div>
            <h4>Total Exercise Calories: </h4>{item.total_exercise_calories}
            </div>
                  <div>
                  <Button 
                  className="mt-2" 
                  variant="info" 
                  type="submit"
                  onClick={() => deleteExercise(userWorkoutDetails.line_exercises[0].id)}
                  >
                    Delete
                  </Button>
                  </div>
                  <div>
                  <Button 
                  className="mt-2" 
                  variant="info" 
                  type="submit"
                  onClick={() => editExercise()}
                  >
                    Edit
                  </Button>
                  </div>
                  <hr></hr>
          </div>

        )
      })}
      </Row>
    </Container>
  );

}