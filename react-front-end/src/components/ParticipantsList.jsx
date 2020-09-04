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
        setLocalState(prev => { return {...prev, pending: true}});
      }
      if (i.status === 'accepted') {
        setLocalState(prev => { return {...prev, accepted: true}});
      }
    }
  }
  },[props.state.refresh])

  return (
    <div>
      {(localState.accepted || localState.pending) &&
            <div className="participants-list">
            {localState.accepted && <h3>Accepted Participants</h3>}
              <ul>
                {props.state.activityParticipants.map(part => {
                  if (part.status === "accepted" && part.activity_id === props.activity_id) {
                    return (
                      <Participant
                        name={props.state.users[part.user_id - 1].name}
                        city={props.state.users[part.user_id - 1].city}
                        avatar={props.state.users[part.user_id - 1].avatar}
                        key={part.id}
                        status="accepted"
                        statusChangeFunction={props.statusChangeFunction}
                        activity_id={props.activity_id}
                        user_id={part.user_id}
                      />
                    )
                  }
                })}
              </ul>
            <div>
            {localState.pending && <h3>Pending Participants</h3>}
            </div>
              <ul>
                {props.state.activityParticipants.map(part => {
                  if (part.status === "pending" && part.activity_id === props.activity_id) {
                    return (
                      <Participant 
                        name={props.state.users[part.user_id - 1].name}
                        city={props.state.users[part.user_id - 1].city}
                        avatar={props.state.users[part.user_id - 1].avatar}
                        key={part.id}
                        status="pending"
                        cancelFunction={props.cancelFunction}
                        statusChangeFunction={props.statusChangeFunction}
                        activity_id={props.activity_id}
                        user_id={part.user_id}
                      />
                    )
                  }
                })}
              </ul>
          </div>
      }
    </div>
  )
};