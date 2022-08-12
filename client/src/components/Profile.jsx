import React from "react";
import './loading.scss';
import { Container, Row, Col, Card, Figure, Badge, Button } from 'react-bootstrap';



export default function Profile(props) {

  console.log('props.state.user', props.state.user);

  // if (props.state.user) {

  //   setTimeout(() => window.location.reload(false),750);

  //   return(
      
  //   <Container>
  //     <div className="loading">
  //       <p className="loading">F</p>
  //       <p className="loading">I</p>
  //       <p className="loading">T</p>
  //       <p className="loading">P</p>
  //       <p className="loading">A</p>
  //       <p className="loading">L</p>
  //     </div>
  //   </Container>
  //   );
  // }
 
  return (
    <Container className="mt-5">


        
          <Row>

            <Col xs={2} >
              <Card 
              bg="Secondary"
              style={{ width: '13rem' }}
              key="Secondary"
              className="mb-2"
              text={"dark"}
              >
                <Card.Body>
                  <Card.Title>{props.state.user && props.state.user.first_name} {props.state.user && props.state.user.last_name}</Card.Title>

                  <Figure>
                    <Figure.Image
                      width={171}
                      height={180}
                      alt="171x180"
                      src={props.state.user.avatar_url}
                    />
                  </Figure>

                  <Card.Text>

                    <Badge bg="warning">New User</Badge>

                  </Card.Text>

                </Card.Body>
              </Card>

            </Col>

            <Col xs={10} >

            <Card >
              
              <Card.Body>
  
                    <Card.Title>Top section</Card.Title>
  
                    <Card.Text>User 
  
                    Biometric
  
                    </Card.Text>
  
                  </Card.Body>
                
              </Card>

            </Col>

          </Row>

          <Row>

            <Col xs={3}>

            <Card 
              bg="Secondary"
              style={{ width: '20rem' }}
              key="Secondary"
              className="mb-2"
              text={"dark"}
              >
                <Card.Body>
                  <Card.Title>User Information</Card.Title>


                    <Row>
                      
                    <Col>
                    <span>Username: {props.state.user && props.state.user.username}</span>
                    <br/>
                    <span>Email: {props.state.user && props.state.user.email}</span>
                    <br/>
                    <span>Age: {props.state.user && props.state.user.age}</span>
                    <br/>
                    <span>Weight: {props.state.user && props.state.user.weight_kg}</span>
                    <br/>
                    <span>Height: {props.state.user && props.state.user.height_cm}</span>
                    <br/>
                    <span>City: {props.state.user && props.state.user.city}</span>
                    <br/>
                    <span>Province: {props.state.user && props.state.user.province}</span>
                    <br/>
                    <span>Country: {props.state.user && props.state.user.country}</span>
                    <br/>
                    </Col>

                  <Button className="mt-2" variant="outline-info">Edit</Button>

                    </Row>


                </Card.Body>
              </Card>

            </Col>

            <Col>

            <Card >
              
              <Card.Body>
  
                    <Card.Title>
                      below section
                    </Card.Title>
  
                    <Card.Text>
  
                    Biometric
  
                    </Card.Text>
  
                  </Card.Body>
                
              </Card>

            </Col>

          </Row>

     </Container>
  );

}