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
  
  const WBMR = (655.1 + (9.53 * weight_kg) + (1.85 * height_cm) - (4.676 * age))*1.2

  const MBMR = (66.5 + (13.75 * weight_kg) + (5.003* height_cm) - (6.75*age)) *1.2

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

  const [showYesterday, setShowYesterday] = useState(false)

  const [modalShow, setModalShow] = useState(false);
  const [mealModalIndex,setMealModalIndex] = useState(1)
  const [mealModalData,setMealModalData] = useState({})

  const [workoutModalShow, setWorkoutModalShow] = useState(false);
  const [workoutModalIndex,setWorkoutModalIndex] = useState(1)
  const [workoutModalData,setWorkoutModalData] = useState([])
  // const [isOpen, setIsSeen] = useState(false)


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
  

  useEffect(()=>{
    Axios.get(`/api/meals/${mealModalIndex}`)
    .then((res)=>{
      console.log(res.data)
      setMealModalData(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })
  },[mealModalIndex])

  useEffect(()=>{
    Axios.get(`/api/workouts/${workoutModalIndex}`)
    .then((res)=>{
      console.log(res.data)
      setWorkoutModalData(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })

  }, [workoutModalIndex])

  const showLineFood = () => {
    const titled = {titled1:false, titled2:false, titled3:false, titled4: false}

    if(mealModalData.line_food){
    mealModalData.line_food.sort((a,b)=>{
      let fa = a.meal_type
      let fb = b.meal_type

      if (fa < fb) {
      return -1;
      }
      if (fa > fb) {
          return 1;
      }
      return 0;})
    
 
    return mealModalData.line_food.map(item=>{

        const showItem = (titledid)=>{
          let title = ""
          if(!titled[titledid]){
            titled[titledid] = true;
            title = item.meal_type.slice(1)
          }          
          return(
            <Fragment key={item.id}>
            <h5><u>{capitalize(title)}</u></h5>
          <div >
            <b>{item.food_amount} grams of {item.name}</b>
            <br></br>
            Calories: {Math.round(item.total_food_calories)} kCal
          </div>
          </Fragment>
          )
        }

        if( item.meal_type === "1breakfast") {
          return showItem("titled1")
        } else if( item.meal_type === "2lunch"){
          return (
            showItem("titled2")
          )
        } else if( item.meal_type === "3dinner"){
          return (
            showItem("titled3")
        )
        } else if(item.meal_type ==="4snack"){
        return (
          showItem("titled4")
        )} else {
          return "Something went wrong"
        }
      }
    )}
  }

  const showLineExercise = () => {

    if(workoutModalData.line_exercises){
      return (workoutModalData.line_exercises.map((item)=>{
          return(
            <>
             <b>{item.name} for {item.exercise_duration} minutes</b>
             <br></br> 
             Calories burned: {item.total_exercise_calories} kCal
             <br></br>
             </>
           )
         })
      )     
    }     
  }

  function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  function MealModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="meal-Modal">
            Meal {mealModalIndex}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            <ul>
              {showLineFood()}
            </ul>
            {console.log(mealModalData)}
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function WorkoutModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="workout-modal">
            Workout {workoutModalIndex}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
    
            <ul>
              {showLineExercise()}
            </ul>
            {console.log(workoutModalData)}
     
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={props.onHide}>Close</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const totalCaloriesBurned = () => {
    return workoutData.reduce((accumulator,item)=>{
      return accumulator + item.total_workout_calories
    },0)
  }

  const mealClick = (data) =>{
    setMealModalIndex(data.id)
    setModalShow(true)
  }

  const workoutClick=(data)=>{
    setWorkoutModalIndex(data.id)
    setWorkoutModalShow(true)
  }

  const totalCalories = ()=> totalCaloriesIntake()-Math.round(userBasic) - totalCaloriesBurned()

  const showMeal = () =>{
    console.log(mealData)
    
    return mealData.map((item,index)=>{
      
      return(
        <Fragment key={index + 100}>
        
      <Button variant="primary" onClick={() => mealClick(item)}>
      Meal {index+1}
      </Button>

      <MealModal       
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

        <br></br>
        Total meal weight: {item.total_meal_amount} (grams)
        <br></br>
        Total meal calories: {item.total_meal_calories} (kCal)
        <br></br>
        <br></br>
        </Fragment>
      )
    })
  }

  const showWorkout = () =>{
    console.log(workoutData)
    
    // if(workoutData.length>0)
    return workoutData.map((item,index)=>{
      return(
        <Fragment key={index + 1000}>
       
       <Button variant="primary" onClick={() => workoutClick(item)}>
      Workout {index+1}
      </Button>

      <WorkoutModal       
        show={workoutModalShow}
        onHide={() => setWorkoutModalShow(false)}
      />

        <br></br>
        Total workout duration: {item.workout_duration} (minutes)
        <br></br>
        Total calories burned: {item.total_workout_calories} (kCal)
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
      
      {totalCalories()>0 ? (showYesterday? "🥔Did not maintain weight yesterday, work harder today!🥔" : showSuggestion()) : (showYesterday ? "🔥Well done hitting you goals yesterday!🔥" : "🔥Good Job hitting your goals today!🔥")}

    </Card.Text>
    )
  }

  const showPlanSummary = () =>{
    return(
      <>
        <Card className="text-center">
          <Card.Body>
            <Card.Title>
            <div className="app-header-bar">Workout Summary</div>
            </Card.Title>
            <Card.Text>{showWorkout()}</Card.Text>
          </Card.Body>
        </Card>

        <Card className="text-center">
          <Card.Body>
              <Card.Title>
              <div className="app-header-bar">Meal Summary</div>
              </Card.Title>
            <Card.Text>{showMeal()}</Card.Text>
          </Card.Body>
        </Card>
      </>
    )
  }

  const setActivity = () => {
    if (!showYesterday){
    return (
      <>
      Complete <a href="/addworkout">workout</a> or <a href="/meals"> meals</a> to show summary
      </>
    )}else {
      return(
        <>
        No Summary for Yesterday
        </>
      )
    }
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
  
  const fetchPrev = ()=>{
    setShowYesterday(true)
    setIsCalculate(false)
    setQueryDate(prevDate)
  }

  const fetchCurr = ()=>{
    setShowYesterday(false)
    setIsCalculate(false)
    setQueryDate(currDate)
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
    <Container className="container-margins">
      <Row >
        <Col sm={4}>
          <Card  className="app-section">
            <Card.Body>
            <div className="user-welcome">
            Welcome, 
                &nbsp;
                {props.state.user && props.state.user.first_name}
                &nbsp;
                {props.state.user && props.state.user.last_name}!
            </div>

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

                <div className="app-header-bar">Activity Summary</div>
                 <Button onClick={()=>fetchPrev()}>Yesterday</Button> 
                  &emsp;
                  <Button onClick={()=>fetchCurr()}>Today</Button>  
                  &emsp; 
                  {/* <Button onClick={()=>console.log("hello")}>Week So Far</Button>  */}

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
