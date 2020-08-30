import React, { useState } from 'react';
import MatInput from './MatInput';
import MatButton from './MatButton';


// need fields for: username, password

export default function Login(props) {

  const [stateLogin, setStateLogin] = useState({
    username: "",
    password: ""
  });

  const login = function(username, password) {
    console.log(username);
    for (let i of props.users) {
      if (username === 'sylvia') {
         props.setState({...props.State, loggedIn: 3});
      }
    }
  }
  return (
    <form >
      <MatInput required={true} onChange={event => setStateLogin({...stateLogin, username: event.target.value})} label="Username" value={stateLogin.username} variant="filled" size="small" fullfullWidth={true} />
      <MatInput required={true} onChange={event => setStateLogin({...stateLogin, password: event.target.value})} label="Password" value={stateLogin.password} variant="filled" size="small" fullfullWidth={true} />
      <MatButton variant="outlined" type="submit" onClick={login(stateLogin.username, stateLogin.password)}>LOGIN</MatButton>
    </form>
  )
}
;
