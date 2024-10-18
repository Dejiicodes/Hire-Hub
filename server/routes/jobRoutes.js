const express = require('express');
const { getJobs, addJob } = require('../controllers/jobController');
const { verifyToken, isAdmin } = require('../middleware');
const router = express.Router();

router.post('/jobs', verifyToken, async (req, res) => {
  const job = new Job({
    title: req.body.title,
    description: req.body.description,
    postedBy: req.user.id, // Set the user ID of the person posting the job
  });
  await job.save();
  res.status(201).send(job);
});

router.post('/jobs/apply/:id', verifyToken, async (req, res) => {
  const job = await Job.findById(req.params.id);
  if (!job) return res.status(404).send({ message: 'Job not found' });

  job.applicants.push(req.user.id); // Add user to job applicants
  await job.save();
  res.send({ message: 'Application successful' });
});

module.exports = router;
