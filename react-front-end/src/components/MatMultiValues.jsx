/* eslint-disable no-use-before-define */
import React from 'react';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
}));


export default function MatMultiValues(props) {
  const classes = useStyles();

  // use local state to build up an array of all the tags the user selects from the options list 
  const [tags, setTags] = React.useState([]);

  // determine what to display when the user click on an option 
  const handleChange = (event, values) => {
    setTags(values);
    props.onChange(event, values);

  };

  return (
    <div className={classes.root}>
      <Autocomplete
        multiple
        id="tags-standard"
        options={props.options}
        getOptionLabel={(option) => option.name}
        onChange={handleChange}
        renderInput={(params) => (
          <TextField
            {...params}
            variant="standard"
            label={props.label}
            placeholder={props.placeholder}
          />
        )}
      />
      </div>
  );
};





