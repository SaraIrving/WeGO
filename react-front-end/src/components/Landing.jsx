import React from 'react';
import MatButton from './MatButton';
export default function Landing(props) {

  return (
    <div className="landing-wrapper">
      <section className="hero">
        <div className="hero-overlay">
          <div>
            <h1>Helping You Do what You Love</h1>
          </div>
          <div>
            <span></span>
            <h5> WeGO connects people with the activities they love! It's a one stop shop to find new adventures, try new things and connect with new people who want to do them too,
              
              Never miss out because you need another person to join you. 

              Do fun stuff, with other people.
              
              Want to play a sport but need a team? Want to go hiking with a fellow nature lover? Want to practice a language with someone else who's learning? How about building up a group to play online games with? </h5>
          </div>
        </div>
      </section>
      <section className="categories-wrapper">
        <h3>ADVENTURE</h3>
        <h3>REC SPORTS</h3>
        <h3>ONLINE GAMES</h3>
        <h3>SEASONAL</h3>
      </section>
      <section className="process-wrapper">
        <h2>How It Works</h2>
        <div>
          <article>
            <h3>Step</h3>
            <h2 className="circle">1</h2>
            <p>Sign Up to see what's happening!</p>
          </article>
          <article>
            <h3>Step</h3>
            <h2 className="circle">2</h2>
            <p>Join an activity to try something new. Host an activity to find other folks who share your interest.</p>
          </article>
          <article>
            <h3>Step</h3>
            <h2 className="circle">3</h2>
            <p>Do something fun with your new pals!</p>
          </article>
          <MatButton variant="contained" color="primary" size="large" onClick={() => props.setState({...props.state, view:"signup"})}>SIGNUP TODAY!</MatButton>
        </div>
      </section>
      <section className="sample-wrapper">
        <div className="sample-image"></div>
        <div>
          <h2>Browse from a plethora of awesome activities!</h2>
          <p>WeGO has something for everyone! 
              <br></br>
              <br></br>
            Looking to round up a group for an adventure in the great outdoors?
            <br></br>
            Need another player for your sport of choice?
            <br></br>
            Want to connect with an online gaming buddy?
            <br></br>
            Hoping to practice your language skills with someone else in your community?
            <br></br>
            <br></br>
            You can find it all on WeGo! 
          </p>
        </div>
      </section>
      <section className="cta-wrapper">
        <h4>3 Million Users Worldwide!</h4>
        <div>
          <h3>Meet New People</h3>
          <h3>Get Active</h3>
          <h3>Try Something New</h3>
        </div>
        <MatButton variant="contained" color="secondary" size="large" onClick={() => props.setState({...props.state, view:"signup"})}>SIGNUP TODAY!</MatButton>
      </section>
    </div>
  )
};