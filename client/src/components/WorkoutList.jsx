import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Form, Container, Row, Col, Card, Button, FloatingLabel } from 'react-bootstrap';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import '../App.scss'


export default function WorkoutList (props) {

const [userWorkoutData, setUserWorkoutData] = useState([]);
const [userWorkoutDetails, setUserWorkoutDetails] = useState([]);
const [exerciseEdit, setExerciseEdit] = useState(-1);
const [durations, setDurations] = useState("");
const [exercises, setexercises] = useState([]);
const [startDate, setStartDate] = useState(null);
const navigate = useNavigate();

//Calculate today date
let dateObj = new Date();
let month = dateObj.getMonth() + 1; //months from 1-12
if (month < 10) {
  month = '0' + month
}
let day = dateObj.getDate();
let year = dateObj.getFullYear();
const todayDate = year + "-" + month + "-" + day;


useEffect(() => {

  //with flat1 we clean the variable from repeated items in nested loop
  const exercisesState = userWorkoutDetails.map((item) => {

    const lineExercises = item.line_exercises;

    return lineExercises.map(nestedItem => {

      return nestedItem

    })

    
  }).flat(1)

  console.log('exercisesState', exercisesState)
  
  setexercises(exercisesState)

}, [userWorkoutDetails])


////Fetch Today workout data on mount
useEffect(() => {

    Axios.get(`/api/workouts/user/${props.state.user.id}`).then(res => {
      const workouts = res.data
      const todayWorkouts = workouts.filter(workout => workout.date === todayDate)
    
      setUserWorkoutData(todayWorkouts);
    })
    

}, [props.state]);


  // Get work out data for a specific user and date//
  useEffect(() => {

    setUserWorkoutDetails([]);

    if (props.state.user.id && startDate) {
    Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {

      const workouts = res.data
      const todayWorkouts = workouts.filter(workout => workout.date === startDate.toISOString().substring(0, 10))
      setUserWorkoutData(todayWorkouts);
    })
  }

  }, [startDate]);


  /////////// Get Exercise Info//////

  useEffect(() => {

    userWorkoutData.forEach((item) => {

      Axios.get(`/api/workouts/${item.id}`).then (res => {

        if (res.data.exercises.length !== 0) {

          setUserWorkoutDetails((prev) => ([...prev, res.data]))

        }
  
      });

    })

  }, [userWorkoutData])

/////////////////////////////////
/////////////////////////////////

//Input durations change handler
const onDurationInputChangeHandler = (event) => {

  const regExp = /[a-zA-Z]/g;

  if (!regExp.test(event.target.value)) {

    setDurations(event.target.value)

  }

};


const navigateToAddMeal = () => {

  navigate('/addworkout');

}

////// Delete Exercise ///////
const deleteExercise = (exerciseId, index) => {


  Axios.delete(`/api/line_exercises/${exerciseId}`).then (res => {

    console.log('serWorkoutDetails', userWorkoutDetails)



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

  
    //////// Edit Exercise /////////
const editExercise = (index) => {

  setExerciseEdit(index)

    }

/////////Submit Button ////////////
const submitExercise = (exerciseId, index) => {


  



  return Axios.put(`/api/line_exercises/${exerciseId}`, {"workout_id": props.workoutId, "exercise_id": index, "exercise_duration":durations})
  .then (() => {

    setUserWorkoutDetails([]);

    userWorkoutData.forEach((item) => {

      Axios.get(`/api/workouts/${item.id}`).then (res => {

        setUserWorkoutDetails((prev) => ([...prev, res.data]))
  
      });

    })


    //Later change this part to update exercise to reflect changes to the exercise
    Axios.get(`/api/workouts/${userWorkoutData}`).then (res => {
      console.log('res', res)

      setUserWorkoutDetails(res.data)
    //////
      setExerciseEdit(-1);

    });


  }).catch(error => console.log(error));
  //Ideally this part should rendere an error message on the page below the post

    }    

    console.log('exercises', exercises);
    console.log('userworkoutdetails', userWorkoutDetails);
    console.log('userworkoutdata', userWorkoutData)

  return (

<Container className="container-margins">

  <Row>

<Col className="calendar-header " xs={3}>


    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      maxDate={new Date()}
      showDisabledMonthNavigation
      className="mb-3"
      inline
    />
    <div className="mb-1">Please select a date</div>

  <Card className="background-img card mt-2">
    <Card.Body>
      <h3>Overview</h3>
    <div>
      <h5><span>Calories</span></h5>
      <h5 className="heading">Carbs</h5>
    </div>
    <div>
      <h5 className="heading">Fat</h5>
    </div>
    <div>
      <h5 className="heading">Protein g</h5>
    </div>
    </Card.Body>
  </Card>

<Col className="mt-3">
    <Button 
    className="mr-5" 
    variant="info" 
    type="submit"
    onClick={() => {navigateToAddMeal()}}
    >
      Log an activity
    </Button>
  </Col> 
</Col>


  <Col>

  <Row className="app-section">
  <div className="app-header-bar">
    Summary
  </div>
          {exercises && exercises.map((item, index) => {

            return (
              <div key={index}>

                <div className="exercise-items-list mt-2"><span>{item.name}!</span>{exerciseEdit !== index && <span>Duration: {item.exercise_duration} Minutes.</span>}
                <span>Total: {item.total_exercise_calories} Calories</span>
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

                <div>

                      <Row className="mb-2">

                      <Col className="post-tools">
                      {exerciseEdit !== index &&
                      
                      <Button 
                      variant="info" 
                      type="submit"
                      onClick={() => {item.id && deleteExercise(item.id, index)}}
                      >
                        Delete
                      </Button>
                      
                       }
                       {exerciseEdit === index &&
                      <Button 
                      variant="info" 
                      type="submit"
                      onClick={() => {item.id && submitExercise(item.id, index)}}
                      >
                        Submit
                      </Button>
                      
                       }
                      
                      {exerciseEdit !== index &&
                      
                      <Button 
                      className="post-button" 
                      variant="info" 
                      type="submit"
                      onClick={() => {item.id && editExercise(index)}}
                      >
                        Edit
                      </Button>
                     }
                    {exerciseEdit === index &&
                     
                     <Button 
                     className="post-button" 
                     variant="info" 
                     type="submit"
                     onClick={() => {item.id && setExerciseEdit(-1)}}
                     >
                       Cancel
                     </Button>
                     
                    }
                      </Col>

                      </Row>

                    </div>
              </div>
            )
      })}

      
    </Row>


  </Col>

</Row>
   </Container>
  );
}

