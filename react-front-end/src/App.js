import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import axios from 'axios';
import './App.css';

// Components
import NavBar from './components/Navbar';
import Footer from './components/Footer';
import Login from './components/Login';
import SubNav from './components/SubNav';
import ActivityForm from './components/ActivityForm';
import Landing from './components/Landing';
import Signup from './components/Signup';
import ChatCard from './components/ChatCard';
import EditForm from './components/EditForm';

// Creates MUI Theme
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import createPalette from '@material-ui/core/styles/createPalette';

// Establish socket.io connection to work with the proxy
const socket = io.connect('http://localhost:8080', {resource: '/nodejs/socket.io'});

// Create theme for MUI
const theme = createMuiTheme({
  palette: createPalette({
      // Set global theme colours
      primary: { main: '#576D5C' },// 
      secondary: { main: '#F7BD02' } // #f85466
 }),
  // Set global theme fonts
  typography: {
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

// Export main App component
export default function App(props) {

  const [state, setState] = useState({
    loggedIn: null,
    activities: [],
    filters: [],
    view: 'landing',
    messages: [],
    tags: [],
    activityParticipants: [],
    activityTags: [],
    users: [],
    refresh: 1,
    message: '',
    name: '',
    chat: [],
    currentActivityId: 0,
    currentChatRecipient: 0,
    messageNotification: []
  });

  // When someone clicks send message from ChatCard
  const onMessageSubmit = (e) => {
    e.preventDefault()
    // Deconstruct state
    const { name, message, loggedIn, currentChatRecipient, currentActivityId } = state;
    // Send message info through socket to add in db, and update all clients
    socket.send({name, message, loggedIn, currentChatRecipient, currentActivityId, request_type: "newMessage"})
    setState(prev => {return {...prev, message: '', name , refresh: prev.refresh+= 1 }})
  }

  // From ChatCard, sets current message in app state to send through socket
  const onTextChange = (value, inputName) => {
    setState(prev => { return {...prev, [inputName]: value}})
  }

  // Main axios call to retrieve info from db and use to update local state
  useEffect(() => {
    const promiseOne = axios.get('/api/users');
    const promiseTwo = axios.get('/api/activities');
    const promiseThree = axios.get('/api/activity_participants');
    const promiseFour = axios.get('/api/activity_tags');
    const promiseFive = axios.get('/api/tags');
    const promiseSix = axios.get('/api/messages');
    const promiseSeven = (state.loggedIn && state.users[state.loggedIn - 1] !== undefined) ? axios.get(`/api/activitiesSorted?city=${state.users[state.loggedIn - 1].city}`) : axios.get('/api/activities')

    Promise.all([promiseOne, promiseTwo, promiseThree, promiseFour, promiseFive, promiseSix, promiseSeven])
    .then((arrayOfValues) => {
      let [usersData, activitiesData, activityParticipantsData, activityTagsData, tagsData, messagesData, activitiesSortedData ] = arrayOfValues;
      setState((prev) => {
        console.log('axios call');
        return ({...prev, users: usersData.data,
        activities: activitiesData.data,
        activityParticipants: activityParticipantsData.data,
        activityTags: activityTagsData.data,
        tags: tagsData.data,
        messages: messagesData.data,
        activitiesSorted: activitiesSortedData.data
        })
      })
    })
    .catch((error) => {
      console.log(error);
    })
  }, [state.refresh]);

  // Login function
  const login = function(username) {
    for (let i of state.users) {
      if (username.toLowerCase() === i.email) {
          // Fetch users ip
          axios.get('https://api.ipify.org')
          .then((res) => {
            // Fetch users geo with ip
            axios.get(`http://api.ipstack.com/${res.data}?access_key=112f50c4f2e7f7869e3a2f40d9f6b430`) 
            .then((res2) => {
              // Set empty city var
              let tempCity;
              // Check if city is two words (since we were getting 'North Vancouver' instead of 'Vancouver') 
              if (res2.data.city.split(' ').length > 1) {
                // If it is, save second word
                tempCity = res2.data.city.split(' ')[1]
              } else {
                // If not, just save city
                tempCity = res2.data.city
              }
              // Use returned city to perform request to backend, to fetch activities belonging to the city
              axios.get(`/api/activitiesSorted?city=${tempCity}`)
              .then((response) => {
                // Set activitiesSorted with response
                setState(prev => { return {...prev, activitiesSorted: response.data, loggedIn: i.id, view: 'browse', name: prev.users[Number(i.id) - 1].name }});
              })
            })
          })
          .catch((err => console.log(err)));
      }
    }
  }

  // Signup function, very similar to login function
  const signup = function(stateForm) {
    axios.post('/api/users', { stateForm })
    .then((newUser) => {
      axios.get('https://api.ipify.org')
      .then((ip) => {
        axios.get(`http://api.ipstack.com/${ip.data}?access_key=112f50c4f2e7f7869e3a2f40d9f6b430`) /// THIS IS OUR GEO, UNCOMMENT WHEN READY!!
        .then((geoCity) => {
          let tempCity;
          if (geoCity.data.city.split(' ').length > 1) {
            tempCity = geoCity.data.city.split(' ')[1]
          } else {
            tempCity = geoCity.data.city
          }
          axios.get(`/api/activitiesSorted?city=${tempCity}`)
          .then((sortedActivities) => {
            setState(prev => { return {...prev, activitiesSorted: sortedActivities.data, loggedIn: newUser.data[0].id, view: 'browse', name: newUser.data[0].name }});
            axios.get('/api/users')
            .then((users) => {
              // Reset users with newly added user
              setState(prev => { return {...prev, users: users.data}});
            })
          })
        })
      })
    })
    .catch((err) => console.log(err));
  }


  useEffect(() => {
    // Refresh state
    setState(prev => ({...prev, refresh: prev.refresh += 1 }))
    // Recieve socket message from backend
    socket.on('message', (message) => {
      // If message is 'update'
      if (message === 'update') {
        // Refresh state on all clients
        setState(prev => ({...prev, refresh: prev.refresh += 1 }))
      } 
      // If request_type is 'ask'
      if (message.request_type === 'ask') {
            setState(prev => {
              // You're the host of the activity that has the join request
              if (prev.loggedIn === prev.users[prev.activities[message.activity_id - 1].user_id - 1].id) {
                // Refresh state, and add ask to join request
                return { ...prev, refresh: prev.refresh += 1, messageNotification: [...prev.messageNotification, {activity_id: message.activity_id, participant_id: message.participant_id, request_type: message.request_type}] }
              }
              // Otherwise set state to prev
              return prev
            })
          
      }
      // If its a new message request_type
      if (message.request_type === 'newMessage') {

        setState(prev => {
          // If you are the host and the message isn't from you, and you're not currently in the chat with the person sending the message
          if ((prev.view !== 'chatcard' || (prev.view === 'chatcard' && message.currentActivityId !== prev.currentActivityId)) && (prev.loggedIn === message.loggedIn || prev.loggedIn === message.currentChatRecipient)) {
            // you are the host and the message isn't from you
            if ((prev.loggedIn === prev.users[prev.activities[message.currentActivityId - 1].user_id - 1].id) && (prev.loggedIn !== message.loggedIn)) {
              // Set new message notification
              return { ...prev, refresh: prev.refresh += 1, messageNotification: [...prev.messageNotification, {activity_id: message.currentActivityId, participant_id: message.loggedIn, request_type: message.request_type}] }
            }
            // If you're not the host and the message is from the host
            if ((prev.loggedIn !== prev.users[prev.activities[message.currentActivityId - 1].user_id - 1].id) && (prev.users[prev.activities[message.currentActivityId - 1].user_id - 1].id === message.loggedIn)) {
              // Set new message notification
              return { ...prev, refresh: prev.refresh += 1, messageNotification: [...prev.messageNotification, {activity_id: message.currentActivityId, participant_id: message.loggedIn, request_type: message.request_type}] }
            }
          }
          // Refresh state
          return { ...prev, refresh: prev.refresh += 1}
        })
      } 
    })
  }, [])


  return(
    // Wrap everything in theme, then display components based on view
    <ThemeProvider theme={theme}>
      <NavBar className='navbar' loggedIn={state.loggedIn} setState={setState} state={state} login={login}/>
      <main className="activity-views">
        {state.view === "landing" &&
            <Landing setState={setState} state={state} />
            }
        {state.view === "signup" &&
            <Signup setState={setState} state={state} signup={signup} />
            }
        {state.view === "login" &&
            <Login setState={setState} state={state} login={login} />
            }
        {state.view === "browse" &&
            <SubNav setState={setState} state={state} socket={socket}/>
            }
        {state.view === "joined" &&
            <SubNav setState={setState} state={state} socket={socket}/>
            }
        {state.view === "hosted" &&
            <SubNav setState={setState} state={state} socket={socket}/>
            }
        {state.view === "pending" &&
            <SubNav setState={setState} state={state} socket={socket}/>
            }
        {state.view === "create" &&
            <ActivityForm setState={setState} state={state} socket={socket} />
            }
        {state.view === "messages" &&
            <SubNav setState={setState} state={state} socket={socket}/>
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

