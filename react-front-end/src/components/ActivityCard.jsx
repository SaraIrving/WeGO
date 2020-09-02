import React, { useEffect, useState } from 'react';
import MatAvatar from './MatAvatar';
import MatButton from './MatButton';
import ParticipantsList from './ParticipantsList';
import axios from 'axios';
import classnames from 'classnames';

export default function ActivityCard(props) {
  // Set number of players message based on props.currentPlayers and props.numoOfParticipants

  const [tagName, setTagName] = useState([{},{name: 'outdoor'}]);
  const [playerMessage, setPlayerMessage] = useState('');

  useEffect(() => {

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
    }
    fetchCount(props.id)
  },[]);

  useEffect(() => {
    
    const fetchTags = function(id) {
      axios.get(`/api/activity_tag_fetch?tags=${id}`)
      .then((response) => {
        console.log(response);
        setTagName(response.data)
      })
    }
    fetchTags(props.id)

  });


  // let playerMessage = '';
  // let playerFraction = `${currentPlayers} / ${props.numOfParticipants}`;
  // if (currentPlayers < props.numOfParticipants) {
  //   playerMessage = `Looking for ${props.numOfParticipants - currentPlayers} more (${playerFraction} Filled)`;
  // } else if (props.currentPlayers >= props.numOfParticipants) {
  //   playerMessage = 'Filled'
  // }

  const images = {
    spikeball: '../images/spikeball.png',
    tennis: '../images/tennis.jpeg',
    court: '../images/tennis.jpeg',
    hiking: '../images/hiking.jpeg',
    badminton: '../images/badminton.jpeg',
    frisbee: '../images/frisbee.jpeg',
    golf: '../images/golf.jpeg',
    biking: '../images/biking.jpeg',
    gaming: '../images/gaming.jpeg',
    pinpong: '../images/pingpong.jpeg',
    pool: '../images/pool.jpeg',
    park: '../images/park.jpeg',
    recreation: '../images/park.jpeg',
    outdoor:'../images/park.jpeg',
    kayake: '../images/kayaking.jpeg',
    ski: '../images/skiiing.jpeg'
  }

  const ask = () => {
    // adds the user to the activity_participants table with a status of pending 
    // in the request body pass along: logged in users id, and the id of the activity they are asking to join
    axios.put(`/api/activity_participants`, {user_id: props.state.loggedIn, activity_id: props.id})
    .then(err => console.log(err));
    props.setState({...props.state, view: 'browse'})
  };

  const message = () => {
    
  };

  const cancel = () => {
    // sets the user's status in the activity_participants table to null 
    // specify the id of line in activity_participants that needs to be updated
    
    //find activity_participants.id logged in user id and current activity id
    // const 
    
  };

  const remove = () => {
    // sets the user's status in the activity_participants table to null 
    
  };

  const leave = () => {
    // sets the user's status in the activity_participants table to null 
    
  };

  const viewChats = () => {
    
  };

  const pickClass = classnames({'pending': props.pending});
  
  return (
    <article className={pickClass}>
      <div>
        <div>
          <img src={images[(tagName[0].name)] || '../images/park.jpeg'} width="100%"></img>
        </div>
        <h2>{props.name}</h2>
        <ul>
          {tagName.map(tag => <li key={tagName.indexOf(tag)}>{tag.name}</li>)}
        </ul>
        <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
      </div>
      <div>
      {props.state.view === 'hosted' && <div><MatButton variant="contained">Edit</MatButton></div>}
      {props.pending === true && <h2>REQUEST SENT!</h2>}
        <h3>{playerMessage}</h3>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
        {(props.state.view === 'browse' || props.state.view === 'landing') && !props.pending && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => ask()}>Ask to Join</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
          </div>
        }
        {props.state.view === 'joined' && !props.pending && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => leave()}>Leave</MatButton>
          </div>
        }
        {props.state.view === 'pending' && !props.pending && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => cancel()}>Cancel</MatButton>
          </div>
        }
        {props.state.view === 'hosted' && !props.pending && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => viewChats()}>View Chats</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => remove()}>Delete</MatButton>
          </div>
        }
        {props.pending &&
          <div>
          <MatButton variant="contained" color="primary" onClick={() => viewChats()}>Message Host</MatButton>
          <MatButton variant="contained" color="primary" onClick={() => remove()}>Cancel</MatButton>
        </div>
        }

      </div>
      {props.state.view === 'hosted' &&
        <div>
          <ParticipantsList state={props.state} setState={props.setState} activity_id={props.id} />
        </div>
      }
    </article>
  )
};