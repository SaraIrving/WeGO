import React, { useState } from 'react';
import MatInput from './MatInput';
import MatButton from './MatButton';

export default function Signup(props) {

  const [stateLogin, setStateLogin] = useState({
    username: "",
    password: ""
  });


  return (
    <form onSubmit={e => e.preventDefault()}>
      <MatInput required={true} onChange={event => setStateLogin({...stateLogin, username: event.target.value})} label="Username" value={stateLogin.username} variant="filled" size="small" fullfullWidth={true} />
      <MatInput onChange={event => setStateLogin({...stateLogin, password: event.target.value})} label="Password" value={stateLogin.password} variant="filled" size="small" fullfullWidth={true} />
      <MatButton variant="outlined" type="submit" onClick={() => props.login(stateLogin.username, stateLogin.password)}>SIGN UP</MatButton>
    </form>
  )
};
