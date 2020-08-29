import React, { Component } from 'react';
import axios from 'axios';
import './App.css';
import MatButton from './components/MatButton';
import MatInput from './components/MatInput';
import MatTextarea from './components/MatTextarea';
import MatDropdown from './components/MatDropdown';
import MatRadioBox from './components/MatRadioBox';
import MatMultiSelect from './components/MatMultiSelect';
import MatNotificationDot from './components/MatNotificationDot';
import MatTag from './components/MatTag';
import MatMultiValues from './components/MatMultiValues';




import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


const fetchData = () => {
  axios.get('/api/activities') // You can simply make your requests to "/api/whatever you want"
  .then((response) => {
    // handle success
    console.log(response.data) // The entire response from the Express API

    // console.log(response.data) // Just the message
    // this.setState({
    //   message: response.data[0].name
    // });
  }) 
};

fetchData();



export default function App(props) {
  return(
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/MatButton">MatButton</Link>
            </li>
            <li>
              <Link to="/MatInput">MatInput</Link>
            </li>
            <li>
              <Link to="/MatTextarea">MatTextarea</Link>
            </li>
            <li>
              <Link to="/MatDropdown">MatDropdown</Link>
            </li>
            <li>
              <Link to="/MatRadioBox">MatRadioBox</Link>
            </li>
            <li>
              <Link to="/MatMultiSelect">MatMultiSelect</Link>
            </li>
            <li>
              <Link to="/MatNotificationDot">MatNotificationDot</Link>
            </li>
            <li>
              <Link to="/MatTag">MatTag</Link>
            </li>
            <li>
              <Link to="/MatMultiValues">MatMultiValues</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/MatButton">
            <MatButton variant="contained" href="#" startIcon="SaveIcon" >Push me</MatButton>
          </Route>
          <Route path="/MatInput">
            <MatInput required={true} label="Name" variant="filled"/>
          </Route>
          <Route path="/MatTextarea">
            <MatTextarea />
          </Route>
          <Route path="/MatDropdown">
            <MatDropdown label="Skill Level" field="Please Select Skill Level" options={['beginner', 'intermediate', 'advanced']}/>
          </Route>
          <Route path="/MatRadioBox">
            <MatRadioBox options={["mon", "tues", "wed"]} category="days"/>
          </Route>
          <Route path="/MatMultiSelect">
            <MatMultiSelect items={[1,2,3,4]} />
          </Route>
          <Route path="/MatNotificationDot">
            <MatNotificationDot new_messages="3"/>
          </Route>
          <Route path="/MatTag">
            <MatTag tag="Outdoor"/>
          </Route>
          <Route path="/MatMultiValues">
            <MatMultiValues />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}


// function Home() {
//   return <h2>Home</h2>;
// }

// function MatButton() {
//   return <MatButton>push me</MatButton>;
// }

// function MatInput() {
//   return <MatInput></MatInput>;
// }







