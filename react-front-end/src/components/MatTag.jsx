import React from 'react';
import ClearIcon from '@material-ui/icons/Clear';

// props.tag is a string that describes whichever tag was was clicked Ex: "outdoor", "hiking", "beginner"

export default function MatButton(props) {
  return (

    <p>{props.tag}<ClearIcon /></p>
  )
};