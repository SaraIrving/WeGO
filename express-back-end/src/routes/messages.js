const router = require("express").Router();

module.exports = db => {
  router.get("/messages", (request, response) => {
    db.query(
      `
      SELECT
        messages.user_id,
        messages.activity_id,
        messages.text,
        activity_participants.user_id as host
      FROM messages
      JOIN activity_participants on activity_participants.activity_id = messages.activity_id
      WHERE activity_participants.status = 'host'
    `
    ).then(({ rows: messages }) => {
      response.json(messages);
    });
  });

  return router;
};