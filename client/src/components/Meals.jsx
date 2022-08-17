import Axios from "axios";
import React, {useState, useEffect, Fragment} from "react";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import '../App.scss'
import { Navigate } from "react-router";

export default function Meals (props) {


  //food query input
  const [queryFoodName, setQueryFoodName] = useState("");
  const [queryFoodAmount, setQueryFoodAmount] = useState(1);
  const [actualFoodAmount, setActualQueryFoodAmount] = useState(0);
  const [queryCategory, setQueryCategory] = useState("");
  const [queryHealth, setQueryHealth] = useState("");
  const [queryMealType, setQueryMealType] = useState("1breakfast");
  const [queryResults, setQueryResults]= useState([])
  const [isLoading, setIsLoading] = useState(false);
  const [itemsToShow,setItemsToShow] = useState(5)
  const [cart, setCart] = useState([])
  const [mealSaved, setMealSaved] = useState(false)
  // const [foodType, setFoodType] = useState([])
  const [amountOption, setAmountOption] = useState("servings")
  // const [typeNotSelected, setTypeNotSelected] = useState(true)
  const [totalCartCalories, setTotalCartCalories] = useState(0)
  // Axios.get("/api/workouts/1").then((response)=>{
  //   console.log(response.data.exercises[1])
  // })

  console.log(props)

  let navigate = useNavigate()

  const fetchFood = async () => {
    setIsLoading(true);

    console.log(queryFoodName)

    await Axios.post("/api/get_food",{"name": queryFoodName, "category": queryCategory, "amount_type":amountOption, "health": queryHealth}).then((response)=>{
      setQueryResults(response.data)  
      console.log("search results",queryResults)
    }).then(setIsLoading(false))

  }

  const fetchCart = () => {
    Axios.get('/api/food_carts')
        .then((response) => {
          console.log("after add food",response.data)

          let data = response.data.sort((a,b)=>{
            let fa = a.food_type
            let fb = b.food_type

            if (fa < fb) {
            return -1;
            }
            if (fa > fb) {
                return 1;
            }
            return 0;})
          console.log("data",data)

          setCart(response.data);
          let totals = 0
          response.data.forEach(item=>
            totals += item.food.calories*item.food_amount / 100 
            // console.log(item.food.calories))
          )
          setTotalCartCalories(totals);
        })
        .catch((error) => {
          console.log(error);
        })
  }

  const saveMeal = ()=>{

    const date = new Date();
    const currDate = `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()}`

    // console.log(props.state.user.id)
    Axios.post("/api/meals",{"user_id": props.state.user.id, "date": currDate})
    .then(()=>
      setMealSaved(true)
    ).catch((e)=>{
      console.log(e)
    })
  }
  
  useEffect(()=>{
    fetchCart()
  },[mealSaved]) 

  useEffect(()=>{
    setQueryResults([])
    if(amountOption === "servings"){
      setQueryFoodAmount(1)
    }else if (amountOption === "whole"){
      setQueryFoodAmount(1)
    }else{
      setQueryFoodAmount(100)
    }
  },[amountOption])

  const addFood = (id,amount) => {
    const food_id = id
    const food_amount = amount
    console.log("food_id", food_id)
    console.log("food_amount", food_amount)

    

      // async function to post the exercise object to backend
      return Axios.post('/api/food_carts/add_food', {"food_id": food_id, "food_amount": food_amount, "meal_type": queryMealType })
      .then((response) => {
        //get cart(list of exercises added) data after an exercise is added,set the state of cart
        //in future rmove and add a state instead
        return fetchCart()
      }).catch((error) => {
        console.log(error);
      });
  }

  //to clear form input
  const reset = () => {
    setQueryResults([]);
    setMealSaved(false);
    setQueryFoodName("");
    setQueryFoodAmount(1);
    setQueryCategory("");
    setQueryHealth("");
    setQueryMealType("1breakfast")
  }

  const menuDropDown = ()=>{
    return(
  <Form.Select name="mealType" id="mealType" onChange={(event)=>{setQueryMealType(event.target.value)}}>
      <option>Select Meal Type</option>
      <option value="1breakfast">Breakfast</option>
      <option value="2lunch">Lunch</option>
      <option value="3dinner">Dinner</option>
      <option value="4snack">Snacks</option>
    </Form.Select>)}

  const healthOption=()=>{
    if (queryCategory === "generic-meals") {
      return (
        <>
        <label>Choose Health-type:</label>
        <br></br>
        <select name="healthList" id="healthList" onChange={(event)=> setQueryHealth(event.target.value)} >
          <option value="">Optional</option>
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

  const foodAmountOption = ()=>{

    // if(amountOption === "grams"){

    return(
      <>
      <input
      size="sm"
       className="numeric-input form-control"
       name="foodAmount"
        type="number"
        placeholder="in Grams..."
        value={queryFoodAmount}
        onChange={(event)=> setQueryFoodAmount(parseInt(event.target.value))}
       />
        <p></p>
      </>
    )
  // }
    // else{
    //   return(
    //     <>
    //     <input
          
    //       name="foodAmount"
    //       type="number"
    //       placeholder="in Servings..."
    //       value={queryFoodAmount}
    //       onChange={(event)=> setQueryFoodAmount(parseInt(event.target.value))}
    //     />
        
    //     <p></p>
    //   </>

    //   )
    // }
  }

  const searchResults = () => {
    let is_branded = false;
    if (queryCategory === "packaged-foods" || queryCategory === "fast-foods")
      is_branded = true;

    
    let amountType = "" 
    if (amountOption === "whole"){
      amountType = " Whole"
    } else if (amountOption === "servings"){
      amountType = " Serving"
      if (queryFoodAmount>1)
        amountType += "s"
    } else {      
      amountType = " gram"
      if (queryFoodAmount>1)
        amountType += "s"
    }

    return(
      <Form className="app-section input-section" >
        <div className="app-header-bar">Search Results { queryResults.length > 0 && ("for "+queryFoodAmount + " "+ amountType +" of "+ capitalize(queryFoodName))}</div>
        <br></br>
        {isLoading && <h2>Loading...</h2>}
        {queryResults.slice(0, itemsToShow).map(item=>{
        let amount = 0
        if (amountOption === "whole" || amountOption === "servings"){
           amount = item.grams_per_serving * queryFoodAmount
        } else {
          amount = queryFoodAmount
        }
        
        return (
          <div className="food-items" key={item.id+1}>
            <b>{item.name}</b> &nbsp;({Math.round(item.grams_per_serving)} grams)

            <Row>  
            {is_branded && <Col>{"Brand: " + item.brand + ""}</Col>}
              <Col>       
            Calories: {Math.round(item.calories / 100 * amount)}
            </Col> 
            <Col> 
            Protein: {(item.protein / 100 * amount).toFixed(2)}
            </Col> 
             <Col> 
            Carbs: {(item.carbs / 100 * amount).toFixed(2)}
            </Col> 
            <Col> 
            Fats: {(item.fat / 100 * amount).toFixed(2)}
            </Col> 
            <Col> 
            <Button className="btn-info" onClick={()=>addFood(item.id,amount)} >Add to meal</Button>
            </Col> 
            </Row>
          </div>
        )
      })}
      </Form>

    )
  }


  const daySummary = () => {
    const titled = {titled1:false, titled2:false, titled3:false, titled4: false}
    
    return(
      <>
      <Form className="info-section-text app-section input-section" >
        <div className="app-header-bar">Currently Added</div>

        {cart.map(item=>{
            let itemCalories = item.food.calories / 100 * item.food_amount

            const showItem = (titledid)=>{
              let title = ""
              if(!titled[titledid]){
                titled[titledid] = true;
                title = item.food_type.slice(1)
              }
              return(
                <Fragment key={item.food.id}>
                <h5 className="info-section-title">{capitalize(title)}</h5>
              <div >
                {Math.round(item.food_amount)} grams of {item.food.name}
                <br></br>
                Calories: {Math.round(itemCalories)} kCal
              </div>
              </Fragment>
              )
            }

              if( item.food_type === "1breakfast") {
                return showItem("titled1")
              } else if( item.food_type === "2lunch"){
                return (
                  showItem("titled2")
                )
              } else if( item.food_type === "3dinner"){
                return (
                  showItem("titled3")
              )
              } else if(item.food_type ==="4snack"){
              return (
                showItem("titled4")
              )} else {
                return "Something went wrong"
              }
            }
          )}

          <p></p>

          <Button className="btn-info" onClick={() => saveMeal()}>
                    Save Meal Plan
          </Button>
          </Form>

          <Form>
            <Card className="background-img card mt-2">
            <Card.Body>
            <div className="animate-charcter info-text">Total calories intake: {Math.round(totalCartCalories)}</div>
            </Card.Body>
            </Card>
            <p></p>
          </Form>
          </>
          )
        }

  const setContinue = () => {
    return(
      <>
      <form>
      <h4>Meal Plan Saved Successful!</h4>
      <Button className="btn-info" onClick={()=>reset()}>Add More</Button>
      <Button className="btn-info" onClick={()=>navigate("/meal-list")}>Meals Summary</Button>
      <Button className="btn-info" onClick={()=>navigate("/profile")}>Profile</Button>

      </form>
      
      </>
    )
  }

  function showMoreBtn() {
    return (
      <button className="btn btn-primary" onClick={()=>setItemsToShow(prev=>prev+5)}>
      Show More
      </button>
      )
  }

  function showLessBtn() {
    return (
      <button style={{marginBottom:"120px"}} className="btn btn-primary" onClick={()=>setItemsToShow(5)}>
      Show Less
      </button>
      )
  }


  function capitalize(str){
    return str.charAt(0).toUpperCase() + str.slice(1);
  }

  return (
    <Container className="container-margins">
      
      <Row>
        
        <Col className="app-section-top" xs={7}>



        <Form className="input-section" autoComplete="off" onSubmit={(event)=> event.preventDefault()}>
            <div className="app-header-bar">Create Meal Plans:</div>
            <br></br>
            <Form.Label>Select Meal Type</Form.Label>
            {menuDropDown()}
            <br></br>
            <Form.Group className="mb-3">

            <Form.Label>Search Food name:</Form.Label>
            <Form.Control 
            name="foodName" 
            type="text" 
            placeholder="ie. apple pie..." 
            onChange={(event)=> setQueryFoodName(event.target.value)}
            onFocus={(event)=> setQueryResults([])}
            />
            </Form.Group>
            <Form.Group className="mb-3">
            </Form.Group>
            <p></p>
            <Form.Label>Choose Food Category:</Form.Label>
            <Form.Select name="selectList" id="selectList" onChange={(event)=> setQueryCategory(event.target.value)} >
              <option value="">Optional</option>
              <option value="generic-foods">Generic foods</option>
              <option value="generic-meals">Generic meals</option>
              <option value="packaged-foods">Packaged foods</option>
              <option value="fast-foods">Fast foods</option>
            </Form.Select>
            <br></br>
            {healthOption()}
            Choose intake
            <br></br>
            <Form.Select size="sm" name="amountList" id="amountList" onChange={(event)=>setAmountOption(event.target.value)} >
              <option value="">Optional</option>
              <option value="servings">per Servings</option>
            <option value="grams">per Grams</option>
            <option value="whole">per Whole</option>
            </Form.Select>
            {foodAmountOption()}
            <Row>
              <Col>
                <Button className="btn-info" onClick={() => reset()}>
                  Reset
                </Button>
              </Col>
              <Col>
                <Button className="btn-info" onClick={() => fetchFood()}>
                  Search
                </Button>
              </Col>
            </Row>
        </Form>


      </Col>
      <Col>
          {cart.length>0 && daySummary()}
          {mealSaved && setContinue()}
      </Col>
    </Row>
    <p></p>
    <p></p>
    <Row>

        {(queryResults.length>0) && searchResults()}
        

    </Row>
    <Row>
    {(queryResults.length>5) && itemsToShow<queryResults.length && showMoreBtn()}
    {(queryResults.length>5) &&itemsToShow>=queryResults.length && showLessBtn()}

    </Row>

    </Container>
    
  );
  
}