require('./environment');
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const db = require("./db");

// const io = require('socket.io')(App);

const http = require('http').createServer(App) // might need?
const io = require('socket.io')(http);


io.on('connection', socket => {
  socket.on('message', (message) => {
    if (message === 'update') {
      console.log("in the socket IF")
      io.emit('message', message)
    } else if ((typeof message) === 'object' && message.request_type === 'ask') {
      io.emit('message', message);
    } else {
      console.log('message received on server: ', message)
      db.query(`
      INSERT INTO messages (activity_id, user_id, text)
      VALUES ($1, $2, $3)
      `, [Number(message.currentActivityId), Number(message.loggedIn), message.message] )
      io.emit('message', {message})
    }
  })
})


// io.on('connection', socket => {
//   socket.on('message', (message) => {
//     if (message === 'update') {
//       console.log("socket got the 'update'!")
//       io.emit('message', 'update')
//     } else if (message.request_type === 'ask') {
//       console.log("ask received by socket on the server = ", message)
//       io.emit('message', message)

//     } else {
//       console.log('message received on server: ', message)
//       db.query(`
//       INSERT INTO messages (activity_id, user_id, text)
//       VALUES ($1, $2, $3)
//       `, [Number(message.currentActivityId), Number(message.loggedIn), message.message] )
  
//       io.emit('message', message)
//     }
//   })
// })

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

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));


App.get('/api/ap_count', (req, res) => {
    db.query(
      `
      SELECT
        COUNT(*)
      FROM activity_participants
      WHERE activity_id = $1 AND (status = 'host' OR status = 'accepted');
    `
    ,[Number(req.query.activity_id)])
    .then(({ rows: ap_count }) => {
      res.json(ap_count);
    });
});

App.get('/api/activity_tag_fetch', (req, res) => {
    db.query(
      `
      SELECT
        tags.name
      FROM tags
      LEFT JOIN activity_tags ON tags.id = activity_tags.tag_id
      WHERE activity_tags.activity_id = $1
    `
    ,[Number(req.query.tags)])
    .then(({ rows: tags }) => {
      res.json(tags);
    });
});


// App.use("/api", ap_count(db,activity_id));
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
// App.listen(PORT, () => {
//   // eslint-disable-next-line no-console
//   console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
// });
