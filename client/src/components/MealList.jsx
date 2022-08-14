import Axios from "axios";
import React, { useState, useEffect, } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Card } from 'react-bootstrap';


export default function MealList (props) {
  //this state contains selected day
const [startDate, setStartDate] = useState(null);
const [userMealsId, setUserMealsId] = useState([]);
const [mealData, setMealData] = useState([]);
const [breakfastInfo, setBreakfastInfo] = useState({});



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

        if (item.date === startDate.toISOString().substring(0, 10)) {

          mealDataArray.push(item.id)

        }
      });

      setUserMealsId(mealDataArray);

    })
  }

  }, [startDate]);
/////////////////////////////////////////////

/////////////////GET DATA DETAILS MEAL////////////////
useEffect(() => {

  const mealArray = [];
  userMealsId.map(item => {

    Axios.get(`/api/meals/${item}`).then((res) => {

      mealArray.push(res.data);

    });

  });

  setMealData(mealArray);

}, [userMealsId])
console.log('meal', mealData)
/////////////////////////////////////////////
// Prepare Breakfast Items
///////////////////////////// ///////////////
useEffect(() => {

  
  let breakfastInfoArray = [];
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

  mealData.map((item) => {

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
        
        breakfastInfoArray.push(mealInformation);

      }

    })

  })

  setBreakfastInfo(breakfastInfoArray);

  //when passing array as dependency, if length is 0. stringify array to make it work
}, [JSON.stringify(mealData)])

console.log('BreakfastInfo', breakfastInfo)


// if (item.line_food.meal_type === "2lunch") {

// }

// if (item.line_food.meal_type === "3dinner") {

// }

// if (item.line_food.meal_type === "4snack") {

// }



  return (
    <Container className="mt-5">

      <Row className="mb-5 text-center">

      <Col xs={3}>
          <h4 className="mb-1">Summary of your Meals</h4>

        <div className="mb-1">Please select a date to view</div>
        <DatePicker
          selected={startDate}
          onChange={(date) => setStartDate(date)}
          // maxDate={new Date()}
          showDisabledMonthNavigation
          className="mb-3"
          inline
        />
      </Col>
      
      <Col>

        <Card className="mb-2">
        <Card.Header>Breakfast</Card.Header>
        <Card.Body>This is some text within a card body.</Card.Body>
        </Card>

        <Card className="mb-2">
        <Card.Header >Lunch</Card.Header>
        <Card.Body>This is some text within a card body.</Card.Body>
        </Card>


        <Card className="mb-2">
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
