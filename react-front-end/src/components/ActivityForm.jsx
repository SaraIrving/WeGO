import React, { useState } from 'react';
import MatInput from './MatInput';
import MatButton from './MatButton';
import MatMultiValue from './MatMultiValues';

export default function ActivityForm(props) {

  const [stateForm, setStateForm] = useState({
    activity_name: "",
    description: "",
    max_participants: 0,
    city: "",
    location: "",
    frequency: "",
    timeframe: [],
    days: [],
    skill_level: "",
    tags: []

  });

  const login = function(username) {
    
    for (let i of props.state.users) {
      if (username === 'user') {
        props.setState({...props.state, loggedIn: 3});
      }
    }
  }

  return (
    <section>
      <h2>CREATE AN ACTIVITY</h2>
      <form onSubmit={e => e.preventDefault()}>
        <MatInput required={true} onChange={event => setStateForm({...stateForm, name: event.target.value})} label="activity_name" value={stateForm.activity_name} variant="filled" size="small" fullfullWidth={true} />
        <MatInput onChange={event => setStateForm({...stateForm, description: event.target.value})} label="description" value={stateForm.description} variant="filled" size="small" fullfullWidth={true} multiline/>
        <MatInput required={true} onChange={event => setStateForm({...stateForm, max_participants: event.target.value})} label="max_participants" value={stateForm.max_participants} variant="filled" size="small" fullfullWidth={true} />
        <MatInput required={false} onChange={event => setStateForm({...stateForm, location: event.target.value})} label="location" value={stateForm.max_participants} variant="filled" size="small" fullfullWidth={true} />
        <MatMultiValue />


        {/* <MatButton variant="outlined" type="submit" onClick={() => login(stateLogin.username, stateLogin.password)}>CREATE</MatButton> */}
      </form>
    </section>
  )
};
