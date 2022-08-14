import Axios from "axios";
import React, {useState, useEffect, Fragment} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, FloatingLabel } from 'react-bootstrap';
import { Navigate } from "react-router";

export default function Meals (props) {


  //food query input
  const [queryFoodName, setQueryFoodName] = useState("");
  const [queryFoodAmount, setQueryFoodAmount] = useState(100);
  const [queryCategory, setQueryCategory] = useState("");
  const [queryHealth, setQueryHealth] = useState("");
  const [queryMealType, setQueryMealType] = useState("breakfast ");
  const [queryResults, setQueryResults]= useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [itemsToShow,setItemsToShow] = useState(5)
  const [cart, setCart] = useState([])
  // const [foodType, setFoodType] = useState([])
  const [typeNotSelected, setTypeNotSelected] = useState(true)
  const [totalCartCalories, setTotalCartCalories] = useState(0)
  // Axios.get("/api/workouts/1").then((response)=>{
  //   console.log(response.data.exercises[1])
  // })

  let navigate = useNavigate()
  
  useEffect(()=>{
    Axios.get('/api/food_carts')
    .then((response) => {
      let totals = 0
      console.log("response data", response.data)
      response.data.forEach(item=>
        
        totals += item.food.calories / 100 *item.food_amount
        // console.log(item.food.calories))
      )
      setCart(response.data);
      setTotalCartCalories(totals);
    })
  },[]) 



  const fetchFood = async () => {
    setIsLoading(true);

    console.log(queryFoodName)

    await Axios.post("/api/get_food",{"name": queryFoodName, "category": queryCategory, "health": queryHealth}).then((response)=>{
      setTypeNotSelected(false)
      setQueryResults(response.data)  
    }).then(setIsLoading(false))

  }

  const addFood = (e) => {
    const food_id = e.target.value
    

      // async function to post the exercise object to backend
      return Axios.post('/api/food_carts/add_food', {"food_id": food_id, "food_amount": queryFoodAmount, "meal_type": queryMealType })
      .then((response) => {

        //get cart(list of exercises added) data after an exercise is added,set the state of cart
        //in future rmove and add a state instead

        return Axios.get('/api/food_carts')
        .then((response) => {
          console.log(response.data)
          setCart(response.data);
          let totals = 0
          response.data.forEach(item=>
            totals += item.food.calories / 100 *item.food_amount
            // console.log(item.food.calories))
          )
          setTotalCartCalories(totals);

        })
        .catch((error) => {
          console.log(error);
        })
      }).catch((error) => {
        console.log(error);
      });
  }



  //to clear form input
  const reset = () => {
    setTypeNotSelected(true)
    setQueryFoodName("");
    setQueryFoodAmount(100);
    setQueryCategory("");
    setQueryHealth("");
    setQueryMealType("breakfast")
  }

  const search = () => {    
    fetchFood(); 
  }

  const saveMeal = ()=>{

    // console.log(props.state.user.id)
    Axios.post("/api/meals",{"user_id": props.state.user.id, "date": new Date()})
    .then(()=>
      navigate('/Foodlist')
    ).catch((e)=>{
      console.log(e)
    })
  }


  const menuDropDown = ()=>{
    return(
      <select name="mealType" id="mealType" onChange={(event)=>
      {console.log(event.target.value)
        setQueryMealType(event.target.value)}} >
      <option value="breakfast">Breakfast</option>
      <option value="lunch">Lunch</option>
      <option value="dinner">Dinner</option>
      <option value="snack">Snacks</option>
      </select>)
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

    let is_branded = false;

    if (queryCategory === "packaged-foods" || queryCategory === "fast-foods")
      is_branded = true;

    


    return(
    <>
    <h3>Search Results { queryResults.length > 0 && ('for "'+ queryFoodName +'" with '+ queryFoodAmount + " grams")}</h3> 

    <br></br>
    {isLoading && <h2>Loading...</h2>}
    {/* {console.log(queryResults)} */}
    {queryResults.slice(0, itemsToShow).map(item=>{
        return (
          <div key={item.id+1}>
            <h4>{item.name}</h4>
            <Row>  
            {is_branded && <Col>{"Brand: " + item.brand + ""}</Col>}
              <Col>       
            Calories: {Math.round(item.calories / 100 * queryFoodAmount)}
            </Col> 
            <Col> 
            Protein: {(item.protein / 100 * queryFoodAmount).toFixed(2)}
            </Col> 
             <Col> 
            Carbs: {(item.carbs / 100 * queryFoodAmount).toFixed(2)}
            </Col> 
            <Col> 
            Fats: {(item.fat / 100 * queryFoodAmount).toFixed(2)}
            </Col> 
            <Col> 
            {/* {menuDropDown()} */}

            <Button onClick={(e)=>addFood(e)} value={item.id}>Add to meal</Button>
            </Col> 
            </Row>
          </div>
        )
      })}
    </>
    )
  }

  



  const daySummary = () => {
    let titled1, titled2, titled3, titled4 = false;
    console.log(cart)
    return(
    <>
    <h3>Currently Added</h3>
    
    
    {cart.map(item=>{


        let itemCalories = item.food.calories / 100 * item.food_amount

        const showItem = (title)=>{
          return(
            <Fragment key={item.food.id}>
            <h5>{capitalize(title)}</h5>
          <div >
            {item.food_amount} grams of {item.food.name}
            <br></br>
            Calories: {Math.round(itemCalories)} kCal
          </div>
          </Fragment>
          )
        }

        if( item.food_type === "breakfast") {
          let title = ""
          if(!titled1){
            titled1 = true;
            title = item.food_type
          }
          return (
          showItem(title)
        )} else if( item.food_type === "lunch"){
            let title = ""
            if(!titled2){
              titled2 = true;
              title = item.food_type
            }
          return (
            showItem(title)
          )
        } else if( item.food_type === "dinner"){

          let title = ""
          if(!titled3){
            titled3 = true;
            title = item.food_type
          }
          return (
            showItem(title)
        )
        } else if(item.food_type ==="snack"){
          let title = ""
          if(!titled4){
            titled4 = true;
            title = item.food_type
          }
        return (
          showItem(title)
        )}
        else{
          return {}
        }
      }
    )}

    <p></p>
    <h5>Total calories intake: {Math.round(totalCartCalories)}</h5>
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


  function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (

    <Container>
      <p></p>
      <Row>
        <Col>
          <form autoComplete="off" onSubmit={(event)=> event.preventDefault()}>
          <h3>Create Meal Plans:</h3>
            <label>Select Meal Type</label>
            <br></br>
            {menuDropDown()}
            <p></p>
            <label>Search Food name:</label>
            <br></br>
            <input
              name="foodName"
              type="text"
              placeholder="ie. apple pie..."
              value={queryFoodName}
              onChange={(event)=> setQueryFoodName(event.target.value)}
              onFocus={(event)=> setQueryResults([])}
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