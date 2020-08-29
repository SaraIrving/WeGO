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

// Express Configuration
App.use(BodyParser.urlencoded({ extended: false }));
App.use(BodyParser.json());
App.use(Express.static('public'));

// Sample GET route
App.get('/api/data', (req, res) => res.json({
  message: "Seems to work!",
}));


App.use("/api", activity_participants(db));
App.use("/api", activities(db));
App.use("/api", users(db));


App.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Express seems to be listening on port ${PORT} so that's pretty good 👍`);
});
