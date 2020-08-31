const router = require("express").Router();

module.exports = db => {
  router.get("/activity_tags", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM activity_tags
    `
    ).then(({ rows: activity_tags }) => {
      response.json(activity_tags);
    });
  });

  return router;
};