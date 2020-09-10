const router = require("express").Router();

module.exports = db => {
  // Handle get request to retrieve tags
  router.get("/tags", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM tags
    `
    ).then(({ rows: tags }) => {
      response.json(tags);
    })
    .catch(err => console.log(err));
  });

  return router;
};
