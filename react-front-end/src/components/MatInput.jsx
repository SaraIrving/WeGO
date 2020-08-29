import React from 'react';
import { TextField } from '@material-ui/core';

// props.label: a string of whatever label you want to appear over the Input, ex: "Name"

export default function MatInput(props) {

  return (
  
    <TextField
    required
    id="outlined-required"
    label={props.label}
    variant="outlined"
  />
  )
};