
## Final Project Kickoff
## Pick a Project

- Buddy Finder App
- name: 

RecHub
Rec Network
RecConnect
ActiveHub
ActiveRec
Central Rec
Community

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
- As a user I want to be able to chat with the activity's host and ask particular questions
- As a user I want to be able to join an activity of interest
- As a user I want to see a list of upcoming activities that i've joined
- As a user if I don't find the activity i'm looking for, I want to be able to create my own activity posting
- As a user I want to be able to receive chats from users who are interested in my activity
- As a user I want to be able to accept or reject users who are asking to join my activity

### Stretch stories

- As a host, I get a notification for new join requests
- Based on a users previous activities, there's a smart suggestion feature that shows me relavent activities I might be particularly interested in joining
- As a user, my location is dynamicly inferred (geolocation)
- As a online user, the app gives me relative timeframes based on timezones
- As a user, I can get new message notifications

## User Flow / Pages

- First visit, landing page, which teaches them about the app, CTA to signup / login
- All signed in users can view posted activities
- Your Activities page
  - Your joined activities
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

## Tables

- As a user I want to visit the site and search or browse categories for a particular activity to join
- As a user I want to be able to chat with the activity's host and ask particular questions
- As a user I want to be able to join an activity of interest
- As a user I want to see a list of upcoming activities that i've joined
- As a user if I don't find the activity i'm looking for, I want to be able to create my own activity posting
- As a user I want to be able to receive chats from users who are interested in my activity
- As a user I want to be able to accept or reject users who are asking to join my activity

### Stretch stories

- As a host, I get a notification for new join requests
- Based on a users previous activities, there's a smart suggestion feature that shows me relavent activities I might be particularly interested in joining
- As a user, my location is dynamicly inferred (geolocation)
- As a online user, the app gives me relative timeframes based on timezones
- As a user, I can get new message notifications


Users
  - PK:id
  - name
  - avatar
  - password
  - email
  - city
  - created_at

Activities
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

## Presentation
- 


5 talking points
- 



