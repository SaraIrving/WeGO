import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';



export default function SubNav(props) {

  //determine what the heading should be
   //determine the index of which tab to set as the default
  // view: ‘signin’ | landing (login, browse, create, joined, hosted, pending, messages, chat)
  // !!!!!! eventually the first criteria should be set to Browse, not to Landing!!!!!
  let subNavHeading = '';
  let viewIndex;
  if (props.state.view === 'landing') {
    subNavHeading = "All Activities"
    viewIndex = 0;
  } else if (props.state.view === 'hosted'){
    subNavHeading = "Hosted Activities"
    viewIndex = 1;
  } else if (props.state.view === 'joined'){
    subNavHeading = "Joined Activities"
    viewIndex = 2;
  } else if (props.state.view === 'pending'){
    subNavHeading = "Pending Activities"
    viewIndex = 4;
  } else if (props.state.view === 'messages'){
    subNavHeading = "All Messages"
    viewIndex = 5;
  }

  const [value, setValue] = React.useState(viewIndex);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    if (newValue === 0) {
      props.setState({...props.state, view: 'browse'});
    } else if (newValue === 1) {
      props.setState({...props.state, view: 'hosted'});
    } else if (newValue === 2) {
      props.setState({...props.state, view: 'joined'});
    } else if (newValue === 3) {
      props.setState({...props.state, view: 'pending'});
    } else if (newValue === 4) {
      props.setState({...props.state, view: 'messages'});
    }
   
  };

  return (
    <div >
     <h2>{subNavHeading}</h2>
      <Tabs value={value} onChange={handleChange} aria-label="simple tabs">
        <Tab label="Browse" id="simple-tab-0" aria-controls="simple-tabpanel-0" />
        <Tab label="Hosted" id="simple-tab-1" aria-controls="simple-tabpanel-1" />
        <Tab label="Joined" id="simple-tab-2" aria-controls="simple-tabpanel-2" />
        <Tab label="Pending" id="simple-tab-3" aria-controls="simple-tabpanel-3" />
        <Tab label="Messages" id="simple-tab-4" aria-controls="simple-tabpanel-4" />
      </Tabs>
    </div>
  );
}

// How we would render different components associated with each tab if we choose to 
// {value === 0 && <div>Widdll it work?</div>}
// {value === 1 && <div>Widddddddll it work?</div>}
// {value === 2 && <div>Wilvl it work?</div>}
// {value === 3 && <div>Will  it work?</div>}
// {value === 4 && <div>Wiscsdfsll it work?</div>}
// {value === 5 && <div>Will it work?</div>}