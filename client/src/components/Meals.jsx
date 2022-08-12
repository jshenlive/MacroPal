import Axios from "axios";
import React, {useState, useEffect} from "react";
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';

export default function Meals (props) {

  const[query, setQuery] = useState({
    name: "",
    amount: 0,
    category: "",
    health: "",

  })

  //food query input
  const [queryFoodName, setQueryFoodName] = useState("");
  const [queryFoodAmount, setQueryFoodAmount] = useState(100);
  const [queryCategory, setQueryCategory] = useState("");
  const [queryHealth, setQueryHealth] = useState("");
  const [queryMealType, setQueryMealType] = useState("");
  const [queryResults, setQueryResults]= useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [itemsToShow,setItemsToShow] = useState(5)
  
  
  // Axios.get("/api/workouts/1").then((response)=>{
  //   console.log(response.data.exercises[1])
  // })
  

  const fetchFood = async () => {
    setIsLoading(true);

    console.log(queryFoodName)

    await Axios.post("/api/get_food",{"name": queryFoodName, "category": queryCategory, "health": queryHealth}).then((response)=>{
      setQueryResults(response.data)
      
    }).then(setIsLoading(false))
  }

  //to clear form input
  const reset = () => {
    setQueryFoodName("");
    setQueryFoodAmount(100);
    setQueryCategory("");
    setQueryHealth("");
  }

  const search = () => {    
    fetchFood(); 
    reset();
  }

  const saveMeal = ()=>{

  }

  const showResults = ()=>{
  }

  const healthOption=()=>{
    if (queryCategory === "generic-meals") {
      return (
        <>
        <label>Choose Optional Health-type:</label>
        <br></br>
        <select name="selectList" id="selectList" onChange={(event)=> setQueryHealth(event.target.value)} >
          <option value=""></option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="tree-nut-free">Tree Nuts Free</option>
          <option value="gluten-free">Gluten Free</option>
          <option value="dairy-free">Dairy Free</option>
          <option value="low-sugar">Low Sugar</option>
          <option value="low-fat-abs">Low Fat</option>
          <option value="keto-friendly">Keto Friendly</option>
          <option value="paleo">Paleo</option>
        </select>
        <p></p>
        </>
      )
    }
  }

  const searchResults = () => {
    return(
    <>
    <h3>Search Results</h3> 
    <br></br>
    {isLoading && <h2>Loading...</h2>}
    {console.log(queryResults)}
    {queryResults.slice(0, itemsToShow).map(item=>{
        return (
          <div key={item.id}>
            <h3>{item.name}</h3>
                        
            Calories: {item.calories}
            Protein: {item.protein}
            Carbs: {item.carbs}
            Fats: {item.fat}

            <select name="mealType" id="mealType" onChange={(event)=> setQueryMealType(event.target.value)} >
              <option value="">Meal Type</option>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snacks</option>
            </select>
            <button>Add</button>
          </div>
        )
      })}
    </>
    )
  }

  const daySummary = () => {
    return(
    <>
    <h3>Day Summary</h3>
    <ul>
      <li>Breakfast            <p></p></li>
      <li>Lunch            <p></p></li>
      <li>Dinner            <p></p></li>
      <li>Snacks            <p></p></li>
    </ul> 
    <p></p>
    <h5>Total calories intake:</h5>
    <p></p>
    <Button onClick={() => saveMeal()}>
              Save Meal Plan
    </Button>
    </>
    )
  }

  function showMore() {
    setItemsToShow(prev=>prev+5)
  }

  function showMoreBtn(e) {

    return (
      <button style={{marginBottom:"120px"}} className="btn btn-primary" onClick={()=>showMore()}>
      Show More
      </button>
      )
  }

  return (

    <Container>
      <p></p>
      <Row>
        <Col>
          <form autoComplete="off" onSubmit={(event)=> event.preventDefault()}>
          <h3>Add Food Intake Here</h3>
            <label>Search Food name:</label>
            <br></br>
            <input
              name="foodName"
              type="text"
              placeholder="ie. apple pie..."
              value={queryFoodName}
              onChange={(event)=> setQueryFoodName(event.target.value)}
            />
            <p></p>

            <label>Choose Food Category:</label>
            <br></br>
            <select name="selectList" id="selectList" onChange={(event)=> setQueryCategory(event.target.value)} >
              <option value="generic-foods">Generic foods</option>
              <option value="generic-meals">Generic meals</option>
              <option value="packaged-foods">Packaged foods</option>
              <option value="fast-foods">Fast foods</option>
            </select>

            <p></p>

            {healthOption()}
  

            <label>Enter intake amount (in Grams):</label>
            <br></br>
            <input
              name="foodAmount"
              type="number"
              placeholder="in grams..."
              value={queryFoodAmount}
              onChange={(event)=> setQueryFoodAmount(event.target.value)}
            />
            
            <p></p>
            <Row>
            <Col>
            <Button onClick={() => reset()}>
              Reset
            </Button>
            </Col>
            <Col>
            <Button onClick={() => search()}>
              Search
            </Button>
            </Col>
            </Row>
      
          </form>
      </Col>
      <Col>
        <form>     
          {daySummary()}
        </form>

      </Col>
    </Row>
    <p></p>
    <p></p>
    <Row>
      <form>     
        {searchResults()}
        <p></p>
        
      </form>
    </Row>
    <Row>
    {(queryResults.length>5) && showMoreBtn()}
      {/* <p style={{marginBottom:'120px'}}></p> */}
    </Row>
    </Container>
  );
  
}