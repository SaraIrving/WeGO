import React from 'react';
import MatButton from './MatButton';
export default function Landing(props) {

  return (
    <div className="landing-wrapper">
      <h2>Landing Page</h2>
      <MatButton variant="contained" color="primary" onClick={() => props.setState({...props.state, view:"login"})}> Login!</MatButton>
    </div>

  )
};