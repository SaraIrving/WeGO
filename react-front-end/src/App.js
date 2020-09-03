import React, { Fragment, Component, useState, useEffect } from 'react';
import io from 'socket.io-client';
import TextField from '@material-ui/core/TextField'
import axios from 'axios';
import './App.css';
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import SubNav from './components/SubNav';
import ActivityForm from './components/ActivityForm';
import Landing from './components/Landing';
import Signup from './components/Signup';
import ChatCard from './components/ChatCard';
import EditForm from './components/EditForm';
import classNames from 'classnames';

import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
// import { createPalette } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';
import { green } from '@material-ui/core/colors';

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const socket = io.connect('http://localhost:8080', {resource: '/nodejs/socket.io'});
// const socket = io.connect('http://localhost:3000')
// const socket = io('http://localhost', {path: '/nodejs/socket.io'})

const theme = createMuiTheme({
  palette: createPalette({
       primary: { main: '#576D5C' },//{main: '#651FFF'},
       accent: green,
       secondary: { main: '#F7BD02' } // #f85466
 }),
  typography: {
    // Use the custom font instead of the default Roboto font.
    fontFamily: [
      'Lilita One',
      'Roboto',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
  }
});



export default function App(props) {

  const [state,setState] = useState({
    loggedIn: 2,
    activities: [],
    filters: [],
    view: 'chatcard',
    messages: [],
    tags: [],
    activityParticipants: [],
    activityTags: [],
    users: [],
    refresh: 1,
    message: '',
    name: '',
    chat: []
  });

  useEffect(() => {
    socket.on('message', ({message}) => {
      console.log('message received: ', message);
      setState(prev => ({...prev, chat: [...prev.chat, {name: message.name, message: message.message }]}))
    })
  },[])


  const onMessageSubmit = (e) => {
    e.preventDefault()
    const {name, message} = state;
    socket.send({name, message})
    setState(prev => {return {...prev, message: '', name , refresh: prev.refresh+= 1 }})
  }

  const onTextChange = (value, inputName) => {
    console.log('e.target.name: ', inputName)
    setState(prev => { return {...prev, [inputName]: value}})
  }

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
        console.log('axios call');
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
  }, [state.refresh]);

  const login = function(username) {
    
    for (let i of state.users) {
      if (username) {
        setState(prev => { return {...prev, loggedIn: 2, view: 'browse', refresh: prev.refresh += 1 }});
      }
    }
  }


  return(
    <ThemeProvider theme={theme}>
      <NavBar className='navbar' loggedIn={state.loggedIn} setState={setState} state={state} login={login}/>
      <main className="activity-views">
        {state.view === "landing" &&
            <Landing setState={setState} state={state} />
            }
        {state.view === "signup" &&
            <Signup setState={setState} state={state} login={login} />
            }
        {state.view === "login" &&
            <Login setState={setState} state={state} login={login} />
            }
        {state.view === "browse" &&
            <SubNav setState={setState} state={state} />
            }
        {state.view === "joined" &&
            <SubNav setState={setState} state={state} />
            }
        {state.view === "hosted" &&
            <SubNav setState={setState} state={state} />
            }
        {state.view === "pending" &&
            <SubNav setState={setState} state={state} />
            }
        {state.view === "create" &&
            <ActivityForm setState={setState} state={state} />
            }
        {state.view === "messages" &&
            <SubNav setState={setState} state={state} />
            }
        {state.view === "editform" &&
            <EditForm setState={setState} state={state} />
            }
        {state.view === "chatcard" &&
            <ChatCard setState={setState} state={state} onMessageSubmit={onMessageSubmit} onTextChange={onTextChange} />
            }
        </main>
      <Footer />
    </ThemeProvider>
  )
}










{/* <Fragment>
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
//     <Switch>
//       <Route path="/MatButton">
//         <MatButton variant="contained" href="#" startIcon="SaveIcon" color="accent" >Push me</MatButton>
//       </Route>
//       <Route path="/MatInput">
//         <MatInput required={true} label="Name" variant="filled"/>
//       </Route>
//       <Route path="/MatTextarea">
//         <MatTextarea />
//       </Route>
//       <Route path="/MatDropdown">
//         <MatDropdown label="Skill Level" field="Please Select Skill Level" options={['beginner', 'intermediate', 'advanced']} varient="filled"/>
//       </Route>
//       <Route path="/MatMultiSelect">
//         <MatMultiSelect items={[1,2,3,4]} inputLabel="Numbers"/>
//       </Route>
//       <Route path="/MatNotificationDot">
//         <MatNotificationDot new_messages="3"/>
//       </Route>
//       <Route path="/MatTag">
//         <MatTag tag="Outdoor"/>
//       </Route>
//       <Route path="/MatMultiValues">
//         <MatMultiValues setState={setState} state={state} options={["beginner", "intermediate", "advanced"]}/>
//       </Route>
//       <Route path="/ActivityCard">
//         <ActivityCard setState={setState} state={state} />
//       </Route>
//       <Route path="/ActivityList">
//         <ActivityList setState={setState} state={state} />
//       </Route>
//       <Route path="/SubNav">
//         <SubNav setState={setState} state={state} />
//       </Route>
//       <Route path="/ActivityForm">
//         <ActivityForm setState={setState} state={state} />
//       </Route>
//     </Switch>
//   </div>
// </Router>
// <Footer />
// </Fragment> */}



