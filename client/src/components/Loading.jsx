import React from "react";
import './loading.scss';
import { Container } from 'react-bootstrap';

export default function Loading () {

  return (
       <Container>
      <div className="loading">
        <p className="loading">F</p>
        <p className="loading">I</p>
        <p className="loading">T</p>
        <p className="loading">P</p>
        <p className="loading">A</p>
        <p className="loading">L</p>
      </div>
    </Container>
  );
}