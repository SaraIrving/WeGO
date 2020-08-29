import React from 'react';
import { Chip } from '@material-ui/core';

//props.new_messages is a number that represents how many new messages have been sent since the last time a user open this chat 

export default function MatNotificationDot(props) {
  return (
    <Chip 
      label={props.new_messages} 
    />
  )
};