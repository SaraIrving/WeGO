import React from 'react';
import MatButton from './MatButton';
export default function Landing(props) {

  return (
    <div>
      <h2>Landing Page</h2>
      <MatButton varient="contained" color="primary" onClick={() => props.setState({...props.state, view:"login"})}> Login!</MatButton>
    </div>

  )
};