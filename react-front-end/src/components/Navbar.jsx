import React from 'react';
import MatButton from './MatButton';

export default function NavBar(props) {


  return (
    <section>
      {props.loggedIn === null &&
        <div>
          <img alt="LOGO HERE" src=""/>
          <div>
            <MatButton variant="outlined" onClick={e => props.login(3)}>LOGIN</MatButton>
            <MatButton variant="outlined">SIGNUP</MatButton>
          </div>
        </div>}
      {props.loggedIn && 
      <div>
        <img alt="LOGO HERE" src=""/>
        <div>
          <MatButton startIcon="AddIcon">NEW ACTIVITY</MatButton>
          <MatButton variant="outlined">LOGOUT</MatButton>
        </div>
      </div>}

    </section>
  )
}