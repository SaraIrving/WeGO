import React from 'react';
import Participant from './Participant';

export default function ParticipantsList(props) {
  return (
    <div>
      <h3>Accepted Participants</h3>
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
      <h3>Pending Participants</h3>
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
  )
};