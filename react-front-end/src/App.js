import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import Button from './components/Button';

// class App extends Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       message: 'Click the button to load data!'
//     }
//   }

//   fetchData = () => {
//     axios.get('/api/users') // You can simply make your requests to "/api/whatever you want"
//     .then((response) => {
//       // handle success
//       console.log(response.data) // The entire response from the Express API

//       console.log(response.data.message) // Just the message
//       this.setState({
//         message: response.data[0].name
//       });
//     }) 
//   }

//   render() {
//     return (
//       <div className="App">
//         <h1>{ this.state.message }</h1>
//         <button onClick={this.fetchData} >
//           Fetch Data
//         </button>        
//       </div>
//     );
//   }
// }



export default function App(props) {
  return(
    <Button />
  )
}
