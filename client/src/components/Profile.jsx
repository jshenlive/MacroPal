import React, {Fragment, useEffect, useState} from "react";
import "./loading.scss";
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


  const [isEmail,setIsEmail] = useState(false)
  const [mealData, setMealData] = useState([])
  const [workoutData, setWorkoutData] = useState([])
  const [queryDate, setQueryDate] = useState(currDate)




  console.log(currDate)
  console.log(prevDate)
  console.log(currDayOf)


  //goals constants

  

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
  

  const totalCaloriesBurned = () => {
    return workoutData.reduce((accumulator,item)=>{
      return accumulator + item.total_workout_calories
    },0)
  }

  const showMeal = () =>{
    console.log(mealData)
    
    return mealData.map((item,index)=>{
      return(
        <Fragment key={index + 100}>
       
        Meal #{index+1}
        <br></br>
        Total meal weight: {item.total_meal_amount} (grams)
        <br></br>
        Total meal calories: {item.total_meal_calories} (Kcal)
        <br></br>
        <p></p>
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
        <p></p>
  
        </Fragment>
      )
    })
  }

  const setEmail = () => {
    if (isEmail){
      setIsEmail(false)
    }else{
      setIsEmail(true)
    }
  }

  const showEmail = () => {
    if (isEmail){
    return(
      <>
        <span>
          Email: {props.state.user && props.state.user.email}
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
          Weight: {props.state.user && props.state.user.weight_kg}
        </span>
        <br />
        <span>
          Height: {props.state.user && props.state.user.height_cm}
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
        {isEmail && showEmail()}
        <Button className="mt-2" variant="outline-info" onClick={()=>setEmail()}>
        {isEmail ? "Hide Email" : "Show Email"}
      </Button>
        <Button className="mt-2" variant="outline-info">
        Edit Info
      </Button>
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
              <Card.Text>
                Total Calories Intake: {totalCaloriesIntake()}
                <br></br>
                Your BMR: {Math.round(userBasic)}
                <br></br>
                Total Calories Burned: {totalCaloriesBurned()}
                <br></br>
                Total Gain/Burned: {totalCaloriesIntake()-Math.round(userBasic) - totalCaloriesBurned()}
                <br></br>


              </Card.Text>
            </Card.Body>
          </Card>

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

        </Col>        
      </Row>

      <p style={{marginBottom: "120px"}}></p>
    </Container>
  );
}
