import React from "react";
import ReactEcharts from "echarts-for-react"; 

export default function WorkoutChart (props) {  

const trimlable = props.lables.map(item => {
  const string = item.substring(8, 10)
  const number = parseInt(string);
  return number;
})

const lableData = trimlable.sort(function(a, b) {
  return a - b;
});


const option = {
  xAxis: {
    name: "Cal / Duration",
    type: 'category',
    data: lableData,
  },
  
  yAxis: {
    name: "Kcal / Minutes",
    type: 'value'
  },
  series: [
    {
      data: props.calories,
      type: 'bar',
    },
    {
      data: props.duration,
      type: 'bar',
    },
  ]
}; 
return <ReactEcharts option={option}/>;
} 

///greenone duraton