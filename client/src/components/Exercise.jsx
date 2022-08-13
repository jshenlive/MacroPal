import Axios from "axios";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Form, Button, FloatingLabel, NavItem } from 'react-bootstrap';
import '../App.scss'

export default function WorkoutEdit2 (props) {
const [userWorkoutDetails, setUserWorkoutDetails] = useState({});
const [exerciseEdit, setExerciseEdit] = useState(-1);
const [durations, setDurations] = useState("");
const [exercises, setexercises] = useState([]);
const navigate = useNavigate();
const lineExercise = userWorkoutDetails.line_exercises;

useEffect(() => {
  setexercises(userWorkoutDetails.exercises);
}, [userWorkoutDetails])
console.log('exercises', exercises)

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
const editExercise = (index) => {

  setExerciseEdit(index)

    }

/////////Submit Button ////////////
const submitExercise = (exerciseId, index) => {

  return Axios.put(`/api/line_exercises/${exerciseId}`, {"workout_id": props.workoutId, "exercise_id": index, "exercise_duration":durations})
  .then (res => {
    setExerciseEdit(-1);
  }).catch(error => console.log(error));
  //Ideally this part should rendere an error message on the page below the post

    }    

//Input durations change handler
const onDurationInputChangeHandler = (event) => {

  const regExp = /[a-zA-Z]/g;

  if (!regExp.test(event.target.value)) {

    setDurations(event.target.value)

  }

};

//Navigate to Another Page

const addAnotherExercise = () => {

  navigate('/Workout');

}


  return (
    <Container className="mb-5">
      <Row>
        <h1>List of exercises: </h1>
          {exercises && exercises.map((item, index) => {
            return (

              <div key={index}>

                <h4 >Name: </h4>


                <div>
                  {item.exercise.name}
                </div>

                <div>
                <h4>Duration: </h4>
                {exerciseEdit !== index && item.exercise_duration}
                </div>
                {exerciseEdit === index &&
                <Col>
                  <Form.Group className="mt-2">
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Enter Duration (Minutes)"
                    onChange={event => onDurationInputChangeHandler(event)}
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text"
                      name= "duration"
                      placeholder="Enter Duration"
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                }

                {exerciseEdit !== index &&
                <div>
                <h4>Total Exercise Calories: </h4>{item.total_exercise_calories}
                </div>
                }

                      {exerciseEdit === index &&
                      <div>
                      <Button 
                      className="mt-2" 
                      variant="info" 
                      type="submit"
                      onClick={() => {lineExercise && submitExercise(lineExercise[index].id, index)}}
                      >
                        Submit
                      </Button>
                      </div>
                       }

                      {exerciseEdit !== index &&
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
                       }

                      {exerciseEdit !== index &&
                      <div>
                      <Button 
                      className="mt-2" 
                      variant="info" 
                      type="submit"
                      onClick={() => {lineExercise && editExercise(index)}}
                      >
                        Edit
                      </Button>
                     </div> 

                     }
                     {exerciseEdit === index &&
                     <div>
                      <Button 
                      className="mt-2" 
                      variant="info" 
                      type="submit"
                      onClick={() => {lineExercise && setExerciseEdit(-1)}}
                      >
                        Cancel
                      </Button>
                      </div>
                     }
                      <hr></hr>

              </div>
            )
      })}
            <div>
            <Button 
            className="mb-5" 
            variant="info" 
            type="submit"
            onClick={() => {addAnotherExercise()}}
            >
              Add Exercise
            </Button>
            </div>
      </Row>
      </Container>
  );

}