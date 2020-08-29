import React from 'react';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';



export default function MatButton(props) {
  return (
    <FormControlLabel value="female" control={<Radio />} label="Day" />

  )
};