import Axios from "axios";
import React, { useState, useLayoutEffect } from "react";
import WorkoutEdit from './WorkoutEdit';
import WorkoutAdd from './WorkoutAdd';
import Loading from "./Loading";

export default function Workout (props) {

  //Show either: 2 workout add(if no workouts exist) - 1 Add workouts 0-loading page
  const [workoutExists, setWorkoutExists] = useState(0);

    const CheckDayWorkoutExists = async() => {

      //get workout data for a user
      const response = await Axios.get(`/api/workouts/user/${props.state.user.id}`);

      //loading page delay
      setTimeout(() => {

        if (response.data.length > 0) {
  
          setWorkoutExists(1);
        }
  
        if (response.data.length === 0) {
  
          setWorkoutExists(2);
        }

      }, 600)
        
      }

      
    useLayoutEffect(() => {

      CheckDayWorkoutExists()

    }, [props.state])




  return (
    <>
    {(workoutExists === 1) &&  <WorkoutEdit />}
    {(workoutExists === 0) &&  <Loading />}
    {(workoutExists === 2) &&  <WorkoutAdd state={props.state}/>}
    </>
  );

}
