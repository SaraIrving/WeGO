import React from 'react';
import { TextField } from '@material-ui/core';

// props.label: a string of whatever label you want to appear over the Input, ex: "Name"
//props.required: a boolean, true if field is required, false if field is not required 

export default function MatInput(props) {

  return (
  
    <TextField
    required={props.required}
    id="outlined-basic"
    label={props.label}
    variant="outlined"
  />
  )
};