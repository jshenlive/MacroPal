import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import Login from "./Login";
import './Main.css'
import { propTypes } from "react-bootstrap/esm/Image";

export default function Main (props) {

  return (
    <>
    <Navbar state={props.state}/>
      <header class="header-body">
        <div class="d-flex flex-column justify-content-center w-100 h-100">
          <div class="d-flex flex-column justify-content-center align-items-center">
            <h1 class="fw-light text-white m-0">Fitness starts with how you live.</h1>
            <h5 class="fw-light text-white m-0">— FitPal - Live Healthy —</h5>
          </div>
        </div>
      </header>
    <Footer />
    </>
  );
}