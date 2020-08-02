const mongoose = require("mongoose");

const reservationSchema = mongoose.Schema({
  fullname: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  persons: {
    type: Number,
    required: true,
  },
  tables: {
    type: Number,
    required: true,
  },
  createdBy: {
    type: String,
    required: true,
  },
});

const Reservation = mongoose.model("Reservation", reservationSchema);

module.exports = Reservation;
