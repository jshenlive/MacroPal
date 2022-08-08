import React, { useState, useEffect } from "react";
import { randNumGen } from "../helpers/helpers"
// import Addworkout from "./Addworkout";
import Axios from "axios";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FloatingLabel from 'react-bootstrap/FloatingLabel';
import '../App.scss'

export default function Workout () {

  const [exercises, setExercises] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [showSummary, setshowSummary] = useState(true);
  const [query, setQuery] = useState("");
  const [queryItems, setQueryItems] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [exerciseCalories, setExerciseCalories] = useState("");
  const [units, setUnits] = useState({});
  const [durations, setDurations] = useState("");
  const weight = 67;

  useEffect(() => {

    const loadExercises = async() => {
      // async function to get the exercise data from rails
      const response = await Axios.get('/api/exercises');
      // response.data is an array with objects of exercises
      setExercises(response.data)
    }
    loadExercises();

  }, [])

  const onChangeHandler = (query) => {

    let matches = []
    if (query.length > 0) {
      matches = exercises.filter( exercise => {
        //gi modifier sets case insensitivity
        const regex = new RegExp(`${query}`, "gi");
        return exercise.name.match(regex)
      })
    }
    console.log('matches', matches)
    setSuggestions(matches)
    setQuery(query)
  }

  const onSuggestHandler = (query) => {
    setQuery(query.name);
    setQueryItems(query);
    setSuggestions([]);
  };

  const calculateWorkoutCalories = () => {

    const weightInPounds = (weight*2.205)
    const durationPerHour = (Number(durations)/60)
//if weight is less than 130 pounds
    if (weightInPounds <= 130) {
      const result = queryItems.calories_burned_s * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
    if (weightInPounds > 130 && weightInPounds <= 155) {
      const result = queryItems.calories_burned_m * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
    if (weightInPounds > 155 && weightInPounds <= 180) {
      const result = queryItems.calories_burned_l * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
    if (weightInPounds > 180) {
      const result = queryItems.calories_burned_xl * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
      setShowResults(true);
  };

  const addExercise = async() => {
 // object with exercise information
    const exerciseData = {
      exercise_id: randNumGen,
      workout_id: queryItems.id,
      total_exercise_calories: exerciseCalories,
      exercise_duration: durations,
    }
//request body
    const reqData = {"exercise": exerciseData}

      // async function to post the exercise object to backend
      const response = await Axios.post('/api/carts/add_exercise')
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.log(error);
      });

    setshowSummary(false);
  }
      return (
        <Container fluid>
          <Row>

            <Col>
            </Col>
            {showSummary? 
            <Col>       
              <div className="workout-title mt-5">
                Calculate How Many Calories You're Burning
              </div>   
              <br/>
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
                        }, 100)
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
                  <Row>
                <Col>
                  <Form.Group className="mt-2">
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Enter Duration (Minutes)"
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text"
                      name= "duration"
                      onChange={event => setDurations(event.target.value)}
                      placeholder="Enter Duration"
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>
                <Col>
                <Form.Control 
                      type="text"
                      className="mt-2"
                      placeholder={`Your Weight: ${weight} ${units}`}
                      readOnly
                      />
                  <div key="inline-radio" className="mb-3">
                  <Form.Check
                    inline
                    label="English"
                    name="unit"
                    type="radio"
                    id="inline-radio-1"
                  />
                  <Form.Check
                    inline
                    label="Metric"
                    name="unit"
                    type="radio"
                    id="inline-radio-2"
                    checked
                  />
                </div>
                </Col>
              </Row>
            { !showResults ?
            <Button 
            className="mt-2" 
            variant="info" 
            type="submit"
            onClick={() => calculateWorkoutCalories()}
            >
              Calculate
            </Button>
            : null }
            <br/>
            { showResults ? 
            <Row>
              <Col>
                <div>Total Calories burned: {exerciseCalories}</div> 
              </Col>
              <Col>
                <Button 
                  className="mt-2" 
                  variant="info" 
                  type="submit"
                  onClick={() => addExercise()}
                  >
                    Add Exercise
              </Button>
              </Col>
            </Row>
            : null }
            </Col>
              :
              <Col>
                <div> Exercise Added!</div>
              </Col>
              }

            <Col>

            </Col>

          </Row>
        </Container>
      );

}
