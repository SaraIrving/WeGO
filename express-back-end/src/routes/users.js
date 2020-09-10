const router = require("express").Router();

module.exports = db => {
  // Handle get request to retrieve all users
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
    })
    .catch(err => console.log(err));
  });

  // Handle post to users to create new users on signup
  router.post("/users", (request, response) => {
    let city = request.body.stateForm.city
    db.query(
      `
      INSERT INTO users (name, avatar, city, email, password)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `
    ,[ request.body.stateForm.name, request.body.stateForm.avatar, city[0].toUpperCase() + city.substring(1), request.body.stateForm.email.toLowerCase(), request.body.stateForm.password ]).then(({ rows: users }) => {
      response.json(users);
    })
    .catch(err => console.log(err));
  });

  return router;
};