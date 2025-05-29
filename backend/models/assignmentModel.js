const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date },
  module: { type: mongoose.Schema.Types.ObjectId, ref: 'Module' }, // Link to the Module model
  // Add other fields as needed (e.g., associated file URLs, points, etc.)
});

const Assignment = mongoose.model('Assignment', assignmentSchema);

module.exports = Assignment; 