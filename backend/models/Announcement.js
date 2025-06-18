const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
    title: { type: String, required: true},
    date: { type: Date, required: true},
    message: { type: String, required: true},
    fileUrl: { type: String},
    fileName: { type: String},
    visibility: { type: String, enum: ['Public', 'Private'], required: true},
});

module.exports = mongoose.model('Announcement', announcementSchema);