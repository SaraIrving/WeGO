import React from 'react';
import ActivityCard from './ActivityCard';

export default function ActivityList(props) {

  return(
   <div>
     {props.state.activities.map(activity => {
       let pending = false;
       for (let i of props.state.activityParticipants) {
         if (i.activity_id === activity.id && i.user_id === props.state.loggedIn && i.status === "pending") {
          pending = true;
         }
       }
       return <ActivityCard
        pending={pending}
        name={activity.name}
        city={props.state.users[activity.user_id].city}
        hostName={props.state.users[activity.user_id].name}
        avatar={props.state.users[activity.user_id].avatar}
        numOfParticipants={activity.num_of_participants}
        timeframe={activity.timeframe}
        location={activity.location}
        skillTag={activity.skill_tag}
        frequency={activity.frequency}
        description={activity.description}
        id={activity.id}
        state={props.state}
        setState={props.setState}
        key={activity.id}
        days={activity.days_available}
        frequency={activity.frequency}
        hostId={activity.user_id}
       />
     })}
   </div>
  )

}