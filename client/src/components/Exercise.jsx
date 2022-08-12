import Axios from "axios";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel, NavItem } from 'react-bootstrap';

export default function WorkoutEdit2 (props) {
const [userWorkoutDetails, setUserWorkoutDetails] = useState({});

const [exerciseEdit, setExerciseEdit] = useState(false);
const exercises = userWorkoutDetails.exercises;
const lineExercise = userWorkoutDetails.line_exercises;

/////////// Get Exercise Info//////

  useEffect(() => {

    Axios.get(`/api/workouts/${props.workoutId}`).then (res => {

      setUserWorkoutDetails(res.data)

    });

  }, [])


////// Delete Exercise ///////
  const deleteExercise = (exerciseId, index) => {

    Axios.delete(`/api/line_exercises/${exerciseId}`).then (res => {
      let newExercises = [...userWorkoutDetails.exercises]
      newExercises.splice(index, 1)

      let newLineExercises = [...userWorkoutDetails.line_exercises]
      newLineExercises.splice(index, 1)

      const newuserWorkoutDetails = {
        ...userWorkoutDetails,

        exercises: newExercises,
        line_exercises: newLineExercises,
      }

      setUserWorkoutDetails(newuserWorkoutDetails);

    }).catch((error) => console.log(error))

      }

//////// Edit Exercise ///////
const editExercise = (exerciseId) => {

    setExerciseEdit(true)

  Axios.get(`/api/line_exercises/${exerciseId}`).then (res => {


  })

    }

    console.log('userWorkoutDetails', userWorkoutDetails);

  return (
 
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
                      onClick={() => {lineExercise && deleteExercise(lineExercise[index].id, index)}}
                      >
                        Delete
                      </Button>
                      </div>


                      <div>

                      <Button 
                      className="mt-2" 
                      variant="info" 
                      type="submit"
                      onClick={() => {lineExercise && editExercise(lineExercise[index].id, index)}}
                      >
                        Edit
                      </Button>
                      </div>

                      <hr></hr>
              </div>
            )
      })}
      </Row>

  );

}