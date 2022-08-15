import React from "react";
import Loading from './Loading';
import '../App.scss'

export default function Main (props) {

  return (
    <>
      <header className="header-body">
        <div className="d-flex flex-column justify-content-center w-100 h-100">
          <div className="d-flex flex-column justify-content-center align-items-center">
            <Loading/>
            <h1 className="fw-light text-white m-0">If You're Tired Of Starting Over, Stop Giving Up...</h1>
            <h5 className="fw-light text-white m-0">— FitPal - Live Healthy —</h5>
          </div>
        </div>
      </header>
    </>
  );
}