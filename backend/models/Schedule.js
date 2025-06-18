const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
    subjectCode: String,
    subject: String,
    time: String,
    location: String,
    status: String,
    data: Date,
    instructor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Instructor'
    }
});
module.exports = mongoose.model('Schedule',scheduleSchema);