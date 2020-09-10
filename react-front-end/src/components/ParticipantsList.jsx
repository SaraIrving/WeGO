import React, { useState, useEffect } from 'react';
import Participant from './Participant';

export default function ParticipantsList(props) {

  const [localState, setLocalState] = useState({
    accepted: false,
    pending: false
  });


  useEffect(() => {

    // if there is one or more activity participants with the status pending for the current activity, then set the pending key in the local state to true which will cause the pending participants title and list of pending participants to be displayed on the activity card in the hosted view 
    if (props.state.activityParticipants.filter(part => part.activity_id === props.activity_id && part.status === 'pending').length > 0) {
      setLocalState(prev => { return {...prev, pending: true}});
    } else {
      setLocalState(prev => { return {...prev, pending: false}});
    };

    // if there is one or more activity participants with the status accepted for the current activity, then set the pending key in the local state to true which will cause the pending participants title and list of pending participants to be displayed on the activity card in the hosted view 
    if (props.state.activityParticipants.filter(part => part.activity_id === props.activity_id && part.status === 'accepted').length > 0) {
      setLocalState(prev => { return {...prev, accepted: true}});
    } else {
      setLocalState(prev => { return {...prev, accepted: false}});
    };
    
  },[props.state.activityParticipants])

  return (
    <div>
      {(localState.accepted || localState.pending) &&
          <div className="participants-list">
            <div>
            {localState.accepted && <h3>Accepted Participants</h3>}
            </div>
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
                        state={props.state}
                        setState={props.setState}
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
                        state={props.state}
                        setState={props.setState}
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