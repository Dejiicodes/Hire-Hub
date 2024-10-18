const Job = require('../models/Job');

// Get list of jobs
exports.getJobs = async (req, res) => {
  try {
    const jobs = await Job.find();
    res.json(jobs);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Add a new job
exports.addJob = async (req, res) => {
  const { title, description, location } = req.body;

  try {
    const newJob = new Job({
      title,
      description,
      location,
    });

    await newJob.save();
    res.status(201).json({ message: "Job added successfully", job: newJob });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
