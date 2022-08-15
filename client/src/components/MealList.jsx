import Axios from "axios";
import React, { useState, useEffect, } from "react";
import DatePicker from "react-datepicker";
import { useNavigate } from 'react-router-dom';
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Card, Button } from 'react-bootstrap';


export default function MealList (props) {
  //this state contains selected day
const [startDate, setStartDate] = useState(null);
const [userMealsId, setUserMealsId] = useState([]);
const [mealData, setMealData] = useState([]);
const [breakfastInfo, setBreakfastInfo] = useState([]);
const [lunchInfo, setLunchInfo] = useState([]);
const [dinnerInfo, setDinnerInfo] = useState([]);
const [snackInfo, setSnackInfo] = useState([]);

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

/////////////////GET MEAL DATA/////////////////////
useEffect(() => {

    if(mealData.length === 0) {

      userMealsId.forEach(item => {
        Axios.get(`/api/meals/${item}`).then((res) => {
          console.log('res-data-inside mealdata use effect', res.data);
            setMealData((prev) => ([...prev, res.data]))
        })
    });

    }

}, [userMealsId])

console.log('mealdata', mealData);
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
      id: "",
    }

    if (mealData.length > 0) {
      setBreakfastInfo([]);
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
              id: element.id,
            }
  
            setBreakfastInfo((prev) => ([
              ...prev, mealInformation 
            ]));
    
          }
    
        })
    
      })

    }
  
  };
  breakfastData();
  
  }, [mealData])
console.log('reakfastInfo', breakfastInfo);
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
      id: "",
    }
  
    if (mealData.length > 0) {

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
            id: element.id,
          }
          
          setLunchInfo((prev) => ([
            ...prev, mealInformation 
          ]));
  
        }
  
      })
  
    })
  
    }
  
  
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
      id: "",
    }
  
  if (mealData.length > 0) {

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
            id: element.id,
          }
          
          setDinnerInfo((prev) => ([
            ...prev, mealInformation 
          ]));
  
        }
  
      })
  
    })
  
  }
  
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
      id: "",
    }
  
  if (mealData.length > 0) {

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
            id: element.id,
          }
          
          setSnackInfo((prev) => ([
            ...prev, mealInformation 
          ]));
  
        }
  
      })
  
    })

  }
  
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


////// Delete Meal Item ///////
const deleteMealItem = (foodId, index) => {


  Axios.delete(`/api/line_foods/${foodId}`).then (() => {

    let newFoodItems = [...breakfastInfo]
    newFoodItems.splice(index, 1)

    const newbreakfastInfo = newFoodItems;

    setBreakfastInfo(newbreakfastInfo);

  }).catch((error) => console.log(error))

    }

////////////////////////////////////////////////
// Fix BUG - Filter data for repetition
///////////////////////////// /////////////////
// useEffect(() => {

//   const uniqueIds = [];

// const mealDataFixed = breakfastInfo.filter(element => {
//   const isDuplicate = uniqueIds.includes(element.id);

//   if (!isDuplicate) {
//     uniqueIds.push(element.id);

//     return true;
//   }

//   return false;
// });

// setBreakfastInfo(mealDataFixed);

// }, [])

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

        <div className="mb-3 app-section">
      {breakfastInfo.length !== 0 && breakfastInfo.map((item, index) => {
        return (
          <div className="food-items" key={index}>
          <Row>
          <Col className="item-display" xs={9}>
          <span>{item.name}</span>
          <span>Carbs:{item.carbs} g</span>
          <span>Protein:{item.protein} g</span>
          <span>Fat:{item.fat} g</span>
          <span>Amount: {item.food_amount}</span>
          <span>Consumed: {item.total_food_calories} Cal</span>
          </Col>

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
          </Row>
          </div>
          )
        })
      }
        </div>




      


{lunchInfo.length !== 0 &&
<Row  className="app-header">
   <div className="app-header-bar">
    Lunch
  </div>

  <Col xs={9} className="header-bar-text mt-2">
    <span className="animate-charcter">Calories: {(lunchTotalCalMac.total_food_calories).toFixed(2)}</span>
    <span className="animate-charcter">Carbs: {(lunchTotalCalMac.carbs).toFixed(2)}</span>
    <span className="animate-charcter">Fat: {(lunchTotalCalMac.fat).toFixed(2)}</span>
    <span className="animate-charcter">Protein: {(lunchTotalCalMac.protein).toFixed(2)}</span>
    </Col>
    <Col className="mt-2">
    <div className="attached-fixed">
    <img className="post-attached" src="/assets/media/images/clip-post-attached.png"></img>
    </div>
    </Col>
</Row>
}

  <div className="mb-3 app-section">
{lunchInfo.length !== 0 && lunchInfo.map((item, index) => {
  return (
    <div className="food-items" key={index}>
    <Row>
    <Col className="item-display" xs={9}>
    <span>{item.name}</span>
    <span>Carbs:{item.carbs} g</span>
    <span>Protein:{item.protein} g</span>
    <span>Fat:{item.fat} g</span>
    <span>Amount: {item.food_amount}</span>
    <span>Consumed: {item.total_food_calories} Cal</span>
    </Col>

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
    </Row>
    </div>
    )
  })
}
  </div>






 

{dinnerInfo.length !== 0 &&
<Row  className="app-header">
   <div className="app-header-bar">
    Dinner
  </div>

  <Col xs={9} className="header-bar-text mt-2">
    <span className="animate-charcter">Calories: {(dinnerTotalCalMac.total_food_calories).toFixed(2)}</span>
    <span className="animate-charcter">Carbs: {(dinnerTotalCalMac.carbs).toFixed(2)}</span>
    <span className="animate-charcter">Fat: {(dinnerTotalCalMac.fat).toFixed(2)}</span>
    <span className="animate-charcter">Protein: {(dinnerTotalCalMac.protein).toFixed(2)}</span>
    </Col>
    <Col className="mt-2">
    <div className="attached-fixed">
    <img className="post-attached" src="/assets/media/images/clip-post-attached.png"></img>
    </div>
    </Col>
</Row>
}

  <div className="mb-3 app-section">
{dinnerInfo.length !== 0 && dinnerInfo.map((item, index) => {
  return (
    <div className="food-items" key={index}>
    <Row>
    <Col className="item-display" xs={9}>
    <span>{item.name}</span>
    <span>Carbs:{item.carbs} g</span>
    <span>Protein:{item.protein} g</span>
    <span>Fat:{item.fat} g</span>
    <span>Amount: {item.food_amount}</span>
    <span>Consumed: {item.total_food_calories} Cal</span>
    </Col>

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
    </Row>
    </div>
    )
  })
}
  </div>







    {snackInfo.length !== 0 &&
    <Row  className="app-header">
      <div className="app-header-bar">
        Snack
      </div>

      <Col xs={9} className="header-bar-text mt-2">
        <span className="animate-charcter">Calories: {(snackTotalCalMac.total_food_calories).toFixed(2)}</span>
        <span className="animate-charcter">Carbs: {(snackTotalCalMac.carbs).toFixed(2)}</span>
        <span className="animate-charcter">Fat: {(snackTotalCalMac.fat).toFixed(2)}</span>
        <span className="animate-charcter">Protein: {(snackTotalCalMac.protein).toFixed(2)}</span>
        </Col>
        <Col className="mt-2">
        <div className="attached-fixed">
        <img className="post-attached" src="/assets/media/images/clip-post-attached.png"></img>
        </div>
        </Col>
    </Row>
    }

      <div className="mb-3 app-section">
    {snackInfo.length !== 0 && snackInfo.map((item, index) => {
      return (
        <div className="food-items" key={index}>
        <Row>
        <Col className="item-display" xs={9}>
        <span>{item.name}</span>
        <span>Carbs:{item.carbs} g</span>
        <span>Protein:{item.protein} g</span>
        <span>Fat:{item.fat} g</span>
        <span>Amount: {item.food_amount}</span>
        <span>Consumed: {item.total_food_calories} Cal</span>
        </Col>

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
        </Row>
        </div>
        )
      })
    }
      </div>

 


      </Col>
        
      </Row>

    </Container>
  );

}
