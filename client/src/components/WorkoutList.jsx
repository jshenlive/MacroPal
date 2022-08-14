import Axios from "axios";
import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Exercise from "./Exercise";


export default function WorkoutList (props) {

  const [userWorkoutData, setUserWorkoutData] = useState([]);
  const navigate = useNavigate();
//this state contains selected day
const [startDate, setStartDate] = useState(null);

////Fetch Today workout data on mount
useEffect(() => {

let dateObj = new Date();
let month = dateObj.getUTCMonth() + 1; //months from 1-12
if (month < 10) {
  month = '0' + month
}
let day = dateObj.getUTCDate();
let year = dateObj.getUTCFullYear();
const todayDate = year + "-" + month + "-" + day;

Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {
  

  res.data.map((item) => {
    console.log('item', item);
    if (item.date === todayDate) {

      setUserWorkoutData(item);
    }
  })

})

}, [props.state]);




  //Get work out data for a specific user and date//
  useEffect(() => {

    if (props.state.user.id) {
    Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {

      res.data.map((item) => {

        if (item.date === startDate.toISOString().substring(0, 10)) {

          setUserWorkoutData(item);
        }
      })

    })
  }

  }, [startDate]);
  //////////////////////////////////////////////

//Navigate to Another Page

const addAnotherExercise = () => {

  navigate('/addWorkout');

}

  return (

    <Container className="mt-3">

    <Row>

    <Card className="mt-5" style={{ width: '20rem' }}>
      <Card.Body> 
      <Col>
    <h5 className="mb-1">Physical Activity Summary</h5>
    <DatePicker
      selected={startDate}
      onChange={(date) => setStartDate(date)}
      maxDate={new Date()}
      showDisabledMonthNavigation
      className="mb-3"
      inline
    />
    <Row>
    <div className="mb-1">Please select a date to view</div>
     <Button 
      variant="info" 
      type="submit"
      onClick={() => {addAnotherExercise()}}
       >
        Add Exercise
      </Button>
  
  </Row>
    </Col>

     </Card.Body>
    </Card>      

    <Col>

    {userWorkoutData.id &&
      <>

      <Card className="mb-2 text-center">
      <Card.Header>Summary</Card.Header>
      <Card.Body>

      <Col>
      <div>Workout Duration: {userWorkoutData.workout_duration} minutes</div>
      <div>Total Workout Calories: {userWorkoutData.total_workout_calories} </div>
      <div>Work out Created at {userWorkoutData.date} </div>
      <div>Last updated: {userWorkoutData.updated_at} </div>
      </Col>

      </Card.Body>
      </Card>

      {userWorkoutData.id && 
      <Card>
      <Card.Header>List of exercises:</Card.Header>
      <Card.Body>
      <Exercise workoutId={userWorkoutData.id} />
      </Card.Body>
      </Card>
      }
      </>
    }
    </Col>

    </Row>

    </Container>
  );

}

