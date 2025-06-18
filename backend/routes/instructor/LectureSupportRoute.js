const express = require('express');
const router = express.Router();
const {
    createSupportRequest,
    getAllSupportRequests,
    getSupportRequestById,
    updateSupportRequest,
    deleteSupportRequest,
    replyToSupportRequest
} = require('../../controllers/instructor/lectureSupportController');
const multer = require('multer');
const path = require('path');
const InstructorSupport = require('../../models/Lecturesupportmodel')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/instructorsupport/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // appending extension
    }
});

const upload = multer({ storage: storage });

// Routes
router.post('/', upload.single('photo'), createSupportRequest);
router.get('/', getAllSupportRequests);
router.get('/:id', getSupportRequestById);
router.put('/:id', upload.single('photo'), updateSupportRequest); // FULL UPDATE Route
router.delete('/:id', deleteSupportRequest);
router.post('/:id/reply', replyToSupportRequest); // New route for admin replies

module.exports = router;
