const mongoose = require('mongoose');

const PatientSchema = new mongoose.Schema({
  name: String,
  age: Number,
  medicalHistory: String
});

module.exports = mongoose.model('Patient', PatientSchema);
