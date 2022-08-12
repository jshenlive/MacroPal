import Axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import WorkoutEdit from './2';
import WorkoutAdd from './Workout';
import Loading from "./Loading";

export default function Workout (props) {

  //Show either: 2 workout add(if no workouts exist) - 1 Add workouts 0-loading page


    const CheckDayWorkoutExists = async() => {

      //get workout data for a user
      const response = await Axios.get(`/api/workouts/user/${props.state.user.id}`);

        
      }


    useLayoutEffect(() => {

      CheckDayWorkoutExists()

    }, [props.state])




  return (
    <>
    <WorkoutEdit />

    </>
  );

}
