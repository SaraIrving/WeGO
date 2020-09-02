import React, { useEffect, useState } from 'react';
import MatAvatar from './MatAvatar';
import MatButton from './MatButton';
import ParticipantsList from './ParticipantsList';
import axios from 'axios';

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

  };

  const message = () => {
    
  };

  const cancel = () => {
    
  };

  const remove = () => {
    
  };

  const leave = () => {
    
  };

  const viewChats = () => {
    
  };
  
  return (
    <article>
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
        <h3>{playerMessage}</h3>
        <h5>Skill Level: {props.skillTag}</h5>
        <h5>Frequency: {props.frequency}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
        {(props.state.view === 'browse' || props.state.view === 'landing') && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => ask()}>Ask to Join</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
          </div>
        }
        {props.state.view === 'joined' && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => leave()}>Leave</MatButton>
          </div>
        }
        {props.state.view === 'pending' && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => message()}>Message Host</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => cancel()}>Cancel</MatButton>
          </div>
        }
        {props.state.view === 'hosted' && 
          <div>
            <MatButton variant="contained" color="primary" onClick={() => viewChats()}>View Chats</MatButton>
            <MatButton variant="contained" color="primary" onClick={() => remove()}>Delete</MatButton>
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