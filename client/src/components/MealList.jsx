import Axios from "axios";
import React, { useState, useEffect, } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';


export default function MealList (props) {


  return (
    <Container className="mt-5">

      <Row className="mb-5 text-center">
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
