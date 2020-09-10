const router = require("express").Router();

module.exports = db => {
  // Handle get request to retrieve all messages and join the host to the response
  router.get("/messages", (request, response) => {
    db.query(
      `
      SELECT
        messages.sender_id,
        messages.receiver_id,
        messages.activity_id,
        messages.text,
        activity_participants.user_id as host
      FROM messages
      JOIN activity_participants on activity_participants.activity_id = messages.activity_id
      WHERE activity_participants.status = 'host'
    `
    ).then(({ rows: messages }) => {
      response.json(messages);
    })
    .catch(err => console.log(err));
  });

  return router;
};