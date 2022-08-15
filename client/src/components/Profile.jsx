import React, {Fragment, useEffect, useState} from "react";
import "./loading.scss";
// import Button from "react-bootstrap/Button";
import Modal from 'react-bootstrap/Modal'
import {
  Container,
  Row,
  Col,
  Card,
  Figure,
  Badge,
  Button,
} from "react-bootstrap";
import Axios from "axios";

export default function Profile(props) {
  console.log("props.state.user", props.state.user);
  const profile_width = "18rem" 

  const date = new Date();
  const currDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  const prevDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`;

  const weekday = {0:"Sunday",1:"Monday",2:"Tuesday",3:"Wednesday",4:"Thursday",5:"Friday",6:"Saturday"};

  const currDayOf = date.getDay();

  const lifeStyle= {"sedentary":1.2, "light":1.375, "moderate":1.55, "active":1.725, "athletic":1.9 }

  const weight_kg = props.state.user.weight_kg
  const height_cm = props.state.user.height_cm
  const age = props.state.user.age
  
  const WBMR = 655.1 + (9.53 * weight_kg) + (1.85 * height_cm) - (4.676 * age)

  const MBMR = 66.5 + (13.75 * weight_kg) + (5.003* height_cm) - (6.75*age) 

  const userBasic = (props.state.user.gender === "male" ? MBMR : WBMR)

  const userLoseWeight = userBasic * 0.8
  const userLoseWeightFast = userLoseWeight * 0.65


  const suggestedExercise = {"initial":1, "hiking":157, "walking":170, "jogging":50,"running":43, "cycling":5, "swimming":196}

  const [isMore,setIsMore] = useState(false)
  const [mealData, setMealData] = useState([])
  const [workoutData, setWorkoutData] = useState([])
  const [queryDate, setQueryDate] = useState(currDate)
  const [suggestion, setSuggestion] = useState("initial")
  const [suggestedDuration, setSuggestedDuration] = useState(0)
  const [isCalculated, setIsCalculate] = useState(false)

  const [modalShow, setModalShow] = React.useState(false);
  // const [isOpen, setIsSeen] = useState(false)


  console.log(currDate)
  console.log(prevDate)
  console.log(currDayOf)

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Modal heading
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
            {props.content}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  //goals constants

  useEffect(()=>{
    if (mealData.length>0 && workoutData.length>0){
      setIsCalculate(true)
    }
  },[mealData,workoutData])
  

  useEffect(()=>{
    Axios.post('/api/meals/get_with_date', {"user_id": props.state.user.id, "date": queryDate})
    .then((res)=>{
      console.log("meal", res.data)
      setMealData(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })
  },[props.state.user.id,queryDate])

  useEffect(()=>{
    Axios.post('/api/workouts/get_with_date', {"user_id": props.state.user.id, "date": queryDate})
    .then((res)=>{
      console.log("workout", res.data)
      setWorkoutData(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })
  },[props.state.user.id,queryDate])

  const totalCaloriesIntake = () => {
      return mealData.reduce((accumulator,item)=>{
        return accumulator + item.total_meal_calories
      },0)
  }

  useEffect(()=>{
    Axios.get(`/api/exercises/${suggestedExercise[suggestion]}`)
    .then((res)=>{
      let exercise = res.data
      console.log("exercise",exercise)
      let caloriesPerHour = exercise[props.state.user.weight_class]
  
      setSuggestedDuration(Math.round(totalCalories()/caloriesPerHour*60))
    })
    .catch((e)=>{
      console.log(e)
    })
  },[suggestion])
  

  const totalCaloriesBurned = () => {
    return workoutData.reduce((accumulator,item)=>{
      return accumulator + item.total_workout_calories
    },0)
  }

  const totalCalories = ()=> totalCaloriesIntake()-Math.round(userBasic) - totalCaloriesBurned()

  const showMeal = () =>{
    console.log(mealData)
    
    return mealData.map((item,index)=>{
      
      return(
        <Fragment key={index + 100}>

        
      <Button variant="primary" onClick={() => setModalShow(true)}>
      Meal {index+1}
      </Button>

      <MyVerticallyCenteredModal
        content = "TODO TODO"
        show={modalShow}
        onHide={() => setModalShow(false)}
      />


        
        
        <br></br>
        Total meal weight: {item.total_meal_amount} (grams)
        <br></br>
        Total meal calories: {item.total_meal_calories} (Kcal)
        <br></br>
        <br></br>
        </Fragment>
      )
    })
  }

  const showWorkout = () =>{
    console.log(workoutData)
    
    return workoutData.map((item,index)=>{
      return(
        <Fragment key={index + 100}>
       
        Workout #{index+1}
        <br></br>
        Total workout duration: {item.workout_duration} (minutes)
        <br></br>
        Total calories burned: {item.total_workout_calories} (Kcal)
        <br></br>
        <br></br>
  
        </Fragment>
      )
    })
  }

  const showSummary = () =>{
    return (
      <Card.Text>
      Total Calories Intake: {totalCaloriesIntake()}
      <br></br>
      Your BMR: {Math.round(userBasic)}
      <br></br>
      Total Calories Burned: {totalCaloriesBurned()}
      <br></br>
      {totalCalories()> 0 ? "Excess Calories Gained: ": "Excess Calories Burned: "} {totalCalories()} Kcal
      <br></br>
      
      {totalCalories()>0 ? showSuggestion() : "Good Job Today!"}

    </Card.Text>
    )
  }

  const showPlanSummary = () =>{
    return(
      <>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>
              <h3>Workout Summary</h3>
            </Card.Title>
            <Card.Text>{showWorkout()}</Card.Text>
          </Card.Body>
        </Card>

        <Card className="text-center">
          <Card.Body>
              <Card.Title>
                <h3>Meal Summary</h3>
              </Card.Title>
            <Card.Text>{showMeal()}</Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }

  const setActivity = () => {
    return (
      <>
      Complete <a href="/addworkout">workout</a> or <a href="/meals"> meals</a> to show summary
      </>
    )
  }


  const setMore = () => {
    if (isMore){
      setIsMore(false)
    }else{
      setIsMore(true)
    }
  }

  const showMore = () => {
    if (isMore){
    return(
      <>
        <span>
          Email: {props.state.user && props.state.user.email}
        </span>
        <br />
        <span>City: {props.state.user && props.state.user.city}</span>
        <br />
        <span>
          Province: {props.state.user && props.state.user.province}
        </span>
        <br />
        <span>
          Country: {props.state.user && props.state.user.country}
        </span>
        <br />
      </>)
    } else{
      return (
        <></>
      )
    }
  }

  const showUserInfo = ()=>{
    return(
      <>
        <span>
        Username: {props.state.user && props.state.user.username}  <Badge bg="warning">New User</Badge>
        </span>
        <br />                  
        <span>Age: {props.state.user && props.state.user.age}</span>
        <br />
        <span>
          Weight: {props.state.user && props.state.user.weight_kg } kg
        </span>
        <br />
        <span>
          Height: {props.state.user && props.state.user.height_cm} cm
        </span>
        <br />
        {isMore && showMore()}
        <Button className="mt-2" variant="outline-info" onClick={()=>setMore()}>
        {isMore ? "Hide Info" : "Show More"}
        </Button>
        &emsp;
        <Button className="mt-2" variant="outline-info">
        Edit Info
      </Button>
    </>
    )
  }


  const menuDropDown = ()=>{
    return(
      <select name="suggestion" id="suggestion" onChange={(event)=>{setSuggestion(event.target.value)}} >
        <option value=""></option>
        <option value="walking">Walk</option>
        <option value="jogging">Jog</option>
        <option value="running">Run</option>
        <option value="cycling">Cycling</option>
        <option value="swimming">Swim</option>
        <option value="hiking">Hike</option>
      </select>
      )
  }
  

  const fetchSuggestion = ()=>{


  }

  const showSuggestion = ()=>{
    return (
      <>
      Suggestions: &nbsp;
      {menuDropDown()}

      <br></br>
      {suggestion!== "initial" ? `Try ${suggestion} for ${suggestedDuration} minutes to hit your goal today!` : ""}
      </>
      

    )
  }

  return (
    <Container className="mt-5">
      <Row >
        <Col sm={4}>
          <Card>
            <Card.Body>
              <Card.Title> Welcome, 
                &nbsp;
                {props.state.user && props.state.user.first_name}
                &nbsp;
                {props.state.user && props.state.user.last_name}!

              </Card.Title>

              <Figure>
                <Figure.Image
                  width={171}
                  height={180}
                  alt="171x180"
                  src={props.state.user.avatar_url}
                />
              </Figure>


              <Card.Text>            
                {showUserInfo()}
              </Card.Text>
            </Card.Body>

          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Earned Badges</Card.Title>
              Daily_Maximizer_icon, Weekly_Warrior_icon....
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Card.Title>Weekly Graph</Card.Title>
              Graph?
            </Card.Body>
          </Card>
        </Col>

        <Col sm={8}>
          <Card className="text-center">
            <Card.Body>
              <Card.Title> 

                <h3>Activity Summary</h3>
                  {/* <Button onClick={()=>console.log("hello")}>Yesterday</Button> 
                  &emsp;
                  <Button onClick={()=>console.log("hello")}>Today</Button>  
                  &emsp; 
                  <Button onClick={()=>console.log("hello")}>Week So Far</Button>  */}

              </Card.Title>
             {isCalculated ? showSummary() : setActivity()}
            </Card.Body>
          </Card>
          {isCalculated && showPlanSummary() }

        </Col>        
      </Row>

      <p style={{marginBottom: "120px"}}></p>
    </Container>
  );
}
