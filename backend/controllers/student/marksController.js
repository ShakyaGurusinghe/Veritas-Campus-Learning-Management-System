/*const Mark = require("../../modules/Mark");

const getMarks = async (req, res) => {
  try {
    const marks = await Mark.find();
    res.status(200).json(marks);
  } catch (error) {
    res.status(500).json({ message: "Error fetching marks" });
  }
};

module.exports = { getMarks }; */

const Mark = require('../../modules/Mark');

// GET marks by studentId
const getStudentMarks = async (req, res) => {
  const { studentId } = req.params;

  try {
    const marks = await Mark.findOne({ studentId });

    if (!marks) {
      return res.status(404).json({ message: 'Marks not found for this student.' });
    }

    res.status(200).json(marks);
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

// OPTIONAL: Add sample mark entry (useful for testing)
const addStudentMarks = async (req, res) => {
  const { studentId, module, mid, quiz, assignment } = req.body;

  try {
    const existing = await Mark.findOne({ studentId });
    if (existing) return res.status(400).json({ message: 'Marks already exist for this student.' });

    const newMark = new Mark({ studentId, module, mid, quiz, assignment });
    await newMark.save();

    res.status(201).json({ message: 'Marks added successfully', data: newMark });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};

module.exports = {
  getStudentMarks,
  addStudentMarks, // optional
};


