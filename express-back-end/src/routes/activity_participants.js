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

  return router;
};
