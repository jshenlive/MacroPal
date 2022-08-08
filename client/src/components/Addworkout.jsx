// import React from "react";
// import axios from 'axios';
// import { Typeahead } from 'react-bootstrap-typeahead';
// import Container from 'react-bootstrap/Container';
// import Row from 'react-bootstrap/Row';
// import Col from 'react-bootstrap/Col';
// import Form from 'react-bootstrap/Form';
// import FloatingLabel from 'react-bootstrap/FloatingLabel';
// import Button from 'react-bootstrap/Button';
// import 'react-bootstrap-typeahead/css/Typeahead.css';

// //Unit change// 
// //Axios call by user id: User weight is needed
// // if user chooses English units the unit should change to LB in state
// // user weight is recalculated to lb and isShown,


// //typehead request -> get activities + activity id from backend / user selects
// //setactivity = activity , setminutes = minutes
// // activity + minutes + userweight = calories burnt
// //add button -> Axios post request ->
// //  user/id (object with activity_id, calorie burnt) + date and time


// export default class Addworkout extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       selected_workout: '',
//       weight: '76',
//       unit: { weightUnit: 'KG' },
//     };
//     this.handleInputChange = this.handleInputChange.bind(this);
//     this.handleSubmit = this.handleSubmit.bind(this);
//   }

//   handleInputChange(event) {
//     this.setState({
//     })
//   }

//   handleSubmit = (event) => {
//       event.preventDefault();

//       axios
//       .post(
//         "/api/users",
//         {"user": this.state}
//       )
//       .then((response) => {
//         console.log(response);
//       })
//       .catch((error) => {
//         console.log(error);
//       });

//     };


//   // getCalories = (minutes, activity, weight) => {
//   //   minutes+
//   // }
  
//     render() {

//       return(
//         <>
//           <Col>       
//               <div className="workout-title mt-5">
//                 Calculate How Many Calories You're Burning
//               </div>   
//               <br/>
//               <div className="workout-topic">
//                 Choose Your Activity
//               </div>   
//               <Typeahead
//               multiple
//               onChange={this.handleInputChange}
//               options={[]}
//               selected={this.state.selected}
//               />
//               <Row>
//                 <Col>
//                   <Form.Group className="mt-2">
//                     <FloatingLabel
//                     controlId="floatingInput"
//                     label="Enter Duration (Minutes)"
//                     className="mb-3"
//                     >
//                       <Form.Control 
//                       type="text"
//                       name= "duration"
//                       value={this.state.first_name}
//                       onChange={this.handleInputChange}
//                       placeholder="Enter Duration"
//                       />
//                     </FloatingLabel>
//                   </Form.Group>
//                 </Col>
//                 <Col>
//                 <Form.Control 
//                       type="text"
//                       className="mt-2"
//                       placeholder={`Your Weight: ${this.state.weight} ${this.state.unit.weightUnit}`}
//                       readOnly
//                       />
//                   <div key="inline-radio" className="mb-3">
//                   <Form.Check
//                     inline
//                     label="English"
//                     name="unit"
//                     type="radio"
//                     id="inline-radio-1"
//                   />
//                   <Form.Check
//                     inline
//                     label="Metric"
//                     name="unit"
//                     type="radio"
//                     id="inline-radio-2"
//                     checked
//                   />
//                 </div>
//                 </Col>
//               </Row>

//             <Button className="mt-2" variant="info" type="submit">
//               Calculate
//             </Button>
//             </Col>
//         </>
//       );
//     }

// }