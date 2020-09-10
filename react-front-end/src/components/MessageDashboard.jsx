import React from 'react';
import Participant from './Participant';

export default function MessageDashboard(props) {

  let activityMessages = [];

  // loop through messages array in the state, build up activityMessages with one message from each distinct activity id associated with the logged in user -- this will be used to display the activities where there has been a chat history on the message dashboard 

  for (let i of props.state.messages) {
    // if you're logged in and you sent the message OR if you're logged in and you're the host OR if you're logged in and youre the reciever of the message
    if ((i.sender_id === props.state.loggedIn) || (i.host === props.state.loggedIn) || (i.receiver_id === props.state.loggedIn)) {
    
      //if there are already some messages in the activityMessages array, check if the activity id of the message in question is already in the array, if it is do nothing, if it is not yet in the array, add that message to activityMessages 
      if(activityMessages.length !== 0) {
      
          if (!activityMessages.map(obj => obj.id).includes(i.activity_id)) {
            activityMessages.push({ id: i.activity_id, messages: [i] })
          };
          
      } else {
        activityMessages.push({ id: i.activity_id, messages: [i] })
      }
    }
  };


  return (
    <div>
      {activityMessages.length > 0 &&
            <div className="messages-list">
              <ul>
                {activityMessages.map(messageGroup => {
                  console.log('messageGroup ', messageGroup);
                    return (
                      <div>
                          <h2>{props.state.activities[Number(messageGroup.id) - 1].name}</h2>
                          {messageGroup.messages.map(messageObject => {
                            if (messageObject.host === props.state.loggedIn && messageObject.sender_id !== props.state.loggedIn) { // you are the host and not the message sender
                              return <Participant
                              name={props.state.users[messageObject.sender_id - 1].name}
                              city={props.state.users[messageObject.sender_id - 1].city}
                              avatar={props.state.users[messageObject.sender_id - 1].avatar}
                              key={messageObject.id}
                              activity_id={messageGroup.id}
                              user_id={messageObject.sender_id}
                              status="message"
                              state={props.state}
                              setState={props.setState}
                              notifications={0}
                            />
                            } else if (messageObject.host !== props.state.loggedIn && messageObject.sender_id === props.state.loggedIn){ // you're not the host and you are the one who sent the message
                              return <Participant
                              name={props.state.users[messageObject.host - 1].name}
                              city={props.state.users[messageObject.host - 1].city}
                              avatar={props.state.users[messageObject.host - 1].avatar}
                              key={messageObject.id}
                              activity_id={messageGroup.id}
                              user_id={messageObject.host}
                              status="message"
                              state={props.state}
                              setState={props.setState}
                            /> 
                            } else if (messageObject.host !== props.state.loggedIn && messageObject.sender_id === messageObject.host){ // you're not the host and the host sent the message
                              return <Participant
                              name={props.state.users[messageObject.host - 1].name}
                              city={props.state.users[messageObject.host - 1].city}
                              avatar={props.state.users[messageObject.host - 1].avatar}
                              key={messageObject.id}
                              activity_id={messageGroup.id}
                              user_id={messageObject.host}
                              status="message"
                              state={props.state}
                              setState={props.setState}
                            /> 
                            } else if (messageObject.host === props.state.loggedIn && messageObject.sender_id === props.state.loggedIn){ // you are the host and you are the one who sent the message
                              return <Participant
                              name={props.state.users[messageObject.receiver_id - 1].name}
                              city={props.state.users[messageObject.receiver_id - 1].city}
                              avatar={props.state.users[messageObject.receiver_id - 1].avatar}
                              key={messageObject.id}
                              activity_id={messageGroup.id}
                              user_id={messageObject.receiver_id}
                              status="message"
                              state={props.state}
                              setState={props.setState}
                            /> 
                            }
                          })}
                      </div>
                    )
                })}
              </ul>
            </div>
        }
    </div>
  )
};