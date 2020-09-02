const router = require("express").Router();

module.exports = db => {
  router.get("/activity_participants", (request, response) => {
    db.query(
      `
      SELECT
        activity_participants.id,
        activity_participants.activity_id,
        activity_participants.user_id,
        activity_participants.created_at,
        activity_participants.status
      FROM activity_participants
      GROUP BY activity_participants.activity_id, activity_participants.id
    `
    ).then(({ rows: activity_participants }) => {
      response.json(activity_participants);
    });
  });

  router.put("/activity_participants", (request, response) => {
    console.log("made it to the activity_p PUT!")
    db.query(
      `
      INSERT INTO activity_participants (activity_id, user_id)
      VALUES ($1, $2);
      `
      , [request.body.activity_id, request.body.user_id]
    ).then(({ rows: activity_participants }) => {
      console.log("after the put!")
      response.json(activity_participants);
    });
  });

  return router;
};
