const router = require("express").Router();

module.exports = db => {
  // Handle get request to retrieve activity_participants
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
    })
    .catch(err => console.log(err));
  });

  // Handle updating activity_participants status
  router.put("/activity_participants", (request, response) => {
    db.query(
      `
      UPDATE activity_participants
      SET status = $3
      WHERE activity_id = $1 AND user_id = $2 AND status <> 'null'
      `
      , [Number(request.query.activity_id), Number(request.query.user_id), request.query.status]
    ).then(({ rows: activity_participants }) => {
      response.json(activity_participants);
    })
    .catch(err => console.log(err));
  });

  // Handle adding new activity_participants
  router.post("/activity_participants", (request, response) => {
    
    db.query(
      `
      INSERT INTO activity_participants (activity_id, user_id)
      VALUES ($1, $2);
      `
      , [Number(request.body.activity_id), Number(request.body.user_id)]
    ).then(({ rows: activity_participants }) => {
      response.json(activity_participants);
    })
    .catch(err => console.log(err));
  });

  // Handle deleting activity_participants
  router.delete("/activity_participants", (request, response) => {

    db.query (
      `
      DELETE
      FROM activity_participants
      WHERE activity_id = $1 AND user_id = $2
      `
      , [Number(request.query.activity_id), Number(request.query.user_id)]
    ).then(({ rows: activity_participants }) => {
      response.json(activity_participants);
    })
    .catch(err => console.log(err));
  });

  return router;
};
