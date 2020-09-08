const router = require("express").Router();


  module.exports = db => {
    router.get("/activities", (request, response) => {
      db.query(
        `
        SELECT
          activities.id,
          activities.name,
          activities.num_of_participants, 
          activities.frequency, 
          activities.days_available, 
          activities.timeframe,
          activities.location, 
          activities.skill_tag,
          activities.created_at,
          activities.description,
          activity_participants.user_id,
          activity_participants.status
        FROM activities
        LEFT JOIN activity_participants ON activities.id = activity_participants.activity_id
        WHERE activity_participants.status = 'host'
        GROUP BY activities.id, activity_participants.user_id, activity_participants.activity_id, activity_participants.status
        ORDER BY activities.id, activities.created_at
      `
      ).then(({ rows: activities }) => {
        response.json(activities);
      });
    });

    router.post("/activities",(request, response) => {
      console.log('made it to server');
      console.log('1 req body: ', request.body.stateForm);
      db.query(
        `INSERT INTO activities (name, num_of_participants, frequency, days_available, timeframe, location, skill_tag, description)
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;`
      ,[request.body.stateForm.activity_name, Number(request.body.stateForm.max_participants), request.body.stateForm.frequency.join(', '), request.body.stateForm.days.join(', '), request.body.stateForm.timeframe.join(', '), request.body.stateForm.location, request.body.stateForm.skill_level.join(', '), request.body.stateForm.description])
      .then(({ rows: activity }) => {
        console.log('2 activity :', activity);
        console.log('2 req body: ', request.body.stateForm);
        // console.log("in activities.js-activity.id = ", activity.id)

        db.query(
          `
          INSERT INTO activity_participants (activity_id, user_id, status)
          VALUES ($1, $2, $3)
          RETURNING *;
        `, [Number(activity[0].id), Number(request.body.stateForm.logged_in_user_id), "host"])
        .then(({rows: activity_participants}) => {
          console.log('3 activity :', activity_participants);
          console.log('3 req body: ', request.body.stateForm);
          console.log('tags= ', request.body.stateForm.tags);

          for (let tag of request.body.stateForm.tags) {
            console.log("In the loop***********")
            db.query(
              `
              INSERT INTO activity_tags (activity_id, tag_id)
              VALUES($1, $2)
              RETURNING *;`
              , [Number(activity_participants[0].activity_id), Number(tag.id)]
            )
            .then(({ rows: activity_tags}) => {
              console.log('response: ', activity_tags)
              // response.json(activity[0]);
              response.send('completed')
            })
          }
        })

      })
      .catch(err => console.log(err));


    });

    router.put("/activities",(request, response) => {
      console.log('made it to server');
      console.log('1 req body: ', request.body.stateEdit);
      db.query(
        `UPDATE activities 
        SET
        name = $1,
        num_of_participants = $2,
        frequency = $3,
        days_available = $4,
        timeframe = $5,
        location = $6,
        skill_tag = $7,
        description = $8
        WHERE id = $9
        `
      ,[request.body.stateEdit.activity_name, Number(request.body.stateEdit.max_participants), request.body.stateEdit.frequency.join(', '), request.body.stateEdit.days.join(', '), request.body.stateEdit.timeframe.join(', '), request.body.stateEdit.location, request.body.stateEdit.skill_level.join(', '), request.body.stateEdit.description, Number(request.body.stateEdit.activity_id)])
      .then(({ rows: activity }) => {
        console.log('2 activity :', activity);
        console.log('2 req body: ', request.body.stateEdit);
        // console.log("in activities.js-activity.id = ", activity.id)
        for (let tag of request.body.stateEdit.tags) {
          db.query(
            `
            UPDATE activity_tags 
            SET
            tag_id = $2
            WHERE activity_id = $1
            `
            , [Number(request.body.stateEdit.activity_id), Number(tag.id)])
        }

      })
      .catch(err => console.log(err));
    });

    router.delete("/activities", (request, response) => {
      console.log("inside the activities DELETE back end");

      db.query(
        `
        DELETE
        FROM activities
        WHERE id = $1
        `
        , [Number(request.query.activity_id)]
      ).then(({ rows: activities }) => {
        console.log("after the delete in activites DELETE!")
        response.json(activities);
      });
    })

  return router;
};
