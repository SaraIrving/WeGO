import React, { useState } from 'react';
import MatButton from './MatButton';


export default function MatBanner(props) {

  return (
    <div className="notification-menu">
      {(props.state.messageNotification.length > 0 && props.state.messageNotification[0].request_type === 'ask') &&
      <div>
        <h5>You have a join request </h5>
        <MatButton size="small" startIcon="NotificationsActiveIcon" aria-controls="simple-menu" aria-haspopup="true" onClick={() => props.setState(prev => ({...prev, view: 'hosted', messageNotification: [] , filters: []}))}>View Now</MatButton>
      </div>
      }
      {(props.state.messageNotification.length > 0 && props.state.messageNotification[0].request_type === 'newMessage') &&
      <div>
        <h5>You have a new chat notification</h5>
        <MatButton size="small" startIcon="NotificationsActiveIcon" aria-controls="simple-menu" aria-haspopup="true" onClick={() => props.setState(prev => ({...prev, view: 'messages', filters: []}))}>View Now</MatButton>
      </div>
      }
    </div>
  );
}