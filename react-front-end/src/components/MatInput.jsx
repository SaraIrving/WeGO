import React from 'react';
import { TextField } from '@material-ui/core';


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