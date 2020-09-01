import React, { useState } from 'react';
import MatInput from './MatInput';
import MatButton from './MatButton';
import MatMultiValue from './MatMultiValues';
import MatMultiSelect from './MatMultiSelect';

export default function ActivityForm(props) {
  console.log("tags = ", props.state.tags)

  const [stateForm, setStateForm] = useState({
    activity_name: "",
    description: "",
    max_participants: 0,
    city: "",
    location: "",
    frequency: [],
    timeframe: [],
    days: [],
    skill_level: [],
    tags: []

  });

  const tagsObject = props.state.tags
  let tagsArray = tagsObject.map(tagObject => tagObject.name);

  const login = function(username) {
    
    for (let i of props.state.users) {
      if (username === 'user') {
        props.setState({...props.state, loggedIn: 3});
      }
    }
  }

  console.log("stateForm = ", stateForm);
  const create = function(stateForm) {
    console.log("Inside the create function");

    let currentActivityState = props.state.activities
    console.log("props.activities = ", props);
    currentActivityState.push(stateForm)  

    props.setState({...props.state, activities: currentActivityState})
  }

  const handleSelectedMultiple = evt => {
    const values = Array.from(evt.target.selectedOptions, option => option.value);
    // Or this way
   // const values = [...evt.target.selectedOptions].map(opt => opt.value)
    console.log('values', values);
  };

  return (
    <section>
      <h2>CREATE AN ACTIVITY</h2>
      <form onSubmit={e => e.preventDefault()}>
        <MatInput 
          required={true} 
          onChange={event => setStateForm({...stateForm, name: event.target.value})} 
          label="activity_name" 
          value={stateForm.activity_name} variant="filled" 
          size="small" 
          fullfullWidth={true} />
        <MatInput 
          required={true} 
          onChange={event => setStateForm({...stateForm, description: event.target.value})} 
          label="description" 
          value={stateForm.description} 
          variant="filled" size="small" 
          fullfullWidth={true} multiline/>
        <MatInput 
          required={true} 
          onChange={event => setStateForm({...stateForm, max_participants: event.target.value})} 
          label="max_participants" 
          value={stateForm.max_participants} 
          variant="filled" size="small" 
          fullfullWidth={true} />
        <MatInput 
          required={false} 
          onChange={event => setStateForm({...stateForm, location: event.target.value})} 
          label="location" 
          value={stateForm.max_participants} 
          variant="filled" 
          size="small" f
          ullfullWidth={true} />
        <MatMultiSelect 
          items={['One Time', 'Weekly', 'Bi-Weekly', 'Monthly']} 
          inputLabel="Frequency" 
          onChange={event => setStateForm({...stateForm, frequency: event.target.value})} />
        <MatMultiSelect 
          items={['Morning', 'Daytime', 'Evening']} 
          inputLabel="Timeframe" 
          onChange={event => setStateForm({...stateForm, timeframe: event.target.value})}  />
        <MatMultiSelect 
          items={['Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat', 'Sun']} 
          inputLabel="Days" 
          onChange={event => setStateForm({...stateForm, days: event.target.value})}  />
        <MatMultiSelect 
          items={['Beginner', 'Intermediate', 'Advanced']} 
          inputLabel="Skill Level" 
          onChange={event => setStateForm({...stateForm, frequency: event.target.value})}   />
        <MatMultiValue options={props.state.tags}/>

        <MatButton variant="outlined" type="submit" onClick={() => create()}>CREATE</MatButton>
        


        {/* <MatButton variant="outlined" type="submit" onClick={() => login(stateLogin.username, stateLogin.password)}>CREATE</MatButton> */}
      </form>
    </section>
  )
};
