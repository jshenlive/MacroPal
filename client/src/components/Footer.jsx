import React from "react";
import Container from 'react-bootstrap/Container';
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row';
import "./Footer.scss";

export default function Footer () {
  return (
    <Container>
      <Row>
        <footer className="footer mt-auto">
          <div>	Copyright &copy; FitPal All rights reserved</div>
          <div>Resources</div>
          <div>About Us</div>
          <div>
            <Image src="./instagram-icon.png" alt="Youtube"></Image>
            <Image src="./instagram-icon.png" alt="Instagram"></Image>
            <Image src="./instagram-icon.png" alt="Twitter"></Image>
            <Image src="./instagram-icon.png" alt="Facebook"></Image>
          </div>
        </footer>
      </Row>
    </Container>
  );
}