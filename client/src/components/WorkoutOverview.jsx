import Axios from "axios";
import React, { useState, useEffect } from "react";
import WorkoutChart from './WorkoutChart';
import DatePicker from "react-datepicker";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import "react-datepicker/dist/react-datepicker.css";
import { useNavigate } from 'react-router-dom';
import '../App.scss'


export default function WorkoutList (props) {


const [totalWorkoutCalories, setTotalWorkoutCalories] = useState([]);
const [totalworkoutDuration, setTotalworkoutDuration] = useState([]);
const [userWorkoutData, setUserWorkoutData] = useState([]);
const [periodLables, setPeriodLables] = useState([]);
const [userWorkoutDetails, setUserWorkoutDetails] = useState([]);
const [exerciseEdit, setExerciseEdit] = useState(-1);
const [durations, setDurations] = useState("");
const [exercises, setexercises] = useState([]);
const [startDate, setStartDate] = useState(new Date());
const [endDate, setEndDate] = useState(null);
const navigate = useNavigate();
///////////////////////////
const [period, setperiod] = useState(7);
  const [periodWorkoutData, setPeriodWorkoutData] = useState([]);
  const [totalperiodData, setTotalperiodData] = useState({
    totalCalorie: "",
    totalhours: "",
  });
////////////////////////////////
////////////Daypicker//////////
const onChange = (dates) => {
  const [start, end] = dates;
  setStartDate(start);
  setEndDate(end);
};


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

  
  setexercises(exercisesState)

}, [userWorkoutDetails])


  // Get work out data for a specific user and date//
  useEffect(() => {

    setUserWorkoutDetails([]);

    if (props.state.user.id && startDate) {
    Axios.get(`/api/workouts/user/${props.state.user.id}`).then ( res => {

      const workouts = res.data
    
      const periodStart = startDate.toISOString().substring(8, 10)
      const periodEnd = endDate.toISOString().substring(8, 10)

      const periodWorkoutData = [];
      const periodTotalworkoutDuration = [];
      const periodTotalWorkoutCalories = [];
      const periodLables = [];


      workouts.forEach(workout => {

          if (workout.date.substring(8, 10) >= periodStart && workout.date.substring(8, 10) <= periodEnd)
          periodWorkoutData.push(workout);
          periodTotalworkoutDuration.push(workout.workout_duration);
          periodTotalWorkoutCalories.push(workout.total_workout_calories);
          periodLables.push(workout.date);

        });
        
      setUserWorkoutData(periodWorkoutData);
      setTotalWorkoutCalories(periodTotalWorkoutCalories);
      setTotalworkoutDuration(periodTotalworkoutDuration);
      setPeriodLables(periodLables);
      
    })
  }

  }, [endDate]);


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
const deleteExercise = (exerciseId, workoutId) => {


  Axios.delete(`/api/line_exercises/${exerciseId}`).then (res => {



    const workoutDetailsElement = userWorkoutDetails.find(element => element.workout.id === workoutId);
    const workoutDetailsElementIndex = userWorkoutDetails.findIndex(element => element.workout.id === workoutId);
    const elementLineExerciseTodeleteIndex = workoutDetailsElement.line_exercises.findIndex(element => element.id === exerciseId);



    let newExercises = [...userWorkoutDetails[workoutDetailsElementIndex].exercises]

    newExercises.splice(elementLineExerciseTodeleteIndex, 1)

    let newLineExercises = [...userWorkoutDetails[workoutDetailsElementIndex].line_exercises]
    newLineExercises.splice(elementLineExerciseTodeleteIndex, 1)

    const newuserWorkoutDetailsElement = {
      ...userWorkoutDetails[workoutDetailsElementIndex],

      exercises: newExercises,
      line_exercises: newLineExercises,
    }

    let userWorkoutDetailsCopy = [...userWorkoutDetails]
    userWorkoutDetailsCopy[workoutDetailsElementIndex] = newuserWorkoutDetailsElement

    setUserWorkoutDetails(userWorkoutDetailsCopy);

  }).catch((error) => console.log(error))

    }

    //////// Edit Exercise /////////
const editExercise = (index) => {

  setExerciseEdit(index)

    }

/////////Submit Button ///////////////
const submitExercise = (exerciseId, workoutId) => {



  return Axios.put(`/api/line_exercises/${exerciseId}`, {"workout_id": workoutId, "exercise_id": exerciseId, "exercise_duration":durations})
  .then (() => {

    setUserWorkoutDetails([]);
    setExerciseEdit(-1);

    userWorkoutData.forEach((item) => {

      Axios.get(`/api/workouts/${item.id}`).then (res => {

        setUserWorkoutDetails((prev) => ([...prev, res.data]))
  
      });

    })

    //Later change this part to update exercise to reflect changes to the exercise
    Axios.get(`/api/workouts/${userWorkoutData}`).then (res => {


      setUserWorkoutDetails(res.data)
    //////


    });


  }).catch(error => console.log(error));
  //Ideally this part should rendere an error message on the page below the post

    }    

/////get workout data for last n days///////
///////////////////////////////////////////
useEffect(() => {
  const getWorkoutDataLastnDays = () => {

    const lastnDays = userWorkoutData.slice(-period)
    setPeriodWorkoutData(lastnDays)

  }
  getWorkoutDataLastnDays()
}, [period]);

//Calculate total calorie burn for the period

useEffect(() => {
const calculateTotalCalorieBurn = () => {
  
  let totalCalorie = 0;
  let totalminutes = 0;


  for (let i = 0; i < periodWorkoutData.length; i++) {

    totalCalorie += periodWorkoutData[i].total_workout_calories
    totalminutes += periodWorkoutData[i].workout_duration

  }

  //Convert minutes into hours minutes
  const hours = totalminutes/60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  const hoursminutes = rhours + " hour(s) and " + rminutes + " minute(s).";
  
  setTotalperiodData({
    totalCalorie: totalCalorie,
    totalhours: hoursminutes,
  });
}


calculateTotalCalorieBurn()
}, [periodWorkoutData]);

const pickPeriod = (data) => {
  setperiod(data);
}


  return (

<Container className="container-margins">

  <Row>

<Col className="calendar-header " xs={3}>


      <DatePicker
      selected={startDate}
      onChange={onChange}
      startDate={startDate}
      endDate={endDate}
      selectsRange
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
      <WorkoutChart 
      lables={periodLables}
      calories={totalWorkoutCalories}
      duration={totalworkoutDuration}
      />
        </Row>

      </Col>

      </Row>


   </Container>
  );
}

