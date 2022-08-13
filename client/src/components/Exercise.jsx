import Axios from "axios";
import React, { useState, useEffect, useLayoutEffect } from "react";
import { Container, Row, Col, Form, Button, FloatingLabel, NavItem } from 'react-bootstrap';
import '../App.scss'

export default function WorkoutEdit2 (props) {
const [userWorkoutDetails, setUserWorkoutDetails] = useState({});
const [exerciseEdit, setExerciseEdit] = useState(-1);
const exercises = userWorkoutDetails.exercises;
const lineExercise = userWorkoutDetails.line_exercises;

////////// change to context API
const [exercisesApi, setExercisesApi] = useState([]);
const [query, setQuery] = useState("");
const [suggestions, setSuggestions] = useState([]);
const [queryItems, setQueryItems] = useState({});
const [durations, setDurations] = useState("");
///////////////////////////////

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

  //  object with exercise information
  const exerciseData = {
    workout_id: queryItems.id,
    exercise_duration: durations,
  }


  Axios.put(`/api/line_exercises/${exerciseId}`,   {"exercise_id": queryItems.id, "exercise_duration":durations}).then (res => {

    setExerciseEdit(-1)
 
  }).catch(error => console.log(error))
  //Ideally this part should rendere an error message on the page below the post

    }    

//////////////////Workout.jsx change to context API
useEffect(() => {

  const loadExercises = async() => {
    // async function to get the exercise data from rails 
    const response = await Axios.get('/api/exercises');
    // response.data is an array with objects of exercises
    console.log('response.data', response);
    setExercisesApi(response.data)
  }
  loadExercises();
  
}, [])

const onChangeHandler = (query) => {
 

  let matches = [];

  if (query.length > 0) {

    matches = exercisesApi.filter( exercise => {
      //gi modifier sets case insensitivity
      const regex = new RegExp(`${query}`, "gi");
      return exercise.name.match(regex)
    })
  }
  setSuggestions(matches)
  setQuery(query)
};

const onSuggestHandler = (query) => {
  setQuery(query.name);
  setQueryItems(query);
  setSuggestions([]);
};

//Input durations change handler
const onDurationInputChangeHandler = (event) => {

  const regExp = /[a-zA-Z]/g;

  if (!regExp.test(event.target.value)) {

    setDurations(event.target.value)

  }

};

//////////////////////

  return (
    <Container className="mb-5">
      <Row>
        <h1>List of exercises: </h1>
          {exercises && exercises.map((item, index) => {
            return (

              <div key={index}>

                <h4 >Name: </h4>

                {exerciseEdit !== index &&
                <div>
                  {item.exercise.name}
                </div>
                }

                {exerciseEdit === index &&
                <div>
                  <Form.Group className="mt-2">
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Choose Your Activity"
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text"
                      name= "activitiesQuery"
                      onChange={event => onChangeHandler(event.target.value)}
                      onBlur={() => {
                        setTimeout(() => {
                          setSuggestions([])
                        }, 2000)
                      }}
                      value={query}
                      placeholder="Choose Your Activity"
                      />
                          {suggestions && suggestions.map((suggestion, index) =>
                            <div 
                            key={index} 
                            className="query-suggestions"
                            onClick={() => onSuggestHandler(suggestion)}
                            >
                              {suggestion.name}
                            </div>
                          )}

                    </FloatingLabel>
                  </Form.Group>
                </div>
                }

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
      </Row>
      </Container>
  );

}