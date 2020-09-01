import React from 'react';
import MatButton from './MatButton';
import MatAvatar from './MatAvatar';
import MatNotificationDot from './MatNotificationDot'

export default function Participant(props) {
  return (
    <div>
      <div>
        <MatAvatar name={props.name} city={props.city} avatar={props.avatar} />
      </div>
      <span></span>
      <div>
        {props.status = 'message' && 
        <div>
          <MatButton variant="contained">Open Chat</MatButton>
          <MatNotificationDot label={props.newMessages} />
        </div>
        }
        {props.status = 'accepted' && 
        <div>
          <MatButton variant="contained">Open Chat</MatButton>
          <MatButton variant="contained">Remove</MatButton>
        </div>
        }
        {props.status = 'pending' && 
        <div>
          <MatButton variant="contained">Open Chat</MatButton>
          <MatButton variant="contained">Accept</MatButton>
          <MatButton variant="contained">Deny</MatButton>
        </div>
        } 
      </div>
    </div>
  )
};