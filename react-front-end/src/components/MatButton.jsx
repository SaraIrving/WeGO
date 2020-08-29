import React from 'react';
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import KeyboardVoiceIcon from '@material-ui/icons/KeyboardVoice';
import Icon from '@material-ui/core/Icon';
import SaveIcon from '@material-ui/icons/Save';

let icons = {
  DeleteIcon,
  CloudUploadIcon,
  KeyboardVoiceIcon,
  SaveIcon
}

export default function MatButton(props) {
  // variant= outlined, contained
  // color= primary, secondary
  let EndIcon;
  let StartIcon;
  if (props.endIcon) {
    EndIcon = `<${props.endIcon} />`;
  } else if (props.startIcon) {
    StartIcon = props.startIcon;
  }
  console.log(EndIcon);
  return (
  <Button size={props.size} endIcon={EndIcon ? EndIcon : false } variant={props.variant} color={props.color} disabled={props.disabled} disableElevation={props.disableElevation} href={props.href} onClick={() => props.onClick}>{props.children}</Button>
  )
};