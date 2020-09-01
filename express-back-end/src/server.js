require('./environment');
const Express = require('express');
const App = Express();
const BodyParser = require('body-parser');
const PORT = 8080;
const db = require("./db");

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
  let id = req.query.activity_id
    db.query(
      `
      SELECT
        COUNT(*)
      FROM activity_participants
      WHERE activity_id = ${id}
    `
    ).then(({ rows: ap_count }) => {
      res.json(ap_count);
    });
});

App.get('/api/activity_tag_fetch', (req, res) => {
  let tagId = req.query.tags
    db.query(
      `
      SELECT
        tags.name
      FROM tags
      JOIN activity_tags ON tags.id = activity_tags.tag_id
      WHERE activity_tags.activity_id = ${tagId}
    `
    ).then(({ rows: tags }) => {
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



App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
