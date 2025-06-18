const express =require('express');
const router = express.Router();
const upload = require('../../middleware/upload');
const { 
    addAnnouncement, 
    getAllAnnouncements, 
    downloadFile, 
    deleteAnnouncement,
    getAnnouncementById,
    updateAnnouncement
} = require('../../controllers/instructor/announcementController');

router.post('/addannouncement', upload.single('file'), addAnnouncement);
router.get('/addedannouncement', getAllAnnouncements);
router.get('/download/:id', downloadFile);
router.delete('/announcement/:id', deleteAnnouncement);
router.get('/updateannouncement/:id', getAnnouncementById);
router.put('/updateannouncement/:id', upload.single('file'), updateAnnouncement);

module.exports = router;