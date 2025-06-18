const mongoose = require('mongoose');

const assignmentSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: false },
  fileUrl: { type: String, required: false },
  visibility: { type: String, enum: ['public', 'private'], required: true },
  deadline: { type: Date, required: true },
  moduleId: { type: mongoose.Schema.Types.ObjectId, ref: 'Module', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Assignment', assignmentSchema);