const Lecture = require('../../models/Lecture');

const addLectureMaterial = async ( req, res) => {
  try{
    const {title, description, week, visibility, courseId, fileUrl } = req.body;
    //const
    
    const newLectureMaterial = new Lecture({
      title,
      description,
      week,
      visibility,
      courseId,
      fileUrl,
    });

    await newLectureMaterial.save();
    res.status(201).json({message: 'Lecture Meterail added Sucessfully', data: newLectureMaterial});
  } catch (error) {
    res. status(500).json({message: 'Error Cannot add Lecture Materials', error: error.message});
  }
};

const getAllLectureMaterials = async (req, res) => {
  try{
    const lectureMaterials = await Lecture.find();
    res.status(200).json(lectureMaterials);
  } catch(error) {
    res.status(500).json({message: 'Error fetching lecture materials', error: error.message});
  }
};

const getLectureMaterialsById = async (req, res) => {
  try{
    const lectureMaterial = await Lecture.findById(req.params.id);
    if(!lectureMaterial) {
      return res.status(404).json({message: 'Lecture Material Not Found'});
    }
    res.status(200).json(lectureMaterial); 
  }catch (error) {
    res.status(500).json({message: 'Error fetching lecture material', error: error.message})
  }
};

const updateLectureMaterial = async (req, res) => {
  try{
    const {title, description, week, visibility, courseId, fileUrl,} = req.body;
    //

    const updatedFields = {
      title,
      description,
      week,
      visibility,
      courseId,
      fileUrl,
    };

    //if (photo) {
      //updateLectureMaterial.photo = photo;
    //}

    const updatedLectureMaterials = await Lecture.findByIdAndUpdate(
      req.params.id,
      updatedFields,
      {new: true}
    );

    if(!updateLectureMaterial) {
      return res.status(404).json({message: 'Lecture Material not found'});
    }

    res.status(200).json({message: 'Lecture Material updated Sucessfully',data: updateLectureMaterial});
  } catch (error) {
    res.status(500).json({message: 'Error updating Lecture Material', error: error.message});
  }
};

const deleteLectureMaterial = async (req, res) => {
  try{
    const lectureMaterial = await Lecture.findByIdAndDelete(req.params.id);
    if(!lectureMaterial) {
      return res.status(404).json({message: 'Lecture Material Not Found'});
    }
    res.status(200).json({message: 'Lecture Material deleted sucessfully'});
  } catch (error) {
    res.status(500).json({message: 'Error deleting Lecture Material', error: error.message});
  }
};

module.exports = {
  addLectureMaterial,
  getAllLectureMaterials,
  getLectureMaterialsById,
  updateLectureMaterial,
  deleteLectureMaterial
};