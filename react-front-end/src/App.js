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
import ActivityList from './components/ActivityList';
import ActivityCard from './components/ActivityCard';
import SubNav from './components/SubNav';
import ActivityForm from './components/ActivityForm';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";
import { Input } from '@material-ui/core';


export default function App(props) {

  const [state,setState] = useState({
    loggedIn: null,
    activities: [],
    filters: [],
    view: 'landing',
    messages: [],
    tags: [],
    activityParticipants: [],
    activityTags: [],
    users: []
  });


  useEffect(() => {
    const promiseOne = axios.get('/api/users');
    const promiseTwo = axios.get('/api/activities');
    const promiseThree = axios.get('/api/activity_participants');
    const promiseFour = axios.get('/api/activity_tags');
    const promiseFive = axios.get('/api/tags');
    const promiseSix = axios.get('/api/messages');

    Promise.all([promiseOne, promiseTwo, promiseThree, promiseFour, promiseFive, promiseSix])
    .then((arrayOfValues) => {
      let [usersData, activitiesData, activityParticipantsData, activityTagsData, tagsData, messagesData] = arrayOfValues;
      setState((prev) => {
        console.log(arrayOfValues);

        return ({...prev, users: usersData.data,
        activities: activitiesData.data,
        activityParticipants: activityParticipantsData.data,
        activityTags: activityTagsData.data,
        tags: tagsData.data,
        messages: messagesData.data
        })
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }, []);


  return(
    <Fragment>
    <NavBar loggedIn={state.loggedIn} setState={setState} state={state}/>
    <Login setState={setState} state={state} />
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
            <li>
              <Link to="/ActivityCard">ActivityCard</Link>
            </li>
            <li>
              <Link to="/ActivityList">ActivityList</Link>
            </li>
            <li>
              <Link to="/SubNav">SubNav</Link>
            </li>
            <li>
              <Link to="/ActivityForm">ActivityForm</Link>
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
          <Route path="/ActivityCard">
            <ActivityCard setState={setState} state={state} />
          </Route>
          <Route path="/ActivityList">
            <ActivityList setState={setState} state={state} />
          </Route>
          <Route path="/SubNav">
            <SubNav setState={setState} state={state} />
          </Route>
          <Route path="/ActivityForm">
            <ActivityForm setState={setState} state={state} />
          </Route>
        </Switch>
      </div>
    </Router>
    <Footer />
    </Fragment>
  )
}







