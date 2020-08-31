const router = require("express").Router();

module.exports = db => {
  router.get("/tags", (request, response) => {
    db.query(
      `
      SELECT
        *
      FROM tags
    `
    ).then(({ rows: tags }) => {
      response.json(tags);
    });
  });

  return router;
};
