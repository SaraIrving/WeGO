import React, { useEffect } from 'react';
import MatButton from './MatButton';
import MatInput from './MatInput';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Spin from 'react-reveal/Spin';


export default function ChatCard(props) {

  // pull the message history of these two users out of all of the total messages
  const renderChatHistory = () => {
    return props.state.messages.map((message, index) => {
        // if the message is realted to the current activity id
        if (message.activity_id === props.state.currentActivityId) {
          let messageSender = message.sender_id;
          let chatRecipient = props.state.currentChatRecipient;
          let loggedIn = props.state.loggedIn;
          let receiver = message.receiver_id;
        
            // if you sent the message to the person you are currently in a chat with OR if you are the receipient of a message from the person you are currently in a chat with 
            if((loggedIn === messageSender && chatRecipient === receiver) || (loggedIn === receiver && chatRecipient === messageSender)) {
            return(
            <div key={index}>
              <h5 className={props.state.users[Number(message.sender_id) - 1].id === props.state.loggedIn ? 'my-message' : 'their-message'}>{props.state.users[Number(message.sender_id) - 1].name}: <span>{message.text}</span></h5>
            </div>
            )
          }
        }

      })
    };

  
    // have the scroll bar in the chat card default to starting at the bottom
    useEffect(() => {
      let chatWindow = document.getElementById('chat-window');
      let xH = chatWindow.scrollHeight; 
      chatWindow.scrollTo(0, xH);
    })
    

  return (
    <section className="chat-wrapper">
      <Spin>
      <IconButton onClick={() => props.setState(prev => ({...prev, view: 'messages'}))}><CloseIcon /></IconButton>
      </Spin>
      <div><h2>{props.state.activities[props.state.currentActivityId - 1].name}</h2><h3>|| Hosted By: {props.state.users[props.state.activities[props.state.currentActivityId - 1].user_id - 1].name}</h3></div>
      <div>
        <div className="chatlog" id="chat-window">
          {renderChatHistory()}
        </div>
      </div>
      <ul id="messages"></ul>
        <form action="" onSubmit={props.onMessageSubmit}>
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