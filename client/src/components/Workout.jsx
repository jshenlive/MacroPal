import React, { useState, useEffect } from "react";
// import useAppData from "hooks/useAppData"
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

  const [exercises, setExercises] = useState([])
  const [query, setQuery] = useState("")
  const [suggestions, setSuggestions] = useState([])
  const [units, setUnits] = useState({})
  const weight = 67;

  useEffect(() => {

    const loadExercises = async() => {
      // async function to get the exercise data from rails
      const response = await Axios.get('/api/exercises');
      // response.data is an array with objects of exercises
      console.log(response.data)
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
    setQuery(query);
    setSuggestions([]);
  }

      return (
        <Container fluid>
          <Row>

            <Col>
            </Col>

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
                      name= "duration"
                      onChange={event => onChangeHandler(event.target.value)}
                      onBlur={() => {
                        setTimeout(() => {
                          setSuggestions([])
                        }, 100)
                      }}
                      value={query}
                      placeholder="Enter Duration"
                      />
                          {suggestions && suggestions.map((suggestion, index) =>
                            <div 
                            key={index} 
                            className="query-suggestions"
                            onClick={() => onSuggestHandler(suggestion.name)}
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

            <Button className="mt-2" variant="info" type="submit">
              Calculate
            </Button>
            </Col>

            <Col>
            </Col>

          </Row>
        </Container>
      );

}




// <Addworkout 
// calculateWorkoutCalories={calculateWorkoutCalories}
// />

// const { 
//   state,
//   calculateWorkoutCalories,
// } = useAppData();