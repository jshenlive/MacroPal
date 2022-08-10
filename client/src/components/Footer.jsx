import React from "react";
import { Container, Image, Row } from 'react-bootstrap';
import "../App.scss";

export default function Footer () {
  return (
    <Container>
      <Row>
        <footer className="footer mt-auto">
          <div>	Copyright &copy; FitPal All rights reserved</div>
          <div>Resources</div>
          <div>About Us</div>
          <div>
            <Image className="mx-2" src="/assets/media/images/youtube-icon.png" alt="Youtube"></Image>
            <Image  className="mx-2" src="/assets/media/images/instagram-icon.png" alt="Instagram"></Image>
            <Image  className="mx-2" src="/assets/media/images/twitter-icon.png" alt="Twitter"></Image>
            <Image  className="mx-2" src="/assets/media/images/faceboon-icon.png" alt="Facebook"></Image>
          </div>
        </footer>
      </Row>
    </Container>
  );
}