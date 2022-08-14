import React, {useState} from "react";
import { Link } from "react-router-dom";
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

export default function Profile(props) {
  console.log("props.state.user", props.state.user);

  const [isEmail,setIsEmail] = useState(false)

  const profile_width = "18rem" 



  const currDate = new Date();
  const prevDate = new Date()-1;

  console.log(currDate)
  console.log(prevDate)


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
      <Row>
        <Col xs={5}>
          <Card
            bg="Secondary"
            style={{ width: profile_width }}
            key="Secondary"
            className="mb-2"
            text={"dark"}
          >
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
          <Card
            bg="Secondary"
            style={{ width: profile_width }}
            key="Secondary"
            className="mb-2"
            text={"dark"}
          >
            <Card.Body>
              <Card.Title>Earned Badges</Card.Title>
              Daily_Maximizer_icon, Weekly_Warrior_icon....
            </Card.Body>
          </Card>
        </Col>

        <Col >
          <Card>
            <Card.Body>
              <Card.Title> 
                <center>
                  <h3>Activity Summary</h3>
                  <Button onClick={()=>console.log("hello")}>Yesterday</Button> 
                  &emsp;
                  <Button onClick={()=>console.log("hello")}>Today</Button>  
                  &emsp; 
                  <Button onClick={()=>console.log("hello")}>Week So Far</Button> 
           
                </center>
              </Card.Title>
              <br></br>
              <Card.Text>
                Total Calories Intake:
                <br></br>
                Total Calories Burned:
                <br></br>
                Total Gain/Burned: 
                <br></br>
                Your Goals: 
                <br></br>

              </Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
            <center>
                <Card.Title>
                  <h3>Workout Summary</h3>
                </Card.Title>
              </center>

              <Card.Text>Biometric</Card.Text>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <center>
                <Card.Title>
                  <h3>Meal Summary</h3>
                </Card.Title>
              </center>


              <Card.Text>Biometric</Card.Text>
            </Card.Body>
          </Card>

        </Col>        
      </Row>

      

      <Row>
        <Col xs={5}>
          <Card
            bg="Secondary"
            style={{ width: profile_width }}
            key="Secondary"
            className="mb-2"
            text={"dark"}
          >
            
          </Card>
        </Col>

        <Col>
          <Card>
            <Card.Body>
              <Card.Title>below section</Card.Title>

              <Card.Text>Biometric</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
