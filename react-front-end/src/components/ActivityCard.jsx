import React, { useEffect } from 'react';
import MatAvatar from './MatAvatar';
import MatButton from './MatButton';
import axios from 'axios';

export default function ActivityCard(props) {
  // Set number of players message based on props.currentPlayers and props.numoOfParticipants

  let currentPlayers;
  useEffect(() => {
    const fetchCount = function(id) {
      axios.get(`/api/ap_count?activity_id=${id}`)
      .then((response) => {
        currentPlayers = response.data.count;
      })
    }
    fetchCount(props.id)
  },[])

  let playerMessage = '';
  let playerFraction = `${props.currentPlayers} / ${props.numOfParticipants}`;
  if (props.currentPlayers < props.numOfParticipants) {
    playerMessage = `Looking for ${props.numOfParticipants - props.currentPlayers} more (${playerFraction} Filled)`;
  } else if (props.currentPlayers >= props.numOfParticipants) {
    playerMessage = 'Filled'
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
          {/* <img src={props.images[props.tags[0]]} width="100%"></img> */}
        </div>
        <h2>{props.name}</h2>
        {/* <ul>
          {props.tags.map(tag => <li>{tag}</li>)}
        </ul> */}
        <MatAvatar name={props.hostName} avatar={props.avatar} city={props.city} />
      </div>
      <div>
      {props.state.view === 'hosted' && <div><MatButton variant="standard">Edit</MatButton></div>}
        <h3>{playerMessage}</h3>
        <h5>Skill Level: {props.skillLevel}</h5>
        <h5>Days: {props.days}</h5>
        <h5>Timeframe: {props.timeframe}</h5>
        {props.location && <h5>Location: {props.location}</h5>}
        <p>{props.description}</p>
        {props.state.view === 'browse' && 
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
    </article>
  )
};