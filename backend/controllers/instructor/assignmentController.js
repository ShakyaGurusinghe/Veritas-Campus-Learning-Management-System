const mongoose = require('mongoose');
const Assignment = require('../../models/assignmentmodel');
const Module = require('../../models/moduleModel');
const path = require('path');
const fs = require('fs');

console.log('[DEBUG-CONTROLLER] assignmentController loaded at', new Date().toISOString());

// Upload New Assignment
exports.createAssignment = async (req, res) => {
  try {
    const { moduleId } = req.params;
    const { title, description, visibility, deadline } = req.body;

    console.log('[DEBUG-CONTROLLER] createAssignment called:', {
      moduleId,
      title,
      description,
      visibility,
      deadline,
      hasFile: !!req.files?.file,
      timestamp: new Date().toISOString(),
    });

    // Log req.files
    if (req.files) {
      console.log('[DEBUG-CONTROLLER] req.files:', Object.keys(req.files).map(key => ({
        key,
        name: req.files[key].name,
        mimetype: req.files[key].mimetype,
        size: req.files[key].size,
      })));
    }

    // Validate moduleId
    if (!mongoose.isValidObjectId(moduleId)) {
      console.log(`[DEBUG-CONTROLLER] Invalid moduleId format: ${moduleId} at ${new Date().toISOString()}`);
      return res.status(400).json({ error: 'Invalid module ID format' });
    }

    const module = await Module.findById(moduleId);
    if (!module) {
      console.log(`[DEBUG-CONTROLLER] Module not found for ID: ${moduleId} at ${new Date().toISOString()}`);
      return res.status(400).json({ error: 'Module not found' });
    }

    // Validate required fields
    if (!title || !deadline) {
      console.log(`[DEBUG-CONTROLLER] Missing required fields: title=${title}, deadline=${deadline} at ${new Date().toISOString()}`);
      return res.status(400).json({ error: 'Title and deadline are required' });
    }

    // Normalize visibility
    const normalizedVisibility = visibility?.toLowerCase();
    if (!['public', 'private'].includes(normalizedVisibility)) {
      console.log(`[DEBUG-CONTROLLER] Invalid visibility: ${visibility} at ${new Date().toISOString()}`);
      return res.status(400).json({ error: 'Invalid visibility value' });
    }

    let fileUrl = '';
    if (req.files && req.files.file) {
      const file = req.files.file;
      console.log(`[DEBUG-CONTROLLER] File received: ${file.name}, Type: ${file.mimetype}, Size: ${file.size} bytes`);

      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.mimetype)) {
        console.log(`[DEBUG-CONTROLLER] Invalid file type: ${file.mimetype} at ${new Date().toISOString()}`);
        return res.status(400).json({ error: 'Invalid file type. Only PDF, JPEG, PNG allowed.' });
      }
      if (file.size > 5 * 1024 * 1024) {
        console.log(`[DEBUG-CONTROLLER] File too large: ${file.size} bytes at ${new Date().toISOString()}`);
        return res.status(400).json({ error: 'File too large. Max 5MB.' });
      }

      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(__dirname, '../../uploads', fileName);

      try {
        await file.mv(filePath);
        fileUrl = fileName;
        console.log(`[DEBUG-CONTROLLER] File uploaded: ${fileName} at ${new Date().toISOString()}`);
      } catch (fileErr) {
        console.error(`[DEBUG-CONTROLLER] File upload error: ${fileErr.message} at ${new Date().toISOString()}`);
        return res.status(500).json({ error: 'Failed to upload file', details: fileErr.message });
      }
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate)) {
      console.log(`[DEBUG-CONTROLLER] Invalid deadline: ${deadline} at ${new Date().toISOString()}`);
      return res.status(400).json({ error: 'Invalid deadline date' });
    }

    const exactDate = new Date(
      deadlineDate.getFullYear(),
      deadlineDate.getMonth(),
      deadlineDate.getDate(),
      deadlineDate.getHours(),
      deadlineDate.getMinutes()
    );

    const newAssignment = new Assignment({
      title,
      description,
      fileUrl,
      visibility: normalizedVisibility,
      deadline: exactDate,
      moduleId,
    });

    await newAssignment.save();
    console.log(`[DEBUG-CONTROLLER] Assignment saved: ${newAssignment._id} at ${new Date().toISOString()}`);
    res.status(201).json({ message: 'Assignment uploaded successfully', assignment: newAssignment });
  } catch (err) {
    console.error(`[DEBUG-CONTROLLER] createAssignment error at ${new Date().toISOString()}:`, err.stack);
    res.status(500).json({ error: 'Failed to create assignment', details: err.message });
  }
};

// Get All Assignments
exports.getAllAssignments = async (req, res) => {
  try {
    console.log('[DEBUG-CONTROLLER] getAllAssignments called at', new Date().toISOString());
    const assignments = await Assignment.find().populate('moduleId').sort({ createdAt: -1 });
    res.status(200).json(assignments);
  } catch (err) {
    console.error('[DEBUG-CONTROLLER] getAllAssignments error:', err.stack);
    res.status(500).json({ error: err.message });
  }
};

// Delete Assignment by ID
exports.deleteAssignment = async (req, res) => {
  try {
    console.log('[DEBUG-CONTROLLER] deleteAssignment called for ID:', req.params.id, 'at', new Date().toISOString());
    const assignment = await Assignment.findById(req.params.id);
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }

    // Only try to delete file if fileUrl exists and is not empty
    if (assignment.fileUrl && assignment.fileUrl.trim() !== '') {
      const filePath = path.join(__dirname, '../../uploads', assignment.fileUrl);
      console.log('[DEBUG-CONTROLLER] Attempting to delete file:', filePath);
      
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
          console.log('[DEBUG-CONTROLLER] File deleted successfully:', assignment.fileUrl);
        } catch (fileErr) {
          console.error('[DEBUG-CONTROLLER] Error deleting file:', fileErr.message);
          // Continue with assignment deletion even if file deletion fails
        }
      } else {
        console.log('[DEBUG-CONTROLLER] File not found, skipping deletion:', assignment.fileUrl);
      }
    } else {
      console.log('[DEBUG-CONTROLLER] No file associated with assignment, skipping file deletion');
    }

    await Assignment.findByIdAndDelete(req.params.id);
    console.log('[DEBUG-CONTROLLER] Assignment deleted from database:', req.params.id);
    res.status(200).json({ message: 'Assignment deleted successfully' });
  } catch (err) {
    console.error('[DEBUG-CONTROLLER] deleteAssignment error:', err.stack);
    res.status(500).json({ error: err.message });
  }
};

// Get Single Assignment
exports.getAssignmentById = async (req, res) => {
  try {
    console.log('[DEBUG-CONTROLLER] getAssignmentById called for ID:', req.params.id, 'at', new Date().toISOString());
    const assignment = await Assignment.findById(req.params.id).populate('moduleId');
    if (!assignment) {
      return res.status(404).json({ error: 'Assignment not found' });
    }
    res.status(200).json(assignment);
  } catch (err) {
    console.error('[DEBUG-CONTROLLER] getAssignmentById error:', err.stack);
    res.status(500).json({ error: err.message });
  }
};

// Update Assignment
exports.updateAssignment = async (req, res) => {
  try {
    console.log('[DEBUG-CONTROLLER] updateAssignment called for ID:', req.params.id, 'at', new Date().toISOString());
    const { title, description, visibility, deadline } = req.body;

    const normalizedVisibility = visibility?.toLowerCase();
    if (!['public', 'private'].includes(normalizedVisibility)) {
      return res.status(400).json({ error: 'Invalid visibility value' });
    }

    const deadlineDate = new Date(deadline);
    if (isNaN(deadlineDate)) {
      return res.status(400).json({ error: 'Invalid deadline date' });
    }

    const exactDate = new Date(
      deadlineDate.getFullYear(),
      deadlineDate.getMonth(),
      deadlineDate.getDate(),
      deadlineDate.getHours(),
      deadlineDate.getMinutes()
    );

    let updatedFields = {
      title,
      description,
      visibility: normalizedVisibility,
      deadline: exactDate,
    };

    if (req.files && req.files.file) {
      const assignment = await Assignment.findById(req.params.id);
      if (!assignment) return res.status(404).json({ error: 'Assignment not found' });

      // Delete old file if it exists
      if (assignment.fileUrl && assignment.fileUrl.trim() !== '') {
        const oldPath = path.join(__dirname, '../../uploads', assignment.fileUrl);
        if (fs.existsSync(oldPath)) {
          try {
            fs.unlinkSync(oldPath);
            console.log('[DEBUG-CONTROLLER] Old file deleted:', assignment.fileUrl);
          } catch (fileErr) {
            console.error('[DEBUG-CONTROLLER] Error deleting old file:', fileErr.message);
            // Continue with update even if old file deletion fails
          }
        }
      }

      const file = req.files.file;
      if (!['application/pdf', 'image/jpeg', 'image/png'].includes(file.mimetype)) {
        return res.status(400).json({ error: 'Invalid file type. Only PDF, JPEG, PNG allowed.' });
      }
      if (file.size > 5 * 1024 * 1024) {
        return res.status(400).json({ error: 'File too large. Max 5MB.' });
      }

      const fileName = `${Date.now()}_${file.name}`;
      const filePath = path.join(__dirname, '../../uploads', fileName);
      await file.mv(filePath);
      updatedFields.fileUrl = fileName;
      console.log('[DEBUG-CONTROLLER] New file uploaded:', fileName);
    }

    const updatedAssignment = await Assignment.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    if (!updatedAssignment) return res.status(404).json({ error: 'Assignment not found' });

    res.status(200).json({ message: 'Assignment updated successfully', assignment: updatedAssignment });
  } catch (err) {
    console.error('[DEBUG-CONTROLLER] updateAssignment error:', err.stack);
    res.status(500).json({ error: err.message });
  }
};