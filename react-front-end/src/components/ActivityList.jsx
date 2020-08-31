import React from 'react';
import ActivityCard from './ActivityCard';
import axios from 'axios';

export default function ActivityList(props) {

  return(
   <div>
     {props.state.activities.map(activity => {
       return <ActivityCard
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
        tags={activity.tags}
        state={props.state}
        key={activity.id}
       />
     })}
   </div>
  )

}