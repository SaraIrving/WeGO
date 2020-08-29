import React from 'react';
import { TextField } from '@material-ui/core';

export default function MatTextarea(props) {
  return (
    <TextField multiline={props.multiline} variant={props.variant} label={props.label} rows={props.rows} />
  )
};