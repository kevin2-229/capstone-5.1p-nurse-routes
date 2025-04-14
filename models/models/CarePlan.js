const mongoose = require('mongoose');

const CareTaskSchema = new mongoose.Schema({
  task: String,
  frequency: String,
  notes: String
});

const CarePlanSchema = new mongoose.Schema({
  patientId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Patient',
    required: true
  },
  carePlan: [CareTaskSchema],
  updatedBy: String,
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('CarePlan', CarePlanSchema);
