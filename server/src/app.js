const express = require("express");
const app = express();
const mongoose = require("mongoose");
require("./db/mongoose");

// To get json data and support parsing of application/json type post data
const bodyParser = require("body-parser");
app.use(bodyParser.json());

// To support cors origin plateform
const cors = require("cors");
app.use(cors());

const PORT = process.env.PORT || 5000;

// Import routes
const userRouter = require("./routes/user");
const reservationRouter = require("./routes/reservation");

// Resister router(endpoints)
app.use(userRouter);
app.use(reservationRouter);

// Make ready for production(Deploy the project)
if (process.env.NODE_ENV == "production") {
  app.use(express.static("client/build"));
  const path = require("path");
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});
