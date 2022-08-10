import React from "react";
import { Container, Row, Col, Card, Figure } from 'react-bootstrap';

export default function Profile() {

  return (
    <Container className="mt-5">
      <Row>
        
        <Col xs={4}>
          <div>
            <Card 
              bg="Secondary"
              style={{ width: '16rem' }}
              key="Secondary"
              className="mb-2"
              text={"dark"}
              >
                <Card.Body>
                  <Card.Title>Full Name</Card.Title>

                  <Figure>
                    <Figure.Image
                      width={171}
                      height={180}
                      alt="171x180"
                      src="https://dl.memuplay.com/new_market/img/com.vicman.newprofilepic.icon.2022-06-07-21-33-07.png"
                    />
                  </Figure>

                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>

                </Card.Body>
              </Card>
          </div>
          <div>
            userinfodetails + change
          </div>
        </Col>

        <Col xs={8}>

          <Row>

            <Card >Biometric</Card>

          </Row>

          <Row>

            <Col>
            <div>
              Food
            </div>

            </Col>

            <Col>
            <div>
              Workout
              <Card 
              bg="Secondary"
              style={{ width: '18rem' }}
              key="Secondary"
              className="mb-2"
              text={"dark"}
              >
              <Card.Header>Header</Card.Header>
                <Card.Body>
                  <Card.Title>Card Title </Card.Title>
                  <Card.Text>
                    Some quick example text to build on the card title and make up the
                    bulk of the card's content.
                  </Card.Text>
                </Card.Body>
              </Card>
            </div>
            </Col>

          </Row>

        </Col>
      </Row>
     </Container>
  );

}