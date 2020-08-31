const router = require("express").Router();

module.exports = (db,id) => {
  router.get(`/ap_count/${id}`, (request, response) => {
    db.query(
      `
      SELECT
        COUNT(*)
      FROM activity_participants
      WHERE activity_id = ${id}
    `
    ).then(({ rows: ap_count }) => {
      response.json(ap_count);
    });
  });

  return router;
};
