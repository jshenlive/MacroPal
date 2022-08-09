import React, { useState, useEffect } from "react";
import { randNumGen } from "../helpers/helpers"
import { AppUnits } from "../hooks/useAppData"
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
  const [durations, setDurations] = useState("");
  const {
    units,
    setUnits,
    setUnitFunction,
    calculateWeightInLbs,
  } = AppUnits();

  const exampleWeight = 67;
  
  const weight = function(exampleWeight) {
    if (units.name === "English") {
      return calculateWeightInLbs(exampleWeight);
    }
    if (units.name === "Metric") {
      return exampleWeight;
    }
  }

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

    const durationPerHour = (Number(durations)/60)
//if weight is less than 130 pounds
    if (weight(exampleWeight) <= 130) {
      const result = queryItems.calories_burned_s * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
    if (weight(exampleWeight) > 130 && weight(exampleWeight) <= 155) {
      const result = queryItems.calories_burned_m * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
    if (weight(exampleWeight) > 155 && weight(exampleWeight) <= 180) {
      const result = queryItems.calories_burned_l * durationPerHour;
      setExerciseCalories(result.toFixed(2));
    }
    if (weight(exampleWeight) > 180) {
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
                      placeholder={`Your Weight: ${weight(exampleWeight)} ${units.mass}`}
                      readOnly
                      />
                  <div key="inline-radio" className="mb-3">
                  <Form.Check
                    inline
                    label="English"
                    name="unit"
                    type="radio"
                    id="inline-radio-1"
                    onClick={() => setUnitFunction("English")}
                    checked={units.name === "English"}
                  />
                  <Form.Check
                    inline
                    label="Metric"
                    name="unit"
                    type="radio"
                    id="inline-radio-2"
                    onClick={() => setUnitFunction("Metric")}
                    checked={units.name === "Metric"}
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
                <Row>
                  <div> Exercise Added!</div>
                </Row>
                <Row>
                  <Col>
                    <div> Summary Of Today's Exercises</div>
                    <Row>
                    <div>Exercise 1</div>
                    <Button 
                    className="mt-2" 
                    variant="info" 
                    type="submit"
                    >
                      Edit
                    </Button>
                    </Row>
                    <Row>
                    <div>Exercise 2</div>
                    <Button 
                    className="mt-2" 
                    variant="info" 
                    type="submit"
                    >
                      Edit
                    </Button>
                    </Row>
                    <Row>
                    <div>Exercise 3</div>
                    <Button 
                    className="mt-2" 
                    variant="info" 
                    type="submit"
                    >
                      Edit
                    </Button>
                    </Row>
                    <Row>
                    <div>Exercise 4</div>
                    <Button 
                    className="mt-2" 
                    variant="info" 
                    type="submit"
                    >
                      Edit
                    </Button>
                    </Row>

                    <Row>
                      <div>Total Calories burned Today: 700 Cal</div>
                    </Row>
                  </Col>

                  <Col>

                  </Col>
                </Row>
              </Col>
              }

            <Col>

            </Col>

          </Row>
        </Container>
      );

}
