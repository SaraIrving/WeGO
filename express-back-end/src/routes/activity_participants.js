const router = require("express").Router();

module.exports = db => {
  router.get("/activity_participants", (request, response) => {
    db.query(
      `
      SELECT
        id,
        activity_id,
        user_id,
        created_at
      FROM activity_participants
    `
    ).then(({ rows: activity_participants }) => {
      response.json(activity_participants);
    });
  });

  return router;
};
