import React, { useState, useEffect } from 'react';
import ActivityCard from './ActivityCard';

export default function ActivityList(props) {


  return (<div>
     {props.state.activities.map(activity => {
       const currentTagNames = props.state.activityTags.filter(tag => tag.activity_id === activity.id).map(tag => tag.name)
         console.log('maybetagnames : ', currentTagNames); 
          
       if (props.state.filters.length !== 0) {
        const found = props.state.filters.map(filter => filter.name).some(r => currentTagNames.indexOf(r) >= 0 )

        if (found) {
          console.log('match Found!')
        } else {
          return;
        }
       }

       let pending = false;
       for (let i of props.state.activityParticipants) {
         if (i.activity_id === activity.id && i.user_id === props.state.loggedIn && i.status === "pending") {
          pending = true;
         }
       return <ActivityCard
        currentTagNames={currentTagNames}
        pending={pending}
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

}