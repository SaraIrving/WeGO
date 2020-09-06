import React, { useEffect } from 'react';
import MatButton from './MatButton';
// import MatNotificationMenu from './MatNotificationMenu';
import MatBanner from './MatBanner';

  export default function NavBar(props) {

    const logout = function() {
      props.setState(prev => { return {...prev, loggedIn: null, view:'landing'}});
    }

    return (
      <section className="navbar">
        {props.loggedIn === null &&
          <div>
            <a onClick={() => props.setState(prev => {return {...prev, view: 'landing'}})}><img alt="LOGO HERE" src="../images/logo-dark.svg" width="140px" /></a>
            <div>
              <MatButton variant="text" onClick={() => props.setState({...props.state, view: 'landing'})} >HOME</MatButton>
              <MatButton variant="text" onClick={e => props.setState({...props.state, view: "login"})}>LOGIN</MatButton>
              <MatButton variant="outlined" onClick={e => props.setState({...props.state, view: "signup"})}>SIGNUP</MatButton>
            </div>
          </div>}
        {props.loggedIn &&
        <div>
          <a onClick={() => props.setState(prev => {return {...prev, view: 'landing'}})}><img alt="LOGO HERE" src="../images/logo-dark.svg" width="140px" /></a>
          <div>
            <MatButton variant="text" onClick={() => props.setState({...props.state, view: 'landing'})} >HOME</MatButton>
            <MatButton startIcon="AddIcon" onClick={() => props.setState({...props.state, view: 'create'})}>NEW ACTIVITY</MatButton>
            <MatButton variant="text" onClick={() => props.setState({...props.state, view: 'browse'})} >ACTIVITIES</MatButton>
            <MatButton variant="text" disabled>Hi {props.state.name}!</MatButton>
            <MatButton variant="outlined" onClick={e => logout()}>LOGOUT</MatButton>
          </div>
          {props.state.messageNotification.length > 0 && <MatBanner className="" state={props.state} setState={props.setState}></MatBanner>}
        </div>}
  
      </section>
    )
}

