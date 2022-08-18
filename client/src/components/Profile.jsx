import React, {Fragment, useEffect, useState} from "react";
import "./loading.scss";
// import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRankingStar, faMedal } from '@fortawesome/free-solid-svg-icons'
import { useNavigate } from "react-router";
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
  let navigate = useNavigate()
  // console.log("props.state.user", props.state.user);
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

  const MBMR = (66.5 + (13.75 * weight_kg) + (5.003* height_cm) - (6.75*age))*1.2

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
  const [isMealCalculated, setIsMealCalculate] = useState(false)
  const [isWorkCalculated, setIsWorkCalculate] = useState(false)

  const [mealReady, setMealReady] = useState(false)
  const [workoutReady, setWorkoutReady] = useState(false)

  const [showYesterday, setShowYesterday] = useState(false)

  const [modalShow, setModalShow] = useState(false);
  const [mealModalIndex,setMealModalIndex] = useState(1)
  const [mealModalData,setMealModalData] = useState({})

  const [workoutModalShow, setWorkoutModalShow] = useState(false);
  const [workoutModalIndex,setWorkoutModalIndex] = useState(1)
  const [workoutModalData,setWorkoutModalData] = useState([])
  // const [isOpen, setIsSeen] = useState(false)

  const [addSuggested, setAddSuggested] = useState(false)

  const [dailyTotalCalories,setDailyTotalCalories] = useState(0)


  //goals constants


  useEffect(()=>{
    Axios.post('/api/meals/get_with_date', {"user_id": props.state.user.id, "date": queryDate})
    .then((res)=>{
      console.log("meal", res.data)
      setMealData(res.data)
      if (res.data.length>0){      
        setIsMealCalculate(true)
      }      
    })
    .then(setMealReady(true))
    .catch((e)=>{
      console.log(e)
    })
  },[props.state.user.id,queryDate,addSuggested])

  useEffect(()=>{
    Axios.post('/api/workouts/get_with_date', {"user_id": props.state.user.id, "date": queryDate})
    .then((res)=>{
      console.log("workout", res.data)
      setWorkoutData(res.data)
      if(res.data.length>0){
        setIsWorkCalculate(true)
      }

    })
    .then(setWorkoutReady(true))    
    .catch((e)=>{
      console.log(e)
    })
  },[props.state.user.id,queryDate,addSuggested])

  const totalCaloriesIntake = () => {
      return mealData.reduce((accumulator,item)=>{
        return accumulator + item.total_meal_calories
      },0)
  }

  useEffect(()=>{
    setDailyTotalCalories(totalCalories())
  },[mealData,workoutData])

  useEffect(()=>{
    Axios.get(`/api/exercises/${suggestedExercise[suggestion]}`)
    .then((res)=>{
      let exercise = res.data
      console.log("exercise",exercise)
      let caloriesPerHour = exercise[props.state.user.weight_class]
  
      setSuggestedDuration(Math.ceil(dailyTotalCalories*60/caloriesPerHour)+7)
    })
    .catch((e)=>{
      console.log(e)
    })
  },[suggestion])
  

  useEffect(()=>{
    Axios.get(`/api/meals/${mealModalIndex}`)
    .then((res)=>{
      console.log("meal with index:",res.data)
      setMealModalData(res.data)
    })
    .catch((e)=>{
      console.log(e)
    })
  },[mealModalIndex])

  useEffect(()=>{
    Axios.get(`/api/workouts/${workoutModalIndex}`)
    .then((res)=>{
      console.log("workout with index",res.data)
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
            {console.log("modal data: ",mealModalData)}
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
            {console.log("workout modal data",workoutModalData)}
     
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
    console.log("mealData in showMeal: ",mealData)
    
    return mealData.map((item,index)=>{
      
      return(
        <Fragment key={index + 100}>
        
      <MealModal       
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
  
      <div className="post-body user-profile-text">
      <center>
      <Button className="mb-3" variant="outline-dark" onClick={() => mealClick(item)}>
      Meal {index+1}
      </Button>  
      </center>
        Total meal weight: {item.total_meal_amount} (grams)
        Total meal calories: {item.total_meal_calories} (kCal)
  
      </div>
      
        </Fragment>
      )
    })
  }

  const showWorkout = () =>{
    console.log("workoutData in showWorkout",workoutData)
    
    // if(workoutData.length>0)
    return workoutData.map((item,index)=>{
      return(
        <Fragment key={index + 1000}>
      <WorkoutModal       
        show={workoutModalShow}
        onHide={() => setWorkoutModalShow(false)}
      />
      <div className="post-body user-profile-text">
        <center>
      <Button variant="outline-dark" onClick={() => workoutClick(item)}>
      Workout {index+1}
      </Button>
      </center>
        Total workout duration: {item.workout_duration} (minutes)
        Total calories burned: {item.total_workout_calories} (kCal)
      </div>


      </Fragment>
      )
    })
  }

  const showSummary = () =>{
    return (

      <Row className="post-body user-profile-text" >

      <Col xs={6} >
      Total Calories Intake: {totalCaloriesIntake()}
      <br></br>
      Your BMR: {Math.round(userBasic)}
      <br></br>
      Total Calories Burned: {totalCaloriesBurned()}
      <br></br>
      {totalCalories()> 0 ? "Excess Calories Gained: " : "Excess Calories Burned: "} {totalCalories()} Kcal
      <br></br>
      </Col>
      <Col xs={6}>
      {totalCalories()>0 ? (showYesterday? "🥔Did not maintain weight yesterday, work harder today!🥔" : showSuggestion()) : (showYesterday ? "🔥Well done hitting you goals yesterday!🔥" : "🔥Good Job hitting your goals today!🔥")}
      </Col>

      </Row>
    )
  }

  const showPlanSummary = () =>{
    return(
      <>
        <Card className=" app-section text-center">
          <Card.Body>
            <Card.Title>
            <div className="app-header-bar">Workout Summary</div>
            </Card.Title>
            <Card.Text>{showWorkout()}</Card.Text>
          </Card.Body>
        </Card>

        <Card className="text-center app-section">
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

  const showMealSum = () =>{
    return(
      <>
      
        <Card className="text-center app-section">
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

  const showWorkoutSum = () => {
    return(
      <>
        <Card className=" app-section text-center">
          <Card.Body>
            <Card.Title>
            <div className="app-header-bar">Workout Summary</div>
            </Card.Title>
            <Card.Text>{showWorkout()}</Card.Text>
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
      
      <div className="user-profilebox-text">
        <div className="user-name-text">
        <Badge bg="warning">VIP User: {props.state.user && props.state.user.username}  </Badge>
        </div>
        
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
      </div>
        <br />
        {isMore && showMore()}
        <Button className="mt-2" variant="info" onClick={()=>setMore()}>
        {isMore ? "Hide Info" : "Show More"}
        </Button>
        &emsp;
        <Button className="mt-2" variant="info">
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
    setIsMealCalculate(false)
    setIsWorkCalculate(false)
    setQueryDate(prevDate)
  }

  const fetchCurr = ()=>{
    setShowYesterday(false)
    setIsMealCalculate(false)
    setIsWorkCalculate(false)
    setQueryDate(currDate)
  }


  const displayActivity = ()=>{
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve("hello");
      },500);
    });
  
  }

  const addSuggestion = () =>{
    let workout_id = workoutData[0].id
    console.log("workoutData",workoutData)
    console.log("workout_id",workout_id)

    let exercise_id = suggestedExercise[suggestion]

    Axios.post(`/api/add_line_exercise`,{"workout_id": workout_id, "exercise_id": exercise_id, "exercise_duration": suggestedDuration})
    .then(()=>setAddSuggested(!addSuggested))
  }

  //   const a = setTimeout(()=>{
  //     if (isCalculated){
  //      showSummary()
  //     }else{
  //       setActivity()}
  //   },500)
  //   clearTimeout()
  //   return a
  // }

  const showSuggestion = ()=>{
    const showAdd = () =>{
      return (
        <>
        <Button variant = "outline-dark" onClick={()=>addSuggestion()}>Add It!</Button>
        </>
      )
    }
    return (
      <>
      Looks like you're being a 🥔
      <br></br>
      Suggestions: &nbsp;
      {menuDropDown()}

      <br></br>
      {suggestion!== "initial" ? `Try ${suggestion} for ${suggestedDuration} minutes to hit your goal today!`  : ""}
      {suggestion!== "initial" ? showAdd() : " "}
      </>
          

    )
  }

  return (
    <Container className="container-margins">
      <Row >
        <Col sm={4}>
          <Card  className="app-section text-center">
            <Card.Body>
            <div className="user-welcome">
            Welcome, 
                &nbsp;
                {props.state.user && props.state.user.first_name}!

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
          <Card className="app-section text-center">
            <Card.Body>
            <div className="user-welcome">Earned Badges</div>
            <br></br>
            <FontAwesomeIcon icon={faRankingStar} />
            &emsp;
            <FontAwesomeIcon icon={faMedal} />
            </Card.Body>
          </Card>

          <Card className="app-section text-center">
            <Card.Body>
            <div className="user-welcome">Historic Data</div>
            <br></br>
              <Button variant="outline-dark" onClick={()=>navigate('/workout-overview')}>Overview</Button>
            </Card.Body>
          </Card>
        </Col>

        <Col sm={8}>
          <Card className="text-center app-section">
            <Card.Body>
              <Card.Title> 
              <div className="app-header-bar mb-3">Activity Summary</div>
                <p>
              <Button variant="outline-dark" onClick={()=>fetchPrev()}>Yesterday</Button> 
                  &emsp;
                  <Button variant="outline-dark" onClick={()=>fetchCurr()}>Today</Button>  
                  &emsp; 
                  </p>

                <p>
             {/* {isCalculated? showSummary() : displayActivity()} */}
             {(isMealCalculated&&isWorkCalculated)? showSummary() : setActivity()}
                    
             </p>
                 
              </Card.Title>
            </Card.Body>
          </Card>
          {/* {isCalculated && showPlanSummary() } */}

          {(isWorkCalculated) && showWorkoutSum()}
          {isMealCalculated && showMealSum()}

        </Col>        
      </Row>

      <p style={{marginBottom: "120px"}}></p>
    </Container>
  );
}
