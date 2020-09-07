import React, { useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import MatButton from './MatButton';
import MatInput from './MatInput';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { geoPropTypes } from 'react-geolocated';


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
                <h5 className={props.state.users[Number(message.user_id) - 1].id === props.state.loggedIn ? 'my-message' : 'their-message'}>{props.state.users[Number(message.user_id) - 1].name}: <span>{message.text}</span></h5>
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

    useEffect(() => {
      let chatWindow = document.getElementById('chat-window');
      let xH = chatWindow.scrollHeight; 
      chatWindow.scrollTo(0, xH);
    })
    

  return (
    <section className="chat-wrapper">
      {/* <MatButton type="normal" startIcon="CloseIcon" onClick={() => props.setState(prev => ({...prev, view: 'messages'}))} /> */}
      <IconButton onClick={() => props.setState(prev => ({...prev, view: 'messages'}))}><CloseIcon /></IconButton>
      <div><h2>{props.state.activities[props.state.currentActivityId - 1].name}</h2><h3>Host: {props.state.users[props.state.activities[props.state.currentActivityId - 1].user_id - 1].name}</h3></div>
      <div>
        <div className="chatlog" id="chat-window">
          {/* {renderChatHistory()} */}
          {renderChatHistory()}
        </div>
      </div>
      <ul id="messages"></ul>
        <form action="" onSubmit={props.onMessageSubmit}>
          {/* <div>
          <MatInput name="name" onChange={e => props.onTextChange(e.target.value,'name')} value={props.state.name} label="name" />
          </div> */}
          <div className="message-input-wrapper">
            <div>
              <MatInput fullWidth name="message" variant="filled" onChange={e => props.onTextChange(e.target.value,'message')} value={props.state.message} label="message" />
            </div>
            <div>
              <MatButton endIcon="SendIcon" type="submit" variant="contained" color="primary">Send Message</MatButton>
            </div>
          </div>
        </form>
    </section>

  )
};