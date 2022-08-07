import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import './Login.scss'

export default function BasicExample() {
  return (
    <Container fluid>
      <Row> </Row>
      <Row className="mt-5 mb-5">
        <Col></Col>
        <Col >
        <Form>
          <div className="loginText">
            PLease log in to continue...
          </div>
          <Form.Group className="mb-2" controlId="formBasicEmail">
            <Form.Label>Email address</Form.Label>
            <Form.Control type="email" placeholder="Enter email" />
            <Form.Text className="text-muted">
              We'll never share your email with anyone else.
            </Form.Text>
          </Form.Group>

          <Form.Group className="mb-2" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" />
          </Form.Group>
          <Button className="mt-2" variant="info" type="submit">
            Submit
          </Button>
        </Form>
        </Col>
        <Col></Col>
      </Row>
      <Row> </Row>
    </Container>
  );
}