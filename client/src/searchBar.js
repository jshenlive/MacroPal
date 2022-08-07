// import axios from 'axios';
// import React, {useState} from 'react'


//  const searchBar = () => {
//   const [searchInput, setSearchInput] = useState("");
//   const [exercises, setExercises] = useState([]);

//  const handleChange = (e) => {
//    e.preventDefault();

//    axios.get('/api/exercises').then((response)=>{
//     console.log(response.data);
//     setSearchInput(e.target.value);
//     if (searchInput.length > 0) {
//       response.data.filter((exercise) => {
//       return setExercises((prev)=> [...prev, ...exercise.name.include(searchInput)]);
//   });
//   }
//    })
//  };
 
//  return <div>
//  <input
//     type="search"
//     placeholder="Search here"
//     onChange={handleChange}
//     value={searchInput} />
//  <table>
//    <tr>
//      <th>Exercises</th>
//    </tr>
//  {exercises.map((exercise, index) => {
//   return(
//  <div>
//    <tr>
//      <td>{index}</td>
//      <td>{exercise.name}</td>
//    </tr>
//  </div>)
//  })}
//  </table>
//  </div>
//  };
//  export default searchBar;
 