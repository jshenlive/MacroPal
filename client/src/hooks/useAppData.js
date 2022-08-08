import { useState, useEffect } from "react";
import Axios from "axios";

export default function useAppData() {
  const [state, setState] = useState(
    {
      
    }
  );


  return {
    state,
  }
}