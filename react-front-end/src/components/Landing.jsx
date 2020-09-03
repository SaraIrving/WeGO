import React from 'react';
import MatButton from './MatButton';
export default function Landing(props) {

  return (
    <div className="landing-wrapper">
      <section className="hero">
        <div>
          <h1>Lets Play Together.</h1>
        </div>
        <div>
          <span></span>
          <h5>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</h5>
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
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt</p>
          </article>
          <article>
            <h3>Step</h3>
            <h2 className="circle">2</h2>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt</p>
          </article>
          <article>
            <h3>Step</h3>
            <h2 className="circle">3</h2>
            <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt</p>
          </article>
          <MatButton variant="contained" color="primary" onClick={() => props.setState({...props.state, view:"signin"})}>SIGNUP TODAY!</MatButton>
        </div>
      </section>
      <section className="sample-wrapper">
        <div>
          <h2>Browse from a plethora of awesome activities!</h2>
          <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat. Ut wisi enim ad minim veniam</p>
        </div>
      </section>
      <section className="cta-wrapper">
        <h4>3 Million Users Worldwide!</h4>
        <div>
          <h3>Meet New People</h3>
          <h3>Get Active</h3>
          <h3>Try Something New</h3>
        </div>
        <MatButton variant="contained" color="primary" onClick={() => props.setState({...props.state, view:"signin"})}>SIGNUP TODAY!</MatButton>
      </section>
    </div>
  )
};