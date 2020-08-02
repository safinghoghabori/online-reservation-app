const mongoose = require("mongoose");
const { MONGOURI } = require("../config/keys");

//Establish the connection
mongoose.connect(MONGOURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//check wheather connection is established or not
mongoose.connection.on("connected", () => {
  console.log("connected successfully!");
});

mongoose.connection.on("error", (error) => {
  console.log(`Error! ${error}`);
});
