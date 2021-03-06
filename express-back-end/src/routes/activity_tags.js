const router = require("express").Router();

module.exports = db => {
  // Handle get request to retrieve activity_tags
  router.get("/activity_tags", (request, response) => {
    db.query(
      `
      SELECT
        activity_tags.activity_id,
        activity_tags.tag_id,
        tags.name
      FROM activity_tags
      JOIN tags on tags.id = activity_tags.tag_id
      `
    ).then(({ rows: activity_tags }) => {
      response.json(activity_tags);
    })
    .catch(err => console.log(err));
  });

  return router;
};