import { useState } from "react";

export function AppUnits() {

  const [units, setUnits] = useState({
    name: "Metric",
    mass: "KGS",
    height: "CM",
  });

  const setUnitFunction = function(unit) {
    if (unit == "English") {
      setUnits({
        name: "English",
        mass: "LBS",
        height: "Feet Inches",
      });
    }
  
    if (unit == "Metric") {
      setUnits({
        name: "Metric",
        mass: "KGS",
        height: "CM",
      });
    }
  }

  const calculateWeightInLbs = function(weight) {
    const result = weight * 2.205;
    return result.toFixed(2)
  }


  return { units, setUnits, setUnitFunction, calculateWeightInLbs }
}

    
