


const AssignmentSubmission = require('../../modules/AssignmentSubmission');

// Submit assignment
exports.submitAssignment = async (req, res) => {
  try {
    const { studentName } = req.body;
    const filePath = req.file.path;

    const newSubmission = new AssignmentSubmission({ studentName, filePath });
    await newSubmission.save();

    res.status(201).json(newSubmission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit assignment' });
  }
};

// Get submission status by student name
exports.getAssignment = async (req, res) => {
  try {
    const submission = await AssignmentSubmission.findOne({ studentName: req.params.name });
    if (!submission) {
      return res.status(404).json({ message: 'No submission found' });
    }
    res.json(submission);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch submission' });
  }
};

// Delete submission
exports.deleteAssignment = async (req, res) => {
  try {
    await AssignmentSubmission.deleteOne({ studentName: req.params.name });
    res.json({ message: 'Submission deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete submission' });
  }
};




