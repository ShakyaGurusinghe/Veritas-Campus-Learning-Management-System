const Module = require('../../models/moduleModel');

// Get module details for instructor
const getModuleDetails = async (req, res) => {
  try {
    const module = await Module.findById(req.params.moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }
    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Add content to a module
const addContentToModule = async (req, res) => {
  const { moduleId } = req.params;
  const { contentType, content } = req.body; // contentType can be 'lectureMaterials', 'quizzes', etc.

  try {
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    if (!module[contentType]) {
        return res.status(400).json({ message: 'Invalid content type' });
    }

    module[contentType].push(content);
    await module.save();

    res.status(201).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update content in a module
const updateContentInModule = async (req, res) => {
  const { moduleId, contentId } = req.params;
  const { contentType, updatedContent } = req.body; // contentType and the updated content object

  try {
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    if (!module[contentType]) {
        return res.status(400).json({ message: 'Invalid content type' });
    }

    const contentItem = module[contentType].id(contentId);
    if (!contentItem) {
        return res.status(404).json({ message: 'Content item not found' });
    }

    // Update the content item properties
    Object.assign(contentItem, updatedContent);

    await module.save();

    res.status(200).json(module);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete content from a module
const deleteContentFromModule = async (req, res) => {
  const { moduleId, contentId } = req.params;
  const { contentType } = req.body; // contentType to identify which array to remove from

  try {
    const module = await Module.findById(moduleId);
    if (!module) {
      return res.status(404).json({ message: 'Module not found' });
    }

    if (!module[contentType]) {
        return res.status(400).json({ message: 'Invalid content type' });
    }

    module[contentType].id(contentId).remove();
    await module.save();

    res.status(200).json({ message: 'Content item deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getModuleDetails,
  addContentToModule,
  updateContentInModule,
  deleteContentFromModule,
}; 