const router = require("express").Router();

// module.exports = db => {
//   router.get("/activities", (request, response) => {
//     db.query(
//       `
//       SELECT
//         activities.id,
//         activities.user_id,
//         activities.name,
//         activities.num_of_participants, 
//         activities.frequency, 
//         activities.days_available, 
//         activities.timeframe,
//         activities.location, 
//         activities.skill_tag,
//         activities.tags,
//         activities.created_at,
//         activities.description
//       FROM activities
//       GROUP BY activities.id
//       ORDER BY activities.location, activities.created_at
//     `
//     ).then(({ rows: activities }) => {
//       response.json(activities);
//     });
//   });




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
          activities.description,
          activity_participants.user_id,
          activity_participants.status
        FROM activities
        LEFT JOIN activity_participants ON activities.id = activity_participants.activity_id
        WHERE activity_participants.status = 'host'
        GROUP BY activities.id, activity_participants.user_id, activity_participants.activity_id, activity_participants.status
        ORDER BY activities.location, activities.created_at
      `
      ).then(({ rows: activities }) => {
        response.json(activities);
      });
    });

  return router;
};
