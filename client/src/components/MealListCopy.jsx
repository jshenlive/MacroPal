import Axios from "axios";
import React, { useState, useEffect, } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import '../App.scss'


export default function MealList (props) {
  //this state contains selected day
const [startDate, setStartDate] = useState(null);
const [userMealsId, setUserMealsId] = useState([]);
const [mealData, setMealData] = useState([]);
const [breakfastInfo, setBreakfastInfo] = useState([]);

    //navigation function
    const navigate = useNavigate();
    const navigateToAddMeal = () => {
      navigate('/meals');
    }

// Get Meal data for a specific user and date////////////////
///////////////Initial stage when no date is selected////////
useEffect(() => {

  if (props.state.user.id && startDate === null) {
  Axios.get(`/api/meals/user/${props.state.user.id}`).then ( res => {

    let fetchedMealData = [];

////Calculate date(Today)
    let dateObj = new Date()
    let month = dateObj.getMonth() + 1; //months from 1-12
    
    
    if (month < 10) {
      month = '0' + month
    }
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();
    const todayDate = year + "-" + month + "-" + day;

    res.data.map((item) => {
//get date from Database,convert to yyyy-mm-dd string
      const todaydateconverted = item.created_at.slice(0, 10);
      if (todaydateconverted === todayDate) {
        fetchedMealData.push(item.id);
      }
    });
    
    setUserMealsId(fetchedMealData);
  })
}

}, [props.state]);


/////////////////Date selected - Return Meal ID////////////////
  useEffect(() => {

    if (props.state.user.id) {
    Axios.get(`/api/meals/user/${props.state.user.id}`).then( res => {

      let mealDataArray = [];

      res.data.map((item) => {

        if (startDate && item.date === startDate.toISOString().substring(0, 10)) {

          mealDataArray.push(item.id)

        }
      });

      setUserMealsId(mealDataArray);

    })
  }

  }, [startDate]);
/////////////////////////////////////////////

/////////////////GET MEAL DATA/////////////////////
useEffect(() => {

    if(mealData.length === 0) {

      let mealInformation = {
        name: "",
        brand: "",
        health: "",
        category: "",
        carbs: "",
        fat: "",
        protein: "",
        food_amount: "",
        total_food_calories: "",
        meal_type: "",
        id: "",
      }

      userMealsId.forEach(item => {
        Axios.get(`/api/meals/${item}`).then((res) => {

console.log('-----response----', res);


          


        let data = res.data.line_food.sort((a,b)=>{
            let fa = a.meal_type
            let fb = b.meal_type
  
            if (fa < fb) {
            return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;})
          console.log("data",data)

            setMealData((prev) => ([...prev, res.data]))
        })
    });

    }

}, [userMealsId])



////////////////////////////////////////////////
// Calculate Total Calories, Macros 
///////////////////////////// /////////////////
// useEffect(() => {
  // const totalCalMacFunc = (breakfast, lunch, dinner, snack) => {

  //   let totalCalMacArr = [];

  //   if (breakfast.length > 0) {
  //   totalCalMacArr.push(breakfast);
  //   }

  //   if (lunch.length > 0) {
  //     totalCalMacArr.push(lunch);
  //     }

  //   if (dinner.length > 0) {
  //       totalCalMacArr.push(dinner);
  //   }

  //   if (snack.length > 0) {
  //     totalCalMacArr.push(snack);
  //   }

  //   const totalCalMacCalculated = totalCalMacArr.reduce((accum, current) => {
  //     Object.entries(current).forEach(([key, value]) => {
  
  //       if (key === "carbs" || key === "fat" || key === "protein"  || key === "total_food_calories") {
  //       accum[key] = (accum[key] + value) || value;
  //       }
  
  //     })
  //     return {...accum}
  //   }, {});
  
  
  //   return totalCalMacCalculated;
  
  // }
  
  // const totalSetCalMac = (mealset) => {

  //   const totalCalMacCalculated = mealset.reduce((accum, current) => {
  //     Object.entries(current).forEach(([key, value]) => {
  
  //       if (key === "carbs" || key === "fat" || key === "protein"  || key === "total_food_calories") {
  //       accum[key] = (accum[key] + value) || value;
  //       }
  
  //     })
  //     return {...accum}
  //   }, {});
  
  //   return totalCalMacCalculated;
  // }


  // const breakfastTotalCalMac = totalSetCalMac(breakfastInfo);

  // const lunchTotalCalMac = totalSetCalMac(lunchInfo);

  // const dinnerTotalCalMac = totalSetCalMac(dinnerInfo);
  
  // const snackTotalCalMac = totalSetCalMac(snackInfo);
  // // debugger;
  // const totalCalMac = totalCalMacFunc(breakfastTotalCalMac, lunchTotalCalMac, dinnerTotalCalMac, snackTotalCalMac);

  
  // setBreakfastTotalCalMac(breakfastTotalCalMac);
  // setLunchTotalCalMac(lunchTotalCalMac);
  // setDinnerTotalCalMac(dinnerTotalCalMac);
  // setSnackTotalCalMac(snackTotalCalMac);
  // setTotalCalMac(totalCalMac);

// }, [breakfastInfo])





////// Delete Meal Item ///////
// const deleteMealItem = (foodId, index) => {


//   Axios.delete(`/api/line_foods/${foodId}`).then (() => {

//     let newFoodItems = [...breakfastInfo]
//     newFoodItems.splice(index, 1)

//     const newbreakfastInfo = newFoodItems;

//     setBreakfastInfo(newbreakfastInfo);

//   }).catch((error) => console.log(error))

//     }


////////////////////Building Block//////////////////

const buldingBlock = () => {
  const titled = {titled1:false, titled2:false, titled3:false, titled4: false}
  
  return(
    <>
  {mealData.map(item=>{
      // let itemCalories = item.food.calories / 100 * item.food_amount

      const showItemHeader = (titledid)=>{
        let title = ""
        if(!titled[titledid]){
          titled[titledid] = true;
          title = item.meal_type.slice(1)
        }

        return(
          <>
          <Row key={item.food.id} className="app-header">
          <div className="app-header-bar">
          {capitalize(title)}
          </div>
          {/* <Col xs={9} className="header-bar-text mt-2">
          <span className="animate-charcter">Calories: {Math.round(snackTotalCalMac.total_food_calories)}</span>
          <span className="animate-charcter">Carbs: {Math.round(snackTotalCalMac.carbs)}</span>
          <span className="animate-charcter">Fat: {Math.round(snackTotalCalMac.fat)}</span>
          <span className="animate-charcter">Protein: {Math.round(snackTotalCalMac.protein)}</span>
          </Col> */}
          <Col className="mt-2">
          <div className="attached-fixed">
          <img className="post-attached" src="/assets/media/images/clip-post-attached.png"></img>
          </div>
          </Col>
          </Row>

          <div className="mb-3 app-section">
          <Row className="food-items">
          <Col className="item-display" xs={9}>
          <span>{item.name}</span>
          <span>Carbs:{item.carbs} g</span>
          <span>Protein:{item.protein} g</span>
          <span>Fat:{item.fat} g</span>
          <span>Amount: {item.food_amount}</span>
          <span>Consumed: {item.total_food_calories} Cal</span>
          </Col>
          </Row>
          </div>
          </>

        )
      }

      if( item.meal_type === "1breakfast") {
        return showItemHeader("titled1")
      } else if( item.meal_type === "2lunch"){
        return (
          showItemHeader("titled2")
        )
      } else if( item.meal_type === "3dinner"){
        return (
          showItemHeader("titled3")
      )
      } else if(item.meal_type ==="4snack"){
      return (
        showItemHeader("titled4")
      )} else {
        return "Something went wrong"
      }

      
    }

  )}

  <Col>
    <Button 
    className="mr-5" 
    variant="info" 
    type="submit"
    onClick={() => {deleteMealItem(item.id, index)}}
    >
      Delete
    </Button>
  </Col>
  
  </>
  )
}

///////////////////////////////////////////////////////////////

  return (
    <Container className="container-margins  text-center">

      <Row className="mb-5">

     <Col xs={3}>
          <h4 className="calendar-header mb-1">Summary of your Meals</h4>

        <div className="calendar-header mb-1">Please select a date to view</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          maxDate={new Date()}
          showDisabledMonthNavigation
          className="mb-3"
          inline
        />

      <Card className="background-img card mt-2">
        <Card.Body>
          <h3>Overview</h3>
        <div>
          <h5><span>Calories</span> {totalCalMac.total_food_calories && (totalCalMac.total_food_calories).toFixed(2)}</h5>
          <h5 className="heading">Carbs {totalCalMac.carbs && (totalCalMac.carbs).toFixed(2)}</h5>
        </div>
        <div>
          <h5 className="heading">Fat {totalCalMac.fat && (totalCalMac.fat).toFixed(2)} g</h5>
        </div>
        <div>
          <h5 className="heading">Protein {totalCalMac.protein && (totalCalMac.protein).toFixed(2)} g</h5>
        </div>
        </Card.Body>
      </Card>

      { mealData.length > 0 &&
      <Col className="mt-3">
        <Button 
        className="mr-5" 
        variant="info" 
        type="submit"
        onClick={() => {navigateToAddMeal()}}
        >
          Add a meal
        </Button>
      </Col>
      }
     </Col>

     <Col> 

     {/* {mealData.length>0 && buldingBlock()} */}
  
     </Col>
        
      </Row>

    </Container>
  );

}
