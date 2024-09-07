const express = require('express');
const Device = require('../models/Device');
const router = express.Router();

// Create new booking
router.post('/', async (req, res) => {
  const { user, type, date, startTime, endTime } = req.body;
  try {
    const newDevice = new Device({ user, type, date, startTime, endTime });
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(400).json({ error: 'Error saving the booking' });
  }
});

// Fetch all bookings
router.get('/', async (req, res) => {
  try {
    const devices = await Device.find();
    res.status(200).json(devices);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching devices' });
  }
});

// Delete a booking
router.delete('/:id', async (req, res) => {
  try {
    await Device.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Booking deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting booking' });
  }
});

module.exports = router;
