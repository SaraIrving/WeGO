const router = require("express").Router();

module.exports = db => {
  router.get("/users", (request, response) => {
    db.query(
      `
      SELECT
        id,
        name,
        avatar,
        city, 
        email, 
        password,
        created_at  
      FROM users
    `
    ).then(({ rows: users }) => {
      response.json(users);
    });
  });

  return router;
};