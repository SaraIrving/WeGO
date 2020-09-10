import React from 'react';
import { Chip } from '@material-ui/core';

// this is the notification dot that pops up next to the chat where there is a new message
export default function MatNotificationDot(props) {
  return (
    <Chip
      className="notification-dot"
      label={props.children}
      className={props.className}
    />
  )
};