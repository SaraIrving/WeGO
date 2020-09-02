import React, { useState, useEffect } from 'react';
import Participant from './Participant';

export default function ParticipantsList(props) {

  const [localState, setLocalState] = useState({
    accepted: false,
    pending: false
  })

  // let accepted = false;
  // let pending = false;

  useEffect(() => {
  for (let i of props.state.activityParticipants) {
    if (i.activity_id === props.activity_id) {
      if (i.status === 'pending') {
        setLocalState({...localState, pending: true});
      }
      if (i.status === 'accepted') {
        setLocalState({...localState, accepted: true});
      }
    }
  }
  },[])

  return (
    <div>
      {localState.accepted || localState.pending &&
            <div className="participants-list">
            {localState.accepted && <h3>Accepted Participants</h3>}
            <div>
              <ul>
                {props.state.activityParticipants.map(part => {
                  if (part.status === "accepted" && part.activity_id === props.activity_id) {
                    return (
                      <li><Participant
                        name={props.state.users[part.user_id].name}
                        city={props.state.users[part.user_id].city}
                        avatar={props.state.users[part.user_id].avatar}
                        key={part.id}
                        status="accepted"
                      /></li>
                    )
                  }
                })}
              </ul>
            </div>
            {localState.pending && <h3>Pending Participants</h3>}
            <div>
              <ul>
                {props.state.activityParticipants.map(part => {
                  if (part.status === "pending" && part.activity_id === props.activity_id) {
                    return (
                      <Participant 
                        name={props.state.users[part.user_id].name}
                        city={props.state.users[part.user_id].city}
                        avatar={props.state.users[part.user_id].avatar}
                        key={part.id}
                        status="pending"
                      />
                    )
                  }
                })}
              </ul>
            </div>
          </div>
      }
    </div>
  )
};