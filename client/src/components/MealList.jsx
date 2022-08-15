import Axios from "axios";
import React, { useState, useEffect, } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Card } from 'react-bootstrap';
import '../Heading.css'


export default function MealList (props) {
  //this state contains selected day
const [startDate, setStartDate] = useState(null);
const [userMealsId, setUserMealsId] = useState([]);
const [mealData, setMealData] = useState([]);
const [breakfastInfo, setBreakfastInfo] = useState([]);
const [lunchInfo, setLunchInfo] = useState([]);
const [dinnerInfo, setDinnerInfo] = useState([]);
const [snackInfo, setSnackInfo] = useState([]);

// Get Meal data for a specific user and date////////////////
///////////////Initial stage when no date is selected////////
useEffect(() => {

  if (props.state.user.id && startDate === null) {
  Axios.get(`/api/meals/user/${props.state.user.id}`).then ( res => {

    let fetchedMealData = [];

////Calculate date(Today)
    let dateObj = new Date()
    let month = dateObj.getUTCMonth() + 1; //months from 1-12
    
    
    if (month < 10) {
      month = '0' + month
    }
    let day = dateObj.getUTCDate();
    let year = dateObj.getUTCFullYear();
    const todayDate = year + "-" + month + "-" + day;

    res.data.map((item) => {
      if (item.date === todayDate) {
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

/////////////////GET MEAL DATA////////////////
useEffect(() => {

  function fetchData() {

    userMealsId.forEach(item => {
    Axios.get(`/api/meals/${item}`).then((res) => {
      setMealData((prev) => ([
        ...prev, res.data 
      ]))
    })
  });

}
  fetchData();
  
}, [userMealsId])


/////////////////////////////////////////////
// Prepare Breakfast Items
///////////////////////////// ///////////////
useEffect(() => {

  const breakfastData = () => {
  
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
    }

    mealData.forEach(item => {
  
      item.line_food.forEach((element, index) => {

        if (element.meal_type === "1breakfast") {
  
            mealInformation = {
            name: item.food[index].food.name,
            brand: item.food[index].food.brand,
            health: item.food[index].food.health,
            category: item.food[index].food.category,
            carbs: Math.round(item.food[index].food.carbs * 1e2 ) / 1e2,
            fat: Math.round(item.food[index].food.fat * 1e2 ) / 1e2,
            protein: Math.round(item.food[index].food.protein * 1e2 ) / 1e2,
            food_amount: element.food_amount,
            total_food_calories: element.total_food_calories,
            meal_type: element.meal_type.slice(1),
          }

          setBreakfastInfo((prev) => ([
            ...prev, mealInformation 
          ]));
  
        }
  
      })
  
    })
  
  
  
  
  };
  breakfastData();
  
  }, [mealData])

/////////////////////////////////////////////
// Prepare Lunch Items
///////////////////////////// ///////////////
useEffect(() => {

  const lunchData = () => {
  
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
    }
  
    mealData.forEach(item => {

      item.line_food.forEach((element, index) => {
  
        if (element.meal_type === "2lunch") {
  
            mealInformation = {
            name: item.food[index].food.name,
            brand: item.food[index].food.brand,
            health: item.food[index].food.health,
            category: item.food[index].food.category,
            carbs: Math.round(item.food[index].food.carbs * 1e2 ) / 1e2,
            fat: Math.round(item.food[index].food.fat * 1e2 ) / 1e2,
            protein: Math.round(item.food[index].food.protein * 1e2 ) / 1e2,
            food_amount: element.food_amount,
            total_food_calories: element.total_food_calories,
            meal_type: element.meal_type.slice(1),
          }
          
          setLunchInfo((prev) => ([
            ...prev, mealInformation 
          ]));
  
        }
  
      })
  
    })
  
  
  
  
  };
  lunchData();
  
  }, [mealData])

/////////////////////////////////////////////
// Prepare Dinner Items
///////////////////////////// ///////////////
useEffect(() => {

  const dinnerData = () => {
  
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
    }
  
    mealData.forEach(item => {

      item.line_food.forEach((element, index) => {
  
        if (element.meal_type === "3dinner") {
  
            mealInformation = {
            name: item.food[index].food.name,
            brand: item.food[index].food.brand,
            health: item.food[index].food.health,
            category: item.food[index].food.category,
            carbs: Math.round(item.food[index].food.carbs * 1e2 ) / 1e2,
            fat: Math.round(item.food[index].food.fat * 1e2 ) / 1e2,
            protein: Math.round(item.food[index].food.protein * 1e2 ) / 1e2,
            food_amount: element.food_amount,
            total_food_calories: element.total_food_calories,
            meal_type: element.meal_type.slice(1),
          }
          
          setDinnerInfo((prev) => ([
            ...prev, mealInformation 
          ]));
  
        }
  
      })
  
    })
  
  
  
  
  };
  dinnerData();
  
  }, [mealData])

/////////////////////////////////////////////
// Prepare Snack Items
///////////////////////////// ///////////////
useEffect(() => {

  const snackData = () => {
  
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
    }
  
    mealData.forEach(item => {

      item.line_food.forEach((element, index) => {
  
        if (element.meal_type === "4snack") {
  
            mealInformation = {
            name: item.food[index].food.name,
            brand: item.food[index].food.brand,
            health: item.food[index].food.health,
            category: item.food[index].food.category,
            carbs: Math.round(item.food[index].food.carbs * 1e2 ) / 1e2,
            fat: Math.round(item.food[index].food.fat * 1e2 ) / 1e2,
            protein: Math.round(item.food[index].food.protein * 1e2 ) / 1e2,
            food_amount: element.food_amount,
            total_food_calories: element.total_food_calories,
            meal_type: element.meal_type.slice(1),
          }
          
          setSnackInfo((prev) => ([
            ...prev, mealInformation 
          ]));
  
        }
  
      })
  
    })
  
  };
  snackData();
  
  }, [mealData])

////////////////////////////////////////////////
// Calculate Total Calories, Macros [Breakfast]
///////////////////////////// /////////////////
const totalCalMacFunc = (breakfast, lunch, dinner, snack) => {

  let totalCalMacArr = [];
  totalCalMacArr.push(breakfast, lunch, dinner, snack);

  const totalCalMacCalculated = totalCalMacArr.reduce((accum, current) => {
    Object.entries(current).forEach(([key, value]) => {

      if (key === "carbs" || key === "fat" || key === "protein"  || key === "total_food_calories") {
      accum[key] = (accum[key] + value) || value;
      }

    })
    return {...accum}
  }, {});

  return totalCalMacCalculated;

}

const totalSetCalMac = (mealset) => {

  const totalCalMacCalculated = mealset.reduce((accum, current) => {
    Object.entries(current).forEach(([key, value]) => {

      if (key === "carbs" || key === "fat" || key === "protein"  || key === "total_food_calories") {
      accum[key] = (accum[key] + value) || value;
      }

    })
    return {...accum}
  }, {});

  return totalCalMacCalculated;
}

const breakfastTotalCalMac = totalSetCalMac(breakfastInfo);
const lunchTotalCalMac = totalSetCalMac(lunchInfo);
const dinnerTotalCalMac = totalSetCalMac(dinnerInfo);
const snackTotalCalMac = totalSetCalMac(snackInfo);
const totalCalMac = totalCalMacFunc(breakfastTotalCalMac, lunchTotalCalMac, dinnerTotalCalMac, snackTotalCalMac);


  return (
    <Container className="mt-5  text-center">

      <Row className="mb-5">

      <Col xs={3}>
          <h4 className="mb-1">Summary of your Meals</h4>

        <div className="mb-1">Please select a date to view</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          maxDate={new Date()}
          showDisabledMonthNavigation
          className="mb-3"
          inline
        />

      <Card className="card mt-2">
        <Card.Body>
        <div className="thirteen mb-2">
          <h1 className="heading">Calories: {totalCalMac.total_food_calories && (totalCalMac.total_food_calories).toFixed(2)}</h1>
        </div>
        <div className="thirteen mb-2">
          <h1 className="heading">Carbs: {totalCalMac.carbs && (totalCalMac.carbs).toFixed(2)}</h1>
        </div>
        <div className="thirteen mb-2">
          <h1 className="heading">Fat {totalCalMac.fat && (totalCalMac.fat).toFixed(2)} g</h1>
        </div>
        <div className="thirteen mb-2">
          <h1 className="heading">Protein {totalCalMac.protein && (totalCalMac.protein).toFixed(2)} g</h1>
        </div>
        </Card.Body>
      </Card>

      </Col>
  
      
      <Col>

      {breakfastInfo.length !== 0 &&
      <Row  className="app-header">
         <div className="app-header-bar">
          Breakfast
        </div>

        <Col xs={9} className="header-bar-text mt-2">
          <span className="animate-charcter">Calories: {(breakfastTotalCalMac.total_food_calories).toFixed(2)}</span>
          <span className="animate-charcter">Carbs: {(breakfastTotalCalMac.carbs).toFixed(2)}</span>
          <span className="animate-charcter">Fat: {(breakfastTotalCalMac.fat).toFixed(2)}</span>
          <span className="animate-charcter">Protein: {(breakfastTotalCalMac.protein).toFixed(2)}</span>
          </Col>
          <Col className="mt-2">
          <div className="attached-fixed">
          <img className="post-attached" src="/assets/media/images/clip-post-attached.png"></img>
          </div>
          </Col>
        </Row>
          }

        <div className="app-section">
      {breakfastInfo.length !== 0 && breakfastInfo.map((item, index) => {
        return (
          <div key={index}>
          <div>name:{item.name}</div>
          <div>carbs:{item.carbs}</div>
          <div>protein:{item.protein}</div>
          <div>fat:{item.fat}</div>
          <div>food_amount:{item.food_amount}</div>
          <div>total_food_calories:{item.total_food_calories}</div>
          {item.brand && <div>brand:{item.brand}</div>}
          {item.health && <div>health:{item.health}</div>}
          <hr></hr>
          </div>
          )
        })
      }
        </div>
        <Card className="card mb-2">
        <Card.Header >Lunch</Card.Header>
        <Card.Body>
        </Card.Body>
        </Card>


        <Card className="card mb-2">
        <Card.Header>Dinner</Card.Header>
        <Card.Body>This is some text within a card body.</Card.Body>
        </Card>


        <Card className="mb-2">
        <Card.Header>Snacks</Card.Header>
        <Card.Body>This is some text within a card body.</Card.Body>
        </Card>

      </Col>

      </Row>

    </Container>
  );

}
