const express = require("express");
const Reservation = require("../models/reservation");
const router = express.Router();

router.post("/createreservation", async (req, res) => {
  try {
    // console.log(req.body);
    const { fullname, email, persons, tables, createdBy } = req.body;

    if (!fullname || !email || !persons || !tables) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const reservation = new Reservation({
      fullname,
      email,
      persons,
      tables,
      createdBy,
    });
    await reservation.save();
    res.status(200).json({ reservation });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/displayreservation/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const data = await Reservation.find({ createdBy: req.params.id });
    res.status(200).json({ data });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.get("/defaulvalues/:id", async (req, res) => {
  try {
    // console.log(req.params.id);
    const data = await Reservation.findById({ _id: req.params.id });
    res.status(200).json(data);
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.patch("/update/:id", async (req, res) => {
  try {
    const { fullname, email, persons, tables, createdBy } = req.body;

    if (!fullname || !email || !persons || !tables) {
      return res.status(400).json({ error: "All fields are required!" });
    }

    const updateData = await Reservation.findByIdAndUpdate(
      { _id: req.params.id },
      {
        fullname,
        email,
        persons,
        tables,
        createdBy,
      },
      {
        new: true,
      }
    );

    await updateData.save();
    res.status(200).json({ updateData });
  } catch (error) {
    res.status(400).json({ error });
  }
});

router.delete("/delete/:id", async (req, res) => {
  try {
    const deleteData = await Reservation.findByIdAndDelete({ _id: req.params.id });

    if (!deleteData) {
      return res.status(404).json({ error: "Something went wrong!" });
    }
    res.status(200).json({ success: "Reservation deleted successfully" });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
