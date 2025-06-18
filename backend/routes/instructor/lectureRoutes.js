const express = require('express');
const router = express.Router();
const {
    addLectureMaterial,
    getAllLectureMaterials,
    getLectureMaterialsById,
    updateLectureMaterial,
    deleteLectureMaterial
} = require('../../controllers/instructor/lectureMaterialController');
const multer = require('multer');
const path = require('path');
const LectureMaterial = require('../../models/Lecture')

const storage = multer.diskStorage({
  destination: function (req, file, cb){
    cb(null, 'uploads/lecturematerial/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({storage: storage});

//routes
router.post('/lecture-material',upload.single(''), addLectureMaterial);
router.get('/',getAllLectureMaterials);
router.get('/lecture-material/course/:courseId',getLectureMaterialsById);
router.put('/:id',upload.single(''),updateLectureMaterial);
router.delete('/:id',deleteLectureMaterial);

module.exports = router;