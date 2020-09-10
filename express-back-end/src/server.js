require('./environment');
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const db = require("./db");

const http = require('http').createServer(App);
const io = require('socket.io')(http);

// Listen for socket messages from front end clients
io.on('connection', socket => {
  socket.on('message', (message) => {
    // If message is 'update' send it back to refresh all clients state
    if (message === 'update') {
      io.emit('message', message)
      // If it's an ask, send it back as ask
    } else if ((typeof message) === 'object' && message.request_type === 'ask') {
      io.emit('message', message);
      // If it's a new chat message, add it to db and send back to client
    } else if ((typeof message) === 'object' && message.request_type === 'newMessage') {
      db.query(`
      INSERT INTO messages (activity_id, sender_id, receiver_id, text)
      VALUES ($1, $2, $3, $4)
      `, [Number(message.currentActivityId), Number(message.loggedIn), Number(message.currentChatRecipient), message.message] )
      io.emit('message', message)
    }
  })
})

// require routes
const activity_participants = require("./routes/activity_participants");
const activities = require("./routes/activities");
const users = require("./routes/users");
const tags = require("./routes/tags");
const activity_tags = require("./routes/activity_tags");
const messages = require("./routes/messages");

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Handle request to get all activity participants for a particular activity based on it's ID
App.get('/api/ap_count', (req, res) => {
    db.query(
      `
      SELECT
        COUNT(*)
      FROM activity_participants
      WHERE activity_id = $1 AND (status = 'host' OR status = 'accepted');
    `
    ,[Number(req.query.activity_id)]) // req.query.activity_id is a query parameter captured from the url
    .then(({ rows: ap_count }) => {
      res.json(ap_count);
    })
    .catch(err => console.log(err));
});

// Handle request to retrieve all tags for a particular activity based on its ID
App.get('/api/activity_tag_fetch', (req, res) => {
    db.query(
      `
      SELECT
        tags.name
      FROM tags
      LEFT JOIN activity_tags ON tags.id = activity_tags.tag_id
      WHERE activity_tags.activity_id = $1
    `
    ,[Number(req.query.tags)]) // req.query.tags is a query parameter captured from the url
    .then(({ rows: tags }) => {
      res.json(tags);
    })
    .catch(err => console.log(err));
});

// Handle request to retrieve all activities sorted by a particular city
App.get('/api/activitiesSorted', (req, res) => {
  db.query(
    `
    SELECT
      activities.id,
      activities.name,
      activities.num_of_participants, 
      activities.frequency, 
      activities.days_available, 
      activities.timeframe,
      activities.location, 
      activities.skill_tag,
      activities.created_at,
      activities.description,
      activity_participants.user_id,
      activity_participants.status,
      users.city
    FROM activities
    LEFT JOIN activity_participants ON activities.id = activity_participants.activity_id
    JOIN users ON activity_participants.user_id = users.id
    WHERE activity_participants.status = 'host' AND users.city = $1
    GROUP BY activities.id, users.city, activity_participants.user_id, activity_participants.activity_id, activity_participants.status
    ORDER BY activities.created_at DESC
  `
  ,[req.query.city]).then(({ rows: activities }) => { // req.query.city is another query parameter
    res.json(activities);
  })
  .catch(err => console.log(err));
});

// Prepend /api/ to all requests
App.use("/api", activity_participants(db));
App.use("/api", activities(db));
App.use("/api", users(db));
App.use("/api", tags(db));
App.use("/api", activity_tags(db));
App.use("/api", messages(db));


http.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});