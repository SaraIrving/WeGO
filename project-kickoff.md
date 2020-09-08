
## Final Project Kickoff
## Pick a Project

- Buddy Finder App
- name: WeGo

## Tech Choices
- https://www.ipify.org/ --- find the IP address of the person loggin in 
- https://ipstack.com/ --- find the city based on the IP address (get 10 call on free key, may need to update in future based on usage, used in axios request in teh login function )

<!-- - They have the form: As a ___, I want to _, because ____.
- eg. As a user, I want to be able to save posts, because I want to review them later.
- User stories can also be negated: \s a __, I shoul
dn't be able to _, because ___.
- eg. As a user, I shouldn't be able to edit other users posts, because I don't own those posts. -->

## Project description

- Our app helps connect individuals and teams around real-world and online recreational activities. It will accomplish this by allowing users to find and join posted activities, and also to post their own activities for others to join. Activities will display the current participants skill level, remaining players needed, location, and other useful information to help match the right people together for the right activity. Features will include real time chat, advanced activity filtering, and possibly geolocation, machine-learning in the form of giving smart suggestions.

- problem that it's solving: User wants to do an activity that takes doubles or teams of people and they can use the app to match the right people for the activity.

- target audience: 20 - 75yr old men and women who are looking for others to do an activity with.

## Team members

- Sara
- Jeremy

## Stories

- As a user I want to visit the site and search or browse categories for a particular activity to join
- As a user or a participant I want to be able to chat with the activity's host and ask particular questions
- As a user I want to be able to join an activity of interest
- As a user I want to see a list of pending activities that i've joined
- As a user if I don't find the activity i'm looking for, I want to be able to create my own activity posting
- As an activity host I want to be able to receive chats from users who are interested in my activity
- As an activity host I want to be able to accept or reject users who are asking to join my activity
- As a host I want to send a message to all activity participants*

### Stretch stories

- ** As a host, I get a notification for new join requests
- ** Based on a users previous activities, there's a smart suggestion feature that shows me relavent activities I might be particularly interested in joining
- actualy login Functionality
- deployment 
- As a user, my location is dynamicly inferred (geolocation)-ISS spotter: location based on IP address 
- As a online user, the app gives me relative timeframes based on timezones - check out moments.js
- As a user, I can get new message notifications

## User Flow / Pages

- First visit, landing page, which teaches them about the app, CTA to signup / login
- All signed in users can view posted activities
- Your Activities page
  - Your joined activities
  - Your pending activities
  - Your hosted activies - edit, delete
  - Post a new activity button
- Messages page
  - Each message is tied to a particular activity


## Tables data kinda

Posts:
  - in person
    - activity name
    - Number of players - Changes to FULL automatically - waitlist?
    - city
    - frequency 1 time, vs weekly, biweekly, monthly
    - ideal days
    - ideal timeframe (morning, evening, daytime)
    - location of activity?
    - Skill level tag (Casual, Mixed Levels, Beginner, Intermediate, Advanced, Terrible)
    - tags - predefined that host can select from, then users can search
    - current participant(s)
      - name
      - avatar
      - password
      - email
      - city
    - apply button **
    - chat button ** 

  - online
    - activity name
    - frequency 1 time, vs weekly, biweekly, monthly
    - ideal days
    - ideal timeframe (morning, evening, daytime)
    - Skill level tag (Casual, Mixed Levels, Beginner, Intermediate, Advanced, Terrible)
    - current participant(s)
      - name
      - avatar
      - password
      - email
      - city

Activity
  - Hiking
  - Fishing
  - Kayaking
  - Raquet sports
  - spikeball
  - Road Biking
  - Mountain Biking
  - Snowboarding
  - X Country Ski
  - Downhill Skiiing
  - Billiards
  - Ping Pong
  - Swimming
  - Rock Climbing
  - Caving
  - Hangliding
  - disc golf


Hiking
Fishing
Kayaking
Raquet sports
spikeball
Road Biking
Mountain Biking
Snowboarding
X Country Ski
Downhill Skiiing
Billiardsv
Ping Pong
Swimming
Rock Climbing
Caving
Hangliding
disc golf



Online
  - Quiz party
  - Gaming
  - Language Conversational activity

Users
  - My activities
   - Joined
     - access to those posts / chat
   - Hosting
     - admin capabilities


Functionality
  - Admin chat
  - 




## APP DETAILS

Teck Stack
- React, Express, PostgreSQL
- Sockets.io for chat? or Firebase
- Moments.js for 

## Tables

- As a user I want to visit the site and search or browse categories for a particular activity to join
- As a user I want to be able to chat with the activity's host and ask particular questions
- As a user I want to be able to join an activity of interest
- As a user I want to see a list of upcoming activities that i've joined
- As a user if I don't find the activity i'm looking for, I want to be able to create my own activity posting
- As a user I want to be able to receive chats from users who are interested in my activity
- As a user I want to be able to accept or reject users who are asking to join my activity

### Stretch stories

- As a host, I get a notification for new join requests, button takes you to hosted and removes banner **** .75 --- 10 hrs 
- As a user, I can get new message notifications ** .5 --- 2-3 hrs?
- Finish Edit Form **** ~.75 ---
- Search Bar MatMultiValues **** ~2 --- 
- Based on a users previous activities, there's a smart suggestion feature that shows me relavent activities I might be particularly interested in joining *
- As a user I can sign up *** ~1 --- 
- Asterisk the password input ***** .05 ---
- My location is dynamicly inferred on sign in (geolocation) ** ~1 ---
- Make the images picker better  0 1 tags loop through them then loop through my object, and when they match - ignore outdoor ** .75 --- 
- responsive ****
- style landing page ** 1.5

- Beef up seed data ~ 2 **** --- 
  - Edmonton ---

- Turn on and test geo again ~ .5 - 1 **** ---
- Make sure demo is bug free ~ .5 - 2 ***** 
- Content landing page ** .5
- could make it super pretty **** ~ chat, create form, spruce up login page ~ 1.5 - 2
- animations ** ~ .75
  - render views in subnav maybe instead .5 *

- good QA, check and fix bugs ~ .75 - 4hrs 
- clean commented code **** ~ 1 - 3
- responsive **** ~ 3 - 4
- heroku ** ~ 2 - 4

- prepare presentation - 1 day


tuesday evening, would be nice to start presentation branstorming --

- Signup




  - PK:id
  - FK: user_id (host)
  - Description
  - activity name
  - Number of players - Changes to FULL automatically - waitlist?
  - city
  - frequency 1 time, vs weekly, biweekly, monthly
  - ideal days
  - ideal timeframe (morning, evening, daytime)
  - location of activity?
  - Skill level tag (Casual, Mixed Levels, Beginner, Intermediate, Advanced, Terrible)
  - tags (outdoor / online / winter / spikeball / hiking etc..) - predefined that host can select from, then users can search
  - created_at

Activity_participants
  - id
  - FK: activity_id
  - FK: user_id
  - status
  - created_at

Messages
  - PK: id
  - FK: activity_id
  - FK: activity.user_id
  - FK: user.id
  - text
  - created_at



## ERD
- 

## Routes
- 

## List it out
- 


## Wireframes
- Draw out the structure of your web pages
- This will make it much easier to build out these pages later
- This is also a great opportunity to get input from all of the team members
- Design matters... however you are a developer, not a designer
- Get inspiration from websites you visit

## Landing Page Wireframes
- 

## Tech Choices
- 

## SPA vs Multi-page App
- 

## Git
- 

## Splitting up the Work
- Horizontally - whole team working on front-end or back-end at the same time
- Vertically - divide the work between front-end and back-end
- Pair Programming - working together on the same tasks

## Communication
- Make sure to communicate with your team members
- Use Slack, iMessage, Google Hangouts, whatever... just make sure that everyone is on the same page

## Github Projects
- Github has a built-in project board (similar to a kanban board)

## Deployment
- Decide if you want/need to deploy your application to the cloud
- Ask a mentor for assistance/advice if your team decides to deploy

## Work Flow
- finish state planning 
- build out componenets
- chat functionality (mid to late next week)

## Presentation
** scenarios
- Signing up, Jeremy Lives in calgary, Last day of vancouver trip, I'm looking for a doubles badminton in calgary, mention how activities are displayed based on our city, but change to calgary
- Peruse some activities, search by intermediate, not going to find it
- So create their activity
- Show hosted view

** swap screens
- sign in as a vancouver person, but decide to look for activities in Calgary that you can do when you visit next week...would show off the city filtering feature
- Tori from vancouver, but currently in calgary logging in displays calgary plugs our geo feature
- so we can show the hosted-with accepted and pending(accept and watch person moved from pending to accepted list), already have messages in messages Dashboard
- then browse for activities, join one and then remove the request
- find the first persons activity, Message the host for some clarifying info-have chat back and forth, navigate away from the chat to submit a join request, navigate back to the chat via the chat notification from Person 1 confirming they have accepted them, then display Joined activities view. 

- end of demo


5 talking points
- 


## React Build

### Components

- Button - Jeremy *
- Input - Sara *
- Textarea - Jeremy *
- Dropdown - Sara *
- RadioBox - Jeremy *
- MultiSelect - Together *
- NotificationDot - Sara *
- MutliValues - Jeremy *
- Tag - Sara *
	- Activity Form
    - MatButton
    - MatInput
    - MatMultiValues
  - Login Form / Signup
    - MatButton
    - MatInput
	- Navbar *
    - MatButton
	- Footer *
	- Landing 
    - MatButton
	- BrowseDashboard
    - MatMultiValues
    - SubNav
    - ActivityList
      - ActivityCard
        - MatButton
	- Participants
    - MatButtons (conditionally)
    - Notification Dot (Conditionally)
	- ParticipantsList
    - Participants *
	- JoinedDashboard
    - SubNav *
    - ActivityList *
	- HostedDashboard
    - SubNav *
    - ActivityList *
      - conditionally: ParticipantsList - props.accepted / props.pending
  - ActivityList *
    - ActivityCard *
	- MessageCard
    - Participant *
      - Notification Dot
      - MatButton
	- MessageDashboard
   - SubNav
    - MatButton
   - MessagesList
   	- MessageCard
	- ChatCard
    - MatButton
    - MatInput
    - Participant
	- ChatPage
    - SubNav
    - ChatCard
  - SubNav
  - Signup


### State

- loggedIn: user_id | null
- activities: [{activity}] | [] (with js, add participants to each activity)
- filters: [tag1, tag2] | [] (update activities state based on filters list)
- view: ‘signin’ | landing (login, browse, create, joined, hosted, pending, messages, chat)
- messages: [{}] | [] (based on user_id all relavent messages for them)




### Troubleshooting

#### psql connection errors

- Ran into issue where trying to 'npm start' in vagrant, was throwing psql error, saying psql could not authenticate user 'vagrant'

- Couldn't really pinpoint source of problem with mentor, but he helped us get it working through a workaround, involving ditching vagrant and only running it off of local host.

  1. Install homebrew with command: `$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

  2. Install Postgres with command: `$ brew install postgresql`

  3. Then run command: `$ brew services start postgresql`

  4. Then run command: `$ psql postgres`

  5. Then run: `$ CREATE USER jeremyhuot;` 'jeremyhuot' is my main computer user

  6. Then run: `$ CREATE DATABASE jeremyhuot;`

  7. Then run: `$ ALTER USER jeremyhuot WITH superuser createrole createdb replication;`

  8. Then run: `$ psql`

  9. Then run: `$ CREATE USER development WITH PASSWORD 'development';`

  10. Then run: `$ CREATE DATABASE final OWNER development;`

  11. Then run: `$ ALTER USER development WITH superuser createrole createdb replication;`

  12. Then run: `$ npm start` in project in host machine (not vagrant)


