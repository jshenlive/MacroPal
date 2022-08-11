import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { randNumGen } from "../helpers/helpers"
import { AppUnits } from "../hooks/useAppData"
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import '../App.scss'

export default function Exercise (props) {

  const [cart, setCart] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [showResults, setShowResults] = useState(false);
  const [query, setQuery] = useState("");
  const [queryItems, setQueryItems] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [exerciseCalories, setExerciseCalories] = useState("");
  const [durations, setDurations] = useState("");
  const [exerciseAdded, setEexerciseAdded] = useState(false);
  const [exerciseListDisplay, setExerciseListDisplay] = useState(false);
  const [exerciseCaloriesBurned, setExerciseCaloriesBurned] = useState([]);
  const [caloriesTotal, setCaloriesTotal] = useState("");

  const {
    units,
    setUnits,
    setUnitFunction,
    calculateWeightInLbs,
  } = AppUnits();

  //Fetch list of exercises
  useEffect(() => {

    const loadExercises = async() => {
      // async function to get the exercise data from rails 
      const response = await Axios.get('/api/exercises');
      // response.data is an array with objects of exercises
      setExercises(response.data)
    }
    loadExercises();
    
  }, [])

  //update the calories of exercises individually and overall
  useEffect(() => {

        setExerciseCaloriesBurned((prev) => {

          const caloriesBurned = [...prev];
          caloriesBurned.pop(exerciseCalories);
          return caloriesBurned;

        });
        
  }, [exerciseCalories])

  console.log('exerciseCaloriesBurned-outside-useEffect', exerciseCaloriesBurned)

  //navigation function
  const navigate = useNavigate();

  const exampleWeight = 67;
  
  const weight = function(exampleWeight) {
    if (units.name === "English") {
      return calculateWeightInLbs(exampleWeight);
    }
    if (units.name === "Metric") {
      return exampleWeight;
    }
  }

  const onChangeHandler = (query) => {

    let matches = []
    if (query.length > 0) {
      matches = exercises.filter( exercise => {
        //gi modifier sets case insensitivity
        const regex = new RegExp(`${query}`, "gi");
        return exercise.name.match(regex)
      })
    }
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

  const addExercise = () => {

    calculateWorkoutCalories();
//  object with exercise information
    const exerciseData = {
      exercise_id: randNumGen,
      workout_id: queryItems.id,
      exercise_duration: durations,
    }

      // async function to post the exercise object to backend
      return Axios.post('/api/carts/add_exercise',   {"exercise_id": queryItems.id, "exercise_duration":durations})
      .then((response) => {

        //get cart(list of exercises added) data after an exercise is added,set the state of cart
        //in future rmove and add a state instead

        return Axios.get('/api/carts')
        .then((response) => {
        setCart(response.data);

        // setExerciseListDisplay(true);
          // window.location.reload(false);
          //useEFFect> define dependency (cartstate--> do something)
        })
        .catch((error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
      });
  }


  const submitAllExercise = () => {

        const userData = {

          id: props.state.user.data.user.id,
          date: new Date(),
        }

          // async function to submit workout (cart) to rails
          return Axios.post('/api/workouts',   {"user_id": userData.id, "date":userData.date})
          .then((response) => {
            
            if (response.status === 200){
                // 👇️ navigate to /
                navigate('/WorkoutList');
            }
            
          }).catch((error) => {
            console.log(error);
          });
      }
  
      //🏅function to calculate total calories of all exercises🏅
  const calculateTotalCaloriesBurned = () => {

    let sum = 0;
    const arr = exerciseCaloriesBurned.one;
    
    for (const value of arr) {
      sum += value;
    }

  }


      return (
        <Container fluid>
          <Row>

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

            <Button 
            className="mt-2" 
            variant="info" 
            type="submit"
            onClick={() => addExercise()}
            >
              Add Exercise
            </Button>

            <br/>
 
            <Row>


              <Row>

              <Col>
              <div>Calories burned:{exerciseCalories}</div>
              <br/>
              </Col>
              </Row>

              <Row>
              <h3>{query}!</h3>
              <br/>
              <p>
              Activity Summary Here
              </p>
              </Row>



            </Row>

            </Col>

            <Col>
            {setExerciseListDisplay &&
            <Row className="mt-5">
            <h4>Summary of activities added:</h4>
              {cart.map((exerciseItem, index) => (
                <>
                <br></br>
                <div>{index + 1}: {exerciseItem.exercise.name}</div>
                <div>Duration:{exerciseItem.exercise_duration}</div>
                <div>Calories Burned:{exerciseCaloriesBurned}</div>
                </>
              ))}

              <h4>Total Calories burned: {caloriesTotal}</h4>

              <Col>

              <Button 
                  className="mt-2" 
                  variant="info" 
                  type="submit"
                  onClick={() => submitAllExercise()}
                  >
                    Submit All exercises
              </Button>

              </Col>
            </Row>
            }
            </Col>

          </Row>
        </Container>
      );

}
