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

  router.post("/users", (request, response) => {
    db.query(
      `
      INSERT INTO users (name, avatar, city, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `
    ,[ request.body.stateForm.name, request.body.stateForm.avatar, request.body.stateForm.city, request.body.stateForm.email, request.body.stateForm.password ]).then(({ rows: users }) => {
      response.json(users);
    });
  });

  return router;
};