import Axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { randNumGen } from "../helpers/helpers"
import { AppUnits } from "../hooks/useAppData"
import { Container, Row, Col, Form, Button, FloatingLabel, Card } from 'react-bootstrap';
import '../App.scss'

export default function Workout (props) {

  const [cart, setCart] = useState([]);
  const [exercises, setExercises] = useState([]);
  const [query, setQuery] = useState("");
  const [queryItems, setQueryItems] = useState({});
  const [suggestions, setSuggestions] = useState([]);
  const [exerciseCalories, setExerciseCalories] = useState("");
  const [durations, setDurations] = useState("");
  const [exerciseCaloriesBurned, setExerciseCaloriesBurned] = useState([]);
  const [caloriesTotal, setCaloriesTotal] = useState("");
  const {
    units,
    setUnits,
    setUnitFunction,
    calculateWeightInLbs,
  } = AppUnits();
console.log('cart', cart)
    //navigation function
    const navigate = useNavigate();

  //Fetch user's weight
    const userWeight = props.state.user.weight_kg;

  //Fetch list of exercises
  useEffect(() => {


    const loadExercises = async() => {
      // async function to get the exercise data from rails 
      const response = await Axios.get('/api/exercises');
      // response.data is an array with objects of exercises
      console.log('response.data', response);
      setExercises(response.data)
    }
    loadExercises();
    
  }, [])

  //update the calories of exercises individually and overall
  useEffect(() => {

        setExerciseCaloriesBurned((prev) => {

          const caloriesBurned = [...prev];
          caloriesBurned.push(exerciseCalories);
          return caloriesBurned;

        });

  }, [cart])

  //Calculate Total calories burned
  useEffect(() => {

    const calculateTotalCalories = calculateTotalCaloriesBurned();
    setCaloriesTotal(calculateTotalCalories.toFixed(2));

}, [exerciseCaloriesBurned])

//calculation exercise calorie when user inputs duration
useEffect(() => {

    const calculateWorkoutCalories = () => {

      const durationPerHour = (Number(durations)/60)
  //if weight is less than 130 pounds
      if (weight(userWeight) <= 130) {
        const result = queryItems.calories_burned_s * durationPerHour;
        setExerciseCalories(result.toFixed(2));
      }
      if (weight(userWeight) > 130 && weight(userWeight) <= 155) {
        const result = queryItems.calories_burned_m * durationPerHour;
        setExerciseCalories(result.toFixed(2));
      }
      if (weight(userWeight) > 155 && weight(userWeight) <= 180) {
        const result = queryItems.calories_burned_l * durationPerHour;
        setExerciseCalories(result.toFixed(2));
      }
      if (weight(userWeight) > 180) {
        const result = queryItems.calories_burned_xl * durationPerHour;
        setExerciseCalories(result.toFixed(2));
      }

    };
    calculateWorkoutCalories();

  }, [durations])

  
  const weight = function(exampleWeight) {
    if (units.name === "English") {
      return calculateWeightInLbs(exampleWeight);
    }
    if (units.name === "Metric") {
      return exampleWeight;
    }
  };

  //Choose your Activity Input change
  const onChangeHandler = (query) => {
 
    let matches = [];

    if (query.length > 0) {

      matches = exercises.filter( exercise => {
        //gi modifier sets case insensitivity
        const regex = new RegExp(`${query}`, "gi");
        return exercise.name.match(regex)
      })
    }
    setSuggestions(matches)
    setQuery(query)
  };
//Input durations change handler
  const onDurationInputChangeHandler = (event) => {

    const regExp = /[a-zA-Z]/g;

    if (!regExp.test(event.target.value)) {

      setDurations(event.target.value)

    }

  };

  const onSuggestHandler = (query) => {
    setQuery(query.name);
    setQueryItems(query);
    setSuggestions([]);
  };

///////////Add Exercise ////////////
  const addExercise = () => {


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

        console.log(queryItems)
        })
        .catch((error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
      });
  }

  // NOTE: made changed date variable
  // Sync date with how dates are added to meals
  // Was showing a day earlier then current date using old format
  // Possibly due to timezone
  const date = new Date();
  const currDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
///////////Workout Submit///////////

  const submitAllExercise = () => {

        const userData = {
          id: props.state.user.id,
          date: new Date(),
        }
          // async function to submit workout (cart) to rails
          return Axios.post('/api/workouts',   {"user_id": userData.id, "date":currDate})
          .then((response) => {

                navigate('/WorkoutList');
            
          }).catch((error) => {
            console.log('error', error);
          });


      }
  
      //🏅function to calculate total calories of all exercises🏅
  const calculateTotalCaloriesBurned = () => {

    let sum = 0;
    const arr = exerciseCaloriesBurned.map(str => {
      return Number(str);
    });
    
    for (const value of arr) {
      sum += value;
    }

    return sum;

  }

  const resetFormInput = () => {
    setExerciseCalories(0);
    setDurations(0);
  }

 return (
  <Container className="container-margins">

    <Row className="justify-content-md-center">
    
    
        <Col className="app-section" xs={10}>

              <div className="app-header-bar">
                Calculate How Many Calories You're Burning
              </div>   
              
              <br/>
                  <Form.Group
                   className="mt-2"
                  >
                    <FloatingLabel
                    controlId="floatingInput"
                    label="Choose Your Activity"
                    className="mb-3"
                    >
                      <Form.Control 
                      type="text"
                      autocomplete="off"
                      name= "activitiesQuery"
                      onFocus={()=> resetFormInput()}
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
                      value={durations}
                      name= "duration"
                      autocomplete="off"
                      onChange={event => onDurationInputChangeHandler(event)}
                      placeholder="Enter Duration"
                      />
                    </FloatingLabel>
                  </Form.Group>
                </Col>


                <Col>
                <Form.Control 
                      type="text"
                      className="mt-2"
                      placeholder={`Your Weight: ${weight(userWeight)} ${units.mass}`}
                      readOnly
                      />
                  <div key="inline-radio" className="font-bold mb-3">
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

              <Row>

                <Col md={3}>
                  <Button 
                  className="font-bold mb-3" 
                  variant="info" 
                  type="submit"
                  onClick={() => addExercise()}
                  >
                    Add Exercise
                  </Button>
                </Col>

                <Col md={{ span: 5, offset: 4 }}>
                  <div className="animate-charcter info-text">
                  {durations && query? <div> Calories burned:{exerciseCalories} </div> : <span>Calories burned:0 </span>}
                  </div>
                  <br/>
                </Col>

              </Row>

        </Col>

        { cart.length > 0 ?
        
          <Col className="app-section" xs={10}>

            <Row className="mt-2">
            <div className="app-header-bar mb-2">Summary of activities added:</div>

            <Col>
              {cart.map((exerciseItem, index) => (
                <div key={index} className="exercise-items mt-2">
                <div><span className="font-bold">{exerciseItem.exercise.name}</span> for <span className="data-info">{exerciseItem.exercise_duration} minutes</span>,  Calories: <span className="data-info">{exerciseCaloriesBurned[index+1]}</span></div>
                </div>
              ))}
            </Col>

            <Col className="headshot circle-heading-workout" xs={4}>
          <Card className="headshot headshot-2 card mt-2">
            <Card.Body>
            <h4 className="mt-4 font-bold">Total Calories burned: {caloriesTotal}</h4>
              <Button 
                  className="font-bold mb-3" 
                  variant="info" 
                  type="submit"
                  onClick={() => submitAllExercise()}
                  >
                    Submit All exercises
              </Button>
              </Card.Body>
          </Card>
            </Col>
          </Row>

          </Col>
          : null }
    </Row>

  </Container>
 );

}