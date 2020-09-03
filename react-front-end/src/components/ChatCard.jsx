import React from 'react';
import TextField from '@material-ui/core/TextField';
import MatButton from './MatButton';
import MatInput from './MatInput';

export default function ChatCard(props) {

  const renderChat = () => {
    return props.state.chat.map(({name, message}, index) => {
      return (
        <div key={index}>
          <h3>{name}: <span>{message}</span></h3>
        </div>
      )
    })
  }
  console.log('ChatCard rendered, props.state: ', props.state)
  return (
    <section className="chat-wrapper">
      <h2>Chat Card Here</h2>
      <ul id="messages"></ul>
        <form action="" onSubmit={props.onMessageSubmit}>
          <h1>Messenger</h1>
          <div>
          <MatInput name="name" onChange={e => props.onTextChange(e.target.value,'name')} value={props.state.name} label="name" />
          </div>
          <div>
          <MatInput name="message" onChange={e => props.onTextChange(e.target.value,'message')} value={props.state.message} label="message" />
          </div>
          <MatButton type="submit" variant="contained">Send Message</MatButton>
        </form>
        <div>
          <h1>Chat Log</h1>
          {renderChat()}
        </div>
    </section>

  )
};