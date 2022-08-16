import React, { Component } from "react";
const PopUp= (props)=> {

  // const handleClick = () => {
  //  props.toggle();
  // };
  return (
    <div className="popup-box">
      <div className="box">
        <span className="close-icon" onClick={props.handleClose}>x</span>
        {props.content}
      </div>
    </div>
  );

}
export default PopUp;