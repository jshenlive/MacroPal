import React from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import "./Footer.scss";

export default function Footer () {
  return (
    <Container>
      <Row>
        <footer className="footer mt-auto">
          <div>Column 1</div>
          <div>Column 2</div>
          <div>Column 3</div>
          <div>
            <FontAwesomeIcon icon="fa-brands fa-facebook" />
            </div>
        </footer>
      </Row>
    </Container>
  );
}