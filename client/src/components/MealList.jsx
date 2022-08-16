import Axios from "axios";
import React, { useState, useEffect, } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';


export default function MealList (props) {

  const date = new Date();
  const currDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`
  const prevDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()-1}`;

  const [queryDate, setQueryDate] = useState(currDate)
  const [mealData, setMealData] = useState([])

  const [mealArray, setMealArray] = useState([])




  useEffect(()=>{
    Axios.post('/api/meals/get_with_date', {"user_id": props.state.user.id, "date": queryDate})
    .then((res)=>{
      console.log("initial meals: ", res.data)
      setMealData(res.data)
      return res.data
    }).then((res)=>{
      
      if (res.length>0){
        res.forEach(item=>{
          Axios.get(`/api/meals/${item.id}`)
          .then((res)=>{
            console.log("individual meal info:", res.data)
            setMealArray((prev)=>[...prev,res.data])
          })
          .catch((e)=>{
            console.log(e)
          })
        }
        )
      }
    })
    .catch((e)=>{
      console.log(e)
    })
  },[props.state.user.id, queryDate])

  // useEffect(()=>{
  //   if (mealData.length>0){
  //     mealData.forEach(item=>{
  //       Axios.get(`/api/meals/${item.id}`)
  //       .then((res)=>{
  //         console.log("individual meal info:", res.data)
  //         setMealArray((prev)=>[...prev,res.data])
  //       })
  //       .catch((e)=>{
  //         console.log(e)
  //       })
  //     }
  //     )
  //   }
  // }, [mealData])

  console.log("mealArray info: ",mealArray)

  const totalCaloriesIntake = () => {

    return mealData.reduce((accumulator,item)=>{
      return accumulator + item.total_meal_calories
    },0)
  }

  const totalMealWeight = () => {
    return mealData.reduce((accumulator,item)=>{
      return accumulator + item.total_meal_amount
    },0)
  }

  return (
    <Container className="mt-5">

      <Row className="mb-5 text-center">
      <Col>

      <Card className="mb-2">
      <Card.Header>Days Total</Card.Header>
      <Card.Body>
        Total day calories intake: {totalCaloriesIntake()}
        <br></br>
        Total day meal amount: {totalMealWeight()} grams
      </Card.Body>
      </Card>

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