import React, { Fragment } from 'react';
import MatButton from './MatButton';
import Slide from 'react-reveal/Slide';
import MatBanner from './MatBanner';

export default function NavBar(props) {

  // when user hits "LOGOUT", it updates state to show the landing view and set the loggedIn user back to null 
  const logout = function() {
    props.setState(prev => { return {...prev, loggedIn: null, view:'landing'}});
  }

  // if there is something in the messageNotification array in the state, the notification banner will be displayed at the top of the Nav Bar
  return (
    <Fragment>
    <section className="navbar">
    {props.state.messageNotification.length > 0 && <Slide top><MatBanner className="" state={props.state} setState={props.setState}></MatBanner></Slide>} 
      {props.loggedIn === null &&
        <div className="main-nav">
          <a onClick={() => props.setState(prev => {return {...prev, view: 'landing'}})}><img alt="LOGO HERE" src="../images/logo-dark.svg" width="140px" /></a>
          <div>
            <MatButton variant="text" onClick={() => props.setState({...props.state, view: 'landing'})} >HOME</MatButton>
            <MatButton variant="text" onClick={e => props.setState({...props.state, view: "login"})}>LOGIN</MatButton>
            <MatButton variant="outlined" onClick={e => props.setState({...props.state, view: "signup"})}>SIGNUP</MatButton>
          </div>
        </div>}
      {props.loggedIn &&
      <div className="main-nav">
        <a onClick={() => props.setState(prev => {return {...prev, view: 'landing'}})}><img alt="LOGO HERE" src="../images/logo-dark.svg" width="140px" /></a>
        <div>
          <MatButton variant="text" onClick={() => props.setState({...props.state, view: 'landing'})} >HOME</MatButton>
          <MatButton startIcon="AddIcon" onClick={() => props.setState({...props.state, view: 'create'})}>NEW ACTIVITY</MatButton>
          <MatButton variant="text" onClick={() => props.setState({...props.state, view: 'browse'})} >ACTIVITIES</MatButton>
          <MatButton variant="text" disabled>Hi {props.state.name}!</MatButton>
          <MatButton variant="outlined" onClick={e => logout()}>LOGOUT</MatButton>
        </div>
      </div>
      }
    </section>
    </Fragment>
  );
};

