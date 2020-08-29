import React from 'react';
import { TextField } from '@material-ui/core';
import { MenuItem } from '@material-ui/core';


// will use dropdown for: skill level, frequency 

//props.label: a string that represents what you want the placeholder the dropdown to be
// props.options: an array of the strings you want to have as the options in the dropdown list 
// option refers to the option (as in state)



export default function MatButton(props) {
  const options = props.options

  return (
    <TextField
          id="outlined-select"
          select
          label={props.label}
          helperText={props.field}
          variant="outlined"
        >
        {options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
        </TextField>
  )
};


