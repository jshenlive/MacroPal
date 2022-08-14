import Axios from "axios";
import React, { useState, useEffect, } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Container, Row, Col, Card } from 'react-bootstrap';


export default function MealList (props) {
  //this state contains selected day
const [startDate, setStartDate] = useState(null);
const [userMealData, setUserMealData] = useState([]);
const [test, setTest] = useState([]);



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
        fetchedMealData.push(item);
      }
    });
    
    setUserMealData(fetchedMealData);
  })
}

}, [props.state]);


/////////////////Date selected////////////////
  useEffect(() => {

    if (props.state.user.id) {
    Axios.get(`/api/meals/user/${props.state.user.id}`).then( res => {

      let mealDataArray = [];

      res.data.map((item) => {

        if (item.date === startDate.toISOString().substring(0, 10)) {

          mealDataArray.push(item)

        }
      });

      setUserMealData(mealDataArray);

    })
  }

  }, [startDate]);

/////////////////////////////////////////////

/////////////////GET Data DAY MEAL////////////////
useEffect(() => {

  const testarray = [];

  userMealData.map(item => {

    console.log('item.id', item.id)
    testarray.push(item.id);
    // Axios.get(`/api/meals/${}`)

  })

  setTest(testarray);

}, [userMealData])
/////////////////////////////////////////////

  console.log('test', test);


  return (
    <Container className="mt-5">

      <Row className="mb-5 text-center">

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
