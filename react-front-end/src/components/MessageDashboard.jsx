import React, { useEffect } from 'react';

export default function MessageDashboard(props) {

  // const [localState, setLocalState] = useState({
  
  // })




  useEffect(() => {
    // axios call to retrieve all messages for current user grouped by activitiy, then we can
    // create an array of objects based on the response, [{activity: name, messages: {message: message-info-here}}]
    // can send onClick to set refresh state as activity ID to pass in both activity ID and user ID to ChatCard
  },[props.state.refresh])

  // return (
  //   <div>
  //     {(localState.accepted || localState.pending) &&
  //           <div className="participants-list">
  //           {localState.accepted && <h3>Accepted Participants</h3>}
  //             <ul>
  //               {props.state.activityParticipants.map(part => {
  //                 if (part.status === "accepted" && part.activity_id === props.activity_id) {
  //                   return (
  //                     <Participant
  //                       name={props.state.users[part.user_id].name}
  //                       city={props.state.users[part.user_id].city}
  //                       avatar={props.state.users[part.user_id].avatar}
  //                       key={part.id}
  //                       status="accepted"
  //                       statusChangeFunction={props.statusChangeFunction}
  //                       activity_id={props.activity_id}
  //                       user_id={part.user_id}
  //                     />
  //                   )
  //                 }
  //               })}
  //             </ul>
  //           <div>
  //           {localState.pending && <h3>Pending Participants</h3>}
  //           </div>
  //             <ul>
  //               {props.state.activityParticipants.map(part => {
  //                 if (part.status === "pending" && part.activity_id === props.activity_id) {
  //                   return (
  //                     <Participant 
  //                       name={props.state.users[part.user_id].name}
  //                       city={props.state.users[part.user_id].city}
  //                       avatar={props.state.users[part.user_id].avatar}
  //                       key={part.id}
  //                       status="pending"
  //                       cancelFunction={props.cancelFunction}
  //                       statusChangeFunction={props.statusChangeFunction}
  //                       activity_id={props.activity_id}
  //                       user_id={part.user_id}
  //                     />
  //                   )
  //                 }
  //               })}
  //             </ul>
  //         </div>
  //     }
  //   </div>
  // )
};