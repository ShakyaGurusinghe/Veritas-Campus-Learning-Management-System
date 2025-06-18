const mongoose = require('mongoose');

const InstructorSupportSchema = new mongoose.Schema({
    lectureID: {
        type: String,
        required: true
    },

    lectureName: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true
    },
    contactNumber: {
        type: String,
        required: true
    },
    issue: {
        type: String,
        required: true
    },
    photo: {
        type: String // path to uploaded photo
    },
    status: {
        type: String,
        enum: ['pending', 'replied'],
        default: 'pending'
    },
    adminReply: {
        message: {
            type: String,
            default: ''
        },
        repliedAt: {
            type: Date
        },
        adminName: {
            type: String
        }
    }
}, { timestamps: true });


module.exports = mongoose.model('InstructorSupport', InstructorSupportSchema);
