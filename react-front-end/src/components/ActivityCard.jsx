import React, { useEffect, useState } from 'react';
import MatAvatar from './MatAvatar';
import MatButton from './MatButton';
import ParticipantsList from './ParticipantsList';
import axios from 'axios';
import Slide from 'react-reveal/Slide';


export default function ActivityCard(props) {
  
  const [tagName, setTagName] = useState([{},{name: 'outdoor'}]);

  // Set number of players message based on props.currentPlayers and props.numoOfParticipants
  const [playerMessage, setPlayerMessage] = useState('');

  useEffect(() => {
    //fetch the count of how many people have joined an activity to display on the activity card
    const fetchCount = function(id) {
      axios.get(`/api/ap_count?activity_id=${id}`)
      .then((response) => {
        let playerFraction = `${response.data[0].count} / ${props.numOfParticipants}`;
        if (response.data[0].count < props.numOfParticipants) {
          setPlayerMessage(prev => `Looking for ${props.numOfParticipants - response.data[0].count} more (${playerFraction} Filled)`);
        } else if (response.data[0].count >= props.numOfParticipants) {
          setPlayerMessage(prev => 'Filled')
        }
      })
      .catch(err => console.log(err));
    }
    fetchCount(props.id)
  },[props.state.activityParticipants]);


  useEffect(() => {
    // fetch all the tags associated witn a particular activity id
    const fetchTags = function(id) {
      axios.get(`/api/activity_tag_fetch?tags=${id}`)
      .then((response) => {
        //console.log(response);
        setTagName(response.data)
      })
      .catch(err => console.log(err));
    }
    fetchTags(props.id)

  }, []);


  //images to display based on the activites tags 
  const images = {
    spikeball: '../images/spikeball.png',
    tennis: '../images/tennis.jpeg',
    hiking: '../images/hiking.jpeg',
    badminton: '../images/badminton.jpeg',
    golf: '../images/golf.jpeg',
    biking: '../images/biking.jpeg',
    gaming: '../images/gaming.jpeg',
    'ping pong': '../images/pingpong.jpeg',
    billiards: '../images/pool.jpg',
    park: '../images/park.jpeg',
    recreation: '../images/park.jpeg',
    outdoor:'../images/park.jpeg',
    kayak: '../images/kayaking.jpeg',
    ski: '../images/skiing.jpeg',
    snowboarding: '../images/snowboarding.jpeg',
    volleyball: '../images/volleyball.jpeg',
    'bocce ball': '../images/bocce.jpeg',
    spalunking: '../images/spalunking.jpeg',
    'language practice': '../images/globe.jpeg',
    frisbee: '../images/frisbee.jpeg'
  };


  const ask = () => {
    // adds the user to the activity_participants table with a status of pending
    // in the request body pass along: logged in users id, and the id of the activity they are asking to join and the request type of "ask"
    axios.post(`/api/activity_participants`, {user_id: props.state.loggedIn, activity_id: props.id})
    .then(() => {
      props.socket.send({participant_id: props.state.loggedIn , activity_id: props.id, request_type: "ask"});
      props.setState(prev => ({...prev, view: 'browse', refresh: prev.refresh += 1}))
      props.socket.send('update'); // send update to the socket after the state is set to update the users page without needing to refresh 
    })
    .catch(err => console.log(err));
  };

  const message = () => {
    // runs when a user clicks on the "Message Host button"
    // send an 'update' to the socket and changes the view in the app so the chatcard is displayed
    props.socket.send('update');
    props.setState(prev => ({...prev, view: 'chatcard', currentActivityId: props.id, currentChatRecipient: prev.users[prev.activities[props.id - 1].user_id - 1].id }));
  }; 


  const cancel = (userId, activityId) => {
    // cancels a pending request
    // deletes the entry with status 'pending' in the activity participants table 
    // pass along the user_id and activity_id to the backend 
    // update socket to update the users page without needing to refresh 
    axios.delete(`/api/activity_participants?user_id=${userId}&activity_id=${activityId}`)
    .then(() => {
      props.socket.send('update');
      props.setState(prev => { return {...prev, refresh: prev.refresh += 1}})
    })
    .catch(err => console.log(err));
  };


  const remove = (activityId) => {
    // remove the activity from the database 
    axios.delete(`/api/activities?activity_id=${activityId}`)
    .then(() => {
      props.socket.send('update');
      props.setState(prev => { return {...prev, refresh: prev.refresh += 1}})
    })
    .catch(err => console.log(err));
  };


  const statusChange = (userId, activityId, status) => {
    // changes the status of an entry in teh activity participants table, pending--> accepted or accepted--> null
    // don't change the view state since they could be in browse or in joined and we want them to stay where they are

    axios.put(`/api/activity_participants?user_id=${userId}&activity_id=${activityId}&status=${status}`)
    .then(() => {
      props.socket.send('update');
      props.setState(prev => { return {...prev, refresh: prev.refresh += 1}})
    })
    .catch(err => console.log(err))
  };


  const viewChats = () => {
    // updates the view to take the user to the message dashboard 
    props.setState(prev => { return {...prev, view: 'messages'}})
  };


  // determine if participants should be listed under the accepted or pending heading
  let hosted = props.hostId === props.state.loggedIn ? true : false;
  let pending = false;
  let joined = false;
  let filled = playerMessage === 'Filled' ? true : false;
  const filterParticipants = (userId, activityId) => {
    for (let i of props.state.activityParticipants) {
      if (activityId === i.activity_id && userId === i.user_id) {
        if (i.status === 'pending') {
          pending = true;
        }
        if (i.status === 'accepted') {
          joined = true;
        }
      }
    }
  };
  filterParticipants(props.state.loggedIn, props.id);

  // detemine if there are any pending participants for the current activity
  for (let i of props.state.activityParticipants) {
    if (i.activity_id === props.id && i.user_id === props.state.loggedIn && i.status === "pending") {
      props.setPending(true)
    }
  };


  // find an image to display on the activity card based on the tags 
  const findImage = () => {
    for (let [keys, values] of Object.entries(images)) {
      for (let i of props.currentTagNames) {
        if ((keys !== 'outdoor' && keys !== 'recreation') && keys === i) {
          return values
        }
      }
    }
  };

  // ignore these tags when selecting an image
  const filters = [
    'monday', 
    'tuesday', 
    'wednesday', 
    'thursday', 
    'friday', 
    'saturday', 
    'sunday',
    'morning', 
    'daytime', 
    'evening',
    'beginner', 
    'intermediate', 
    'advanced',
    'one time', 
    'weekly', 
    'bi-weekly', 
    'monthly'
  ];

  return (
    <Slide bottom>
    <div>
    {props.state.view === 'browse' && !filled &&
    <article className={pending ? 'pending' : ''}>
      <div>
        <div>
          <img src={findImage() || '../images/park.jpeg'} width="100%"></img>
        </div>
        <div>
          <h3>{playerMessage}</h3>
          <ul>
            {tagName.map(tag => !filters.includes(tag.name) ? <li key={tagName.indexOf(tag)}>{tag.name}</li> : null)}
          </ul>
          <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
        </div>
      </div>
      <div>
      {props.state.view === 'hosted' && <div><MatButton size="small" variant="contained" onClick={() => props.setState(prev => {return {...prev, refresh: props.id, view: 'editform'}})}>Edit</MatButton></div>}
      {pending && <h2 className="request-sent">REQUEST SENT!</h2>}
        <h2>{props.name}</h2>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
        {props.state.view === 'browse' && !pending && !hosted && !joined &&
          <div>
            <MatButton variant="contained" color="primary" onClick={() => ask()}>Ask to Join</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
          </div>
        }
        {joined && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => statusChange(props.state.loggedIn, props.id, "null")}>Leave</MatButton>
          </div>
        }
        {hosted && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => viewChats()}>View Chats</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => remove(props.id)}>Delete</MatButton>
          </div>
        }
        {pending &&
          <div>
          <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
          <MatButton variant="contained" color="secondary" onClick={() => cancel(props.state.loggedIn, props.id)}>Cancel</MatButton>
          </div>
        }
      </div>
    </article>
    }
    {props.state.loggedIn === props.hostId && props.state.view === 'hosted' &&
    <article className={props.pending ? 'pending' : ''}>
      <div>
        <div>
          <img src={findImage() || '../images/park.jpeg'} width="100%"></img>
        </div>
        <div>
          <h3>{playerMessage}</h3>
          <ul>
            {tagName.map(tag => !filters.includes(tag.name) ? <li key={tagName.indexOf(tag)}>{tag.name}</li> : null)}
          </ul>
          <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
        </div>
      </div>
      <div>
      <div><MatButton size="small" variant="outlined" onClick={() => props.setState(prev => {return {...prev, refresh: props.id, view: 'editform'}})} >Edit</MatButton></div>
        <h2>{props.name}</h2>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
          <div>
            <MatButton variant="contained" color="primary" onClick={() => viewChats()}>View Chats</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => remove(props.id)}>Delete</MatButton>
          </div>
      </div>
        <div className="participants-wrapper">
          <ParticipantsList state={props.state} setState={props.setState} activity_id={props.id} cancelFunction={cancel} statusChangeFunction={statusChange}/>
        </div>
    </article>
    }
    {joined && props.state.view === 'joined' &&
    <article className={props.pending ? 'pending' : ''}>
      <div>
        <div>
          <img src={findImage() || '../images/park.jpeg'} width="100%"></img>
        </div>
        <div> 
          <h3>{playerMessage}</h3>
          <ul>
            {tagName.map(tag => !filters.includes(tag.name) ? <li key={tagName.indexOf(tag)}>{tag.name}</li> : null)}
          </ul>
          <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
        </div>
      </div>
      <div>
        <h2>{props.name}</h2>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => statusChange(props.state.loggedIn, props.id, "null")}>Leave</MatButton>
          </div>
      </div>
    </article>
    }
    
    {pending && props.state.view === 'pending' &&
    <article className={'pending'}>
      <div>
        <div>
          <img src={findImage() || '../images/park.jpeg'} width="100%"></img>
        </div>
        <div>
         <h3>{playerMessage}</h3>
          <ul>
            {tagName.map(tag => !filters.includes(tag.name) ? <li key={tagName.indexOf(tag)}>{tag.name}</li> : null)}
          </ul>
          <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
        </div>
      </div>
      <div>
        <h2 className="request-sent">REQUEST SENT!</h2>
        <h2>{props.name}</h2>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="secondary" onClick={() => cancel(props.state.loggedIn, props.id)}>Cancel</MatButton>
          </div>
      </div>
    </article>
    }
  </div>
  </Slide>
  )
};