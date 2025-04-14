const express = require('express');
const router = express.Router();
const CarePlan = require('../models/CarePlan');
const Patient = require('../models/Patient');
const auth = require('../middleware/auth');

// @route   POST /nurse/care-plan/:patientId
// @desc    Create or update a care plan for a patient
// @access  Private (Nurse only)
router.post('/care-plan/:patientId', auth('nurse'), async (req, res) => {
  const { patientId } = req.params;
  const { carePlan } = req.body;

  if (!Array.isArray(carePlan) || carePlan.length === 0) {
    return res.status(400).json({ message: 'Care plan must be a non-empty array' });
  }

  try {
    const patientExists = await Patient.findById(patientId);
    if (!patientExists) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    const updatedPlan = await CarePlan.findOneAndUpdate(
      { patientId },
      {
        patientId,
        carePlan,
        updatedBy: req.user.name
      },
      { upsert: true, new: true }
    );

    res.json({ message: 'Care plan updated successfully', data: updatedPlan });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
