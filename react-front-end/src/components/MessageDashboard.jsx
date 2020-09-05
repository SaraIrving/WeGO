import React, { useEffect } from 'react';
import Participant from './Participant';

export default function MessageDashboard(props) {

  // const [localState, setLocalState] = useState({
  
  // })

// [{id: 3, messages: [{message-info}]
// let activityMessages = [{id: 0, messages: []}]
let activityMessages = [];

  // useEffect(() => {
    // axios call to retrieve all messages for current user grouped by activitiy, then we can

    // Stores all messages relating to the loggedIn user, in form: [{id:activityId, messages: [{messages-info},{messages-info},{messages-info}]}]
    for (let i of props.state.messages) {
      
      if (i.user_id === props.state.loggedIn || i.host === props.state.loggedIn) {
        // console.log('first IF in the loop = ');
        // console.log("i.user_id === props.state.loggedIn  = ", i.user_id === props.state.loggedIn )
        // console.log("i.host === props.state.loggedIn = ", i.host === props.state.loggedIn)
        // console.log("activity in question = ", i.activity_id)
        if(activityMessages.length !== 0) {
          for (let j of activityMessages) {
            if (!activityMessages.map(obj => obj.id).includes(i.activity_id)) {
              activityMessages.push({ id: i.activity_id, messages: [i] })
            }
          }
        } else {
          activityMessages.push({ id: i.activity_id, messages: [i] })
        }
      }
    }
    
    // create an array of objects based on the response, [{activity: name, messages: {message: message-info-here}}]
    // can send onClick to set refresh state as activity ID to pass in both activity ID and user ID to ChatCard
  // },[])


  console.log('activityMessages ', activityMessages);

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
                            if (messageObject.host === props.state.loggedIn && messageObject.user_id !== props.state.loggedIn) {
                              return <Participant
                              name={props.state.users[messageObject.user_id - 1].name}
                              city={props.state.users[messageObject.user_id - 1].city}
                              avatar={props.state.users[messageObject.user_id - 1].avatar}
                              key={messageObject.id}
                              activity_id={messageGroup.id}
                              user_id={messageObject.user_id}
                              status="message"
                              state={props.state}
                              setState={props.setState}
                              notifications={0}
                              onClick={() => props.setState(prev => ({...prev, view: 'chatcard', currentActivityId: messageGroup.id, messageNotification: [] }))}
                            />
                            } else if (messageObject.host !== props.state.loggedIn && messageObject.user_id === props.state.loggedIn){
                              return <Participant
                              name={props.state.users[messageObject.host - 1].name}
                              city={props.state.users[messageObject.host - 1].city}
                              avatar={props.state.users[messageObject.host - 1].avatar}
                              key={messageObject.id}
                              activity_id={messageGroup.id}
                              user_id={messageObject.user_id}
                              status="message"
                              state={props.state}
                              setState={props.setState}
                              onClick={() => props.setState(prev => ({...prev, view: 'chatcard', currentActivityId: messageGroup.id, messageNotification: [] }))}
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