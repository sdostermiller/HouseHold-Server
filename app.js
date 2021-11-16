require("dotenv").config();

const Express = require("express");
const db = require("./db");

const app = Express();


const middleware = require("./middleware");
const controllers = require("./controllers");

// Parse the body of all requests as JSON
app.use(Express.json());
app.use(require("./middleware/headers"));

app.use("/user", controllers.User);
app.use("/house", controllers.House);
app.use("/list", controllers.List);
app.use("/item", controllers.Item);

// app.use(middleware.validateSession); 

const resetDatabase = {force:true}
db.authenticate()
// add a resetDatabase inside the db.sync to drop all your tables if needed
// example:  .then(() => db.sync(resetDatabase)) inserting text to initiate database restoration in heroku
  .then(() => db.sync(  ))
  .then(() =>
    app.listen(process.env.PORT, () => {
      console.log(`[server]: App is listening on ${process.env.PORT}`);
    })
  )
  .catch((e) => {
    console.log("[server]: Server Crashed");
    console.log(e);
  });
