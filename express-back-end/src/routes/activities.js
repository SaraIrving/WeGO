const router = require("express").Router();

module.exports = db => {
  router.get("/activities", (request, response) => {
    db.query(
      `
      SELECT
        activities.id,
        activities.user_id,
        activities.name,
        activities.num_of_participants, 
        activities.frequency, 
        activities.days_available, 
        activities.timeframe,
        activities.location, 
        activities.skill_tag,
        activities.tags,
        activities.created_at,
        activities.description  
      FROM activities
    `
    ).then(({ rows: activities }) => {
      response.json(activities);
    });
  });

  return router;
};
