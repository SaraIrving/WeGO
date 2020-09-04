import React, { useEffect } from 'react';
import MatButton from './MatButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

export default function MatNotificationMenu(props) {

  console.log("props in MtNotificationMenu = ", props)
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    //when they click on the menu it, it should link them to the hosted activities page, and it should delete that messageNotification object from the state 
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = (activity, participant) => {
    setAnchorEl(null);
    let newMessageNotification = [];
    for (let i of props.state.messageNotification) {
      if (i.activity_id !== activity && i.participant_id !== participant) {
        newMessageNotification.push(i);
      }
    }
    props.setState(prev => {return {...prev, view: 'hosted', messageNotification: newMessageNotification}})
  };

  
    // find the activity id of all activities hosted by then logged in user, make an array 
    //loop through the state.messageNotifications array
    // if the activity id of the messageNotification Object matches any of the id's of the hosted activities then create a MenuItem that says "New join request in your activity: activity Name (get this from the activity id)"

    let activitiesHosted = [];
    const findActivitiesHosted = () => {
      for (let each of props.state.activityParticipants) {
        if (props.state.loggedIn === each.user_id && each.status === 'host') {
          activitiesHosted.push(each.activity_id);
        }
      }
    }
    //findActivitiesHosted();
    

    //let notificationList = [];
    // const createNotificationList = () => {
      
      

    //   for (let hostedActivityId of activitiesHosted) {
    //     for (let notification of props.state.messageNotification) {
    //       if (hostedActivityId === notification.activity_id) {
            
    //         notificationList.push(<MenuItem onClick={handleClose}>You have a new participant request in {props.state.activities[hostedActivityId - 1].name}!</MenuItem>)
            
  
    //       }
    //     }
    //   }
    //   return notificationList;
    // }
    // //createNotificationList(); 
    
    console.log("activities hosted array in NotificationMenu = ", activitiesHosted)
  
    const activities = () => {
    activitiesHosted.map(activity => {
      console.log("messageNotification state in loos = ", props.state.messageNotification)
      return props.state.messageNotification.map(notification => {
        if (activity === notification.activity_id) {
          console.log('the match was made')
          return (<MenuItem onClick={handleClose2(activity, notification.participant_id)}>You have a new participant request in {props.state.activities[activity - 1].name}!</MenuItem>)
        }
      })
    })
  }
   
  return (
    <div className="notification-menu">
      {findActivitiesHosted()}
      <MatButton startIcon="NotificationsActiveIcon" aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick}></MatButton>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {activities()}
      </Menu>
    </div>
  );
}