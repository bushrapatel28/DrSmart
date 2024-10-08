const router = require("express").Router();

module.exports = db => {
  router.get("/timeslots", (req, res) => {
    db.query(`
      SELECT
      json_agg(
        json_build_object(
          'id', time_slots.id,
          'start_time', time_slots.start_time,
          'end_time', time_slots.end_time
        )
      ) as time_slots_data
      FROM time_slots
    `).then(({ rows }) => {
      res.json(rows[0].time_slots_data);
    });
  });

  router.post("/:id/availability/new", (req, res) => {
    // Extract schedule details from request body
    const {
      all_dates,
      vacant,
      all_time_slot_ids
    } = req.body;

    const doctor_id = 4;
    // const doctor_id = req.params.id;

    console.log("DATE ARRAY Length", all_dates.length);
    console.log("DATE ARRAY", all_dates);
    console.log("TIME ARRAY Length", all_time_slot_ids.length);
    console.log("TIME ARRAY", all_time_slot_ids);
 
    let index = 0;
    const arrSize = all_dates.length;
    let allPromises = [];                 // Initialize an array to store all the promises
    let success = false;

    while (index < arrSize) {
      // Collect promises for each date
      // const datePromises = 
      all_dates[index].dates.map((date) => {
        // Collect promises for each time slot within the current date
        // return 
        all_time_slot_ids[index].time_ids.map((time_id) => {
          console.log(`INSIDE the MAP`, date.slice(0, 10), time_id);     
          // const date = each_date.slice(0, 10);                          //YYYY-MM-DD Format without the Time
          // console.log("NEW DATE FORMAT", date);
          
          // Insert new availability into the database
          db.query(`
            INSERT INTO availabilities (date, vacant, time_slot_id, doctor_id)
            VALUES ($1, $2, $3, $4)
            RETURNING *
          `,[date, vacant, time_id, doctor_id]
          )
          .then(( { rows } ) => {
            console.log("SUCCESS");
            console.log(rows[0]);
            success = true;
            // return rows[0];  // Return the result for tracking purposes
          })
          .catch((err) => {
            console.error("Error creating availability:", err);
            success = false;
            throw err;  // Propagate error to handle in `Promise.all`
            // res.status(500).json({ error: "Internal server error" });
          });

        });
        console.log("NEXT LOOP");
      });
      
      // console.log("DATE PROMISES", datePromises);
      // // Flatten the inner array of promises and add to allPromises
      // allPromises.push(...datePromises.flat());  // Collect all promises for this index
      // console.log("ALL PROMISES", allPromises);
      index++;
    }

    setTimeout(() => {
      if(index === arrSize) {
        if(success) {
          res.status(201).json({
            message: "Availability added successfully",
          })
        } else {
          res.status(500).json({ error: "Internal server error" });
        }
      }
    }, 2000);
    
    // console.log("LINE 91", allPromises);
    // // Use Promise.all to wait for all promises to resolve
    // Promise.all(allPromises)
    //   .then((results) => {
    //     console.log("All availabilities inserted successfully.");
    //     res.status(201).json({
    //       message: "All availabilities added successfully",
    //       availabilities: results,  // Return all inserted records
    //     });
    //   })
    //   .catch((err) => {
    //     console.error("Error inserting availabilities:", err);
    //     res.status(500).json({ error: "Internal server error" });
    //   })
  });

  return router;
}