import React, { Fragment, Component, useState, useEffect } from 'react';
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
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';




import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Input } from '@material-ui/core';


// const fetchData = () => {
//   axios.get('/api/users') // You can simply make your requests to "/api/whatever you want"
//   .then((response) => {
//     // handle success
//     console.log(response.data) // The entire response from the Express API

//     console.log(response.data) // Just the message
//     setState({
//       ...state,
//       users: response.data
//     });
//   }) 
// };

// fetchData();




export default function App(props) {

  const [state,setState] = useState({
    loggedIn: null,
    activities: [],
    activityDisplay: [],
    filters: [],
    view: 'landing',
    messages: [],
    users: []
  });


  useEffect(() => {
    const fetchData = () => {
      axios.get('/api/users') // You can simply make your requests to "/api/whatever you want"
      .then((response) => {
        // handle success
        console.log(response.data) // The entire response from the Express API

        setState((prev) => {
          return {...prev, users: response.data};
        });
      })
    };
    
    fetchData();
  },[])





  return(
    <Fragment>
    <NavBar loggedIn={state.loggedIn} />
    <Login users={state.users} setState={setState} state={state} />
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
            <MatDropdown label="Skill Level" field="Please Select Skill Level" options={['beginner', 'intermediate', 'advanced']} varient="filled"/>
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
    <Footer />
    </Fragment>
  )
}







