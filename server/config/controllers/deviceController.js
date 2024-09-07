const Device = require('../models/deviceModel');

// @desc    Get all devices
// @route   GET /api/devices
const getDevices = async (req, res) => {
  try {
    const devices = await Device.find();
    res.json(devices);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Add a device booking
// @route   POST /api/devices
const addDevice = async (req, res) => {
  const { user, type, date, startTime, endTime } = req.body;

  try {
    const newDevice = new Device({ user, type, date, startTime, endTime });
    await newDevice.save();
    res.status(201).json(newDevice);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDevices, addDevice };
