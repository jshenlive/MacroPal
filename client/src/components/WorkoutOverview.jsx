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

      const todayWorkouts = [];

      workouts.forEach(workout => {

          if (workout.date.substring(8, 10) >= periodStart && workout.date.substring(8, 10) <= periodEnd)
            todayWorkouts.push(workout);
      });

      console.log('todayWorkouts', todayWorkouts)
       
      setUserWorkoutData(todayWorkouts);
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

console.log('period', period)
console.log('startDate', startDate)
console.log('endDate', endDate)

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
  
          <div className="app-header-bar">
          Summary
          </div>
          <div>
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
                      className="button-tool"
                      onClick={() => {item.id && deleteExercise(item.id, item.workout_id)}}
                      >
                        Delete
                      </Button>
                      
                       }
                       {exerciseEdit === index &&
                      <Button 
                      variant="info" 
                      className="button-tool"
                      type="submit"
                      onClick={() => {item.id && submitExercise(item.id, item.workout_id)}}
                      >
                        Submit
                      </Button>
                      
                       }
                      
                      {exerciseEdit !== index &&
                      
                      <Button 
                      className="button-tool"
                      variant="info" 
                      type="submit"
                      onClick={() => {item.id && editExercise(index)}}
                      >
                        Edit
                      </Button>
                     }
                    {exerciseEdit === index &&
                     
                     <Button 
                     className="button-tool"
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
          </div>
          <div>
            {exercises.length === 0 && 
            <>
            <p className="mt-3">
              Like Strong, this app allows you to track your workouts. The app comes with exercises and plans already registered and you can add others. You can also create routines, track your progress over time, and record your weight and body measurements. With the app, you get access to the community of people who use Jefit and the training plans they create, something you do not get with Strong.
            </p>
            <p className="mt-2"> An app to record your workouts in an easy and intuitive way. The app comes with exercises and plans already registered, but you can also add your own. Create your routines and track your progress over time. Finally, the app also allows you to record your weight and body measurements.</p>
            </>
            }
          </div>

          {/* /////////////////////////// */}
            <Col className="mt-5">
          <div className=" app-section">
            <h1 className="mb-5">Past 7 Days Workouts: </h1>
              <>
                <Form.Select 
              className="mb-5" 
              size="sm"
              onChange={(event)=> pickPeriod(event.target.value)}
              >
                <option>Please Select a period</option>
                <option value="1">One Day</option>
                <option value="7">7 Days</option>
                <option value="14">Two weeks</option>
                <option value="30">One Month</option>
                <option value="180">6 months</option>
                <option value="365">Year</option>
              </Form.Select>
            </>

  {periodWorkoutData && period && periodWorkoutData.map((item, index) => {

            return (

              <div key={index}>

              <h4>Date: {item.date} </h4>
              <div>Total Calories:  {item.total_workout_calories} </div>
              <div>Total Minutes:  {item.workout_duration} </div>
              <hr></hr>

              </div>

                    )
              })}

          <h1 className="mb-3">Total Calories burned: {totalperiodData.totalCalorie} Calories</h1>
          <h1 >Total Hour Working out: {totalperiodData.totalhours} </h1>
          </div>
          </Col>

        
        </Row>

      </Col>

      </Row>


   </Container>
  );
}

