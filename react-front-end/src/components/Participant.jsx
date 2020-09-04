import React from 'react';
import MatButton from './MatButton';
import MatAvatar from './MatAvatar';
import MatNotificationDot from './MatNotificationDot';
import axios from 'axios';
import classNames from 'classnames';

export default function Participant(props) {

  const accept = () => {
    // allows host to change the status of a pending participant to accepted

  };

  return (
    <div>
      <div>
        <MatAvatar name={props.name} city={props.city} avatar={props.avatar} />
      </div>
      <span></span>
      <div>
        {props.status === 'message' &&
        <div>
          <MatButton variant="contained" color="primary" onClick={props.onClick}>Open Chat</MatButton>
          <MatNotificationDot className={`${props.notifications > 0 ? "notifications" : "hide"}`} label={props.newMessages} notifications={props.notifications}/>
        </div>
        }
        {props.status === 'accepted' && 
        <div>
          <MatButton variant="contained" color="primary">Open Chat</MatButton>
          <MatButton variant="contained" color="secondary" onClick={() => props.statusChangeFunction(props.user_id, props.activity_id, "null")}>Remove</MatButton>
        </div>
        }
        {props.status === 'pending' &&
        <div>
          <MatButton variant="contained" color="primary">Open Chat</MatButton>
          <MatButton variant="contained" color="secondary" onClick={() => props.statusChangeFunction(props.user_id, props.activity_id, "accepted")}>Accept</MatButton>
          <MatButton variant="contained" color="secondary" onClick={() => props.cancelFunction(props.user_id, props.activity_id)}>Deny</MatButton>
        </div>
        } 
      </div>
    </div>
  )
}; 