import React, { useState } from 'react';
import ActivityCard from './ActivityCard';

export default function ActivityList(props) {
  
  // local state to determine if the user is pending or not for that activity
  const [pending, setPending] = useState(false)

  // loop through each activity in the activitiesSorted state and determine how it should be displayed
  return (
  <div>
     {props.state.activitiesSorted.map(activity => {
       const currentTagNames = props.state.activityTags.filter(tag => tag.activity_id === activity.id).map(tag => tag.name)
          
       if (props.state.filters.length !== 0) {
        const found = props.state.filters.map(filter => filter.name).some(r => currentTagNames.indexOf(r) >= 0 )

        if (found) {
        } else {
          return;
        }
      }

      //  pending = false
       for (let i of props.state.activityParticipants) {
         if (i.activity_id === activity.id && i.user_id === props.state.loggedIn && i.status === "pending") { // This might be buggy? currently socket not updating if other user is in hosted view
          // pending = true
            setPending(prev => true)
         }

       return <ActivityCard
        currentTagNames={currentTagNames}
        pending={pending}
        setPending={setPending}
        name={activity.name}
        city={props.state.users[activity.user_id - 1].city}
        hostName={props.state.users[activity.user_id - 1].name}
        avatar={props.state.users[activity.user_id - 1].avatar}
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
        socket={props.socket}
       />
     }})}
    </div>
    )

};