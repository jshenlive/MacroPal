import Axios from "axios";
import React, { useState, useEffect, } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Card } from 'react-bootstrap';


export default function MealList (props) {
  //this state contains selected day
const [mealData, setMealData] = useState([]);
const [breakfastInfo, setBreakfastInfo] = useState([]);

/////////////////////////////////////////////

/////////////////GET MEAL DETAILS-CATEGORIZE////////////////
useEffect(() => {

  function fetchData() {

    props.userMealsId.forEach(item => {
    Axios.get(`/api/meals/${item}`).then((res) => {
      setMealData((prev) => ([
        ...prev, res.data 
      ]))
    })

  });

}
  fetchData();
  
}, [props.userMealsId])

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
console.log('item', item)

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

  return (
    <Container className="mt-5">

      <Row className="mb-5 text-center">


      <Col>
      <Card className="card text-black bg-warning mb-2">
        <Card.Header>Breakfast</Card.Header>
      {breakfastInfo.length !== 0 && breakfastInfo.map((item) => {
        return (
          <div>{item.name}</div>
          )
        })
      }
      </Card>

      </Col>

      </Row>

    </Container>
  );

}
