import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MatButton from './MatButton';
import MatInput from './MatInput';

export default function ChatCard(props) {

  // useEffect(() => {
  // const renderChatHistory = () => {
  //   return props.state.messages.map((message, index) => {
  //     if (message.activity_id === props.state.currentActivityId && (message.host === props.state.loggedIn || message.user_id === props.state.loggedIn)) {
  //       return (
  //         <div key={index}>
  //           <h5>{props.state.users[Number(message.user_id) - 1].name}: <span>{message.text}</span></h5>
  //         </div>
  //         )
  //       }// } else if (message.activity_id === props.state.currentActivityId && message.user_id === props.state.loggedIn) {
  //       //   return (
  //       //   <div key={index}>
  //       //     <h5>{props.state.users[Number(message.user_id) - 1].name}: <span>{message.text}</span></h5>
  //       //   </div>
  //       //   )
  //       // }
  //     })
  //   }
  //   return renderChatHistory
  // }, [props.state])

  // if (message.activity_id === props.state.currentActivityId && (message.user_id === props.state.loggedIn || props.state.loggedIn === message.host)) {



      const renderChatHistory = () => {
        return props.state.messages.map((message, index) => {
          // if ((message.activity_id === props.state.currentActivityId && message.host === props.state.loggedIn) || (message.activity_id === props.state.currentActivityId && message.user_id === props.state.loggedIn)) {
          if (message.activity_id === props.state.currentActivityId) {

            return (
              <div key={index}>
                <h5>{props.state.users[Number(message.user_id) - 1].name}: <span>{message.text}</span></h5>
              </div>
              )
            }
          })
        }

      // const renderChat = () => {

    // return props.state.chat.map(({name, message}, index) => {
    //   return (
    //     <div key={index}>
    //       <h3>{name}: <span>{message}</span></h3>
    //     </div>
    //   )
    // })

  return (
    <section className="chat-wrapper">
      <MatButton type="normal" startIcon="CloseIcon" onClick={() => props.setState(prev => ({...prev, view: 'messages'}))} />
      <h2>Chat Card Here</h2>
      <div>
        <div>
          <h1>Chat Log</h1>
          {/* {renderChatHistory()} */}
          {renderChatHistory()}
        </div>
      </div>
      <ul id="messages"></ul>
        <form action="" onSubmit={props.onMessageSubmit}>
          <h1>Messenger</h1>
          {/* <div>
          <MatInput name="name" onChange={e => props.onTextChange(e.target.value,'name')} value={props.state.name} label="name" />
          </div> */}
          <div>
          <MatInput name="message" onChange={e => props.onTextChange(e.target.value,'message')} value={props.state.message} label="message" />
          </div>
          <MatButton type="submit" variant="contained">Send Message</MatButton>
        </form>
    </section>

  )
};