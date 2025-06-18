const Support = require('../../models/Lecturesupportmodel');

const createSupportRequest = async (req, res) => {
    try {
        const { lectureID, lectureName, title, email, contactNumber, issue } = req.body;
        const photo = req.file ? req.file.filename : null;

        const newSupport = new Support({
            lectureID,
            lectureName,
            title,
            email,
            contactNumber,
            issue,
            photo
        });

        await newSupport.save();
        res.status(201).json({ message: 'Support request created successfully', data: newSupport });
    } catch (error) {
        res.status(500).json({ message: 'Error creating support request', error: error.message });
    }
};

const getAllSupportRequests = async (req, res) => {
    try {
        const supports = await Support.find();
        res.status(200).json(supports);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching support requests', error: error.message });
    }
};

const getSupportRequestById = async (req, res) => {
    try {
        const support = await Support.findById(req.params.id);
        if (!support) {
            return res.status(404).json({ message: 'Support request not found' });
        }
        res.status(200).json(support);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching support request', error: error.message });
    }
};

const updateSupportRequest = async (req, res) => {
    try {
        const { lectureID, lectureName, title, email, contactNumber, issue } = req.body;
        const photo = req.file ? req.file.filename : null;

        const updatedFields = {
            lectureID,
            title,
            lectureName,
            email,
            contactNumber,
            issue
        };

        if (photo) {
            updatedFields.photo = photo;
        }

        const updatedSupport = await Support.findByIdAndUpdate(
            req.params.id,
            updatedFields,
            { new: true } // return updated document
        );

        if (!updatedSupport) {
            return res.status(404).json({ message: 'Support request not found' });
        }

        res.status(200).json({ message: 'Support request updated successfully', data: updatedSupport });
    } catch (error) {
        res.status(500).json({ message: 'Error updating support request', error: error.message });
    }
};

const deleteSupportRequest = async (req, res) => {
    try {
        const support = await Support.findByIdAndDelete(req.params.id);
        if (!support) {
            return res.status(404).json({ message: 'Support request not found' });
        }
        res.status(200).json({ message: 'Support request deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting support request', error: error.message });
    }
};

// New function to handle admin replies
const replyToSupportRequest = async (req, res) => {
    try {
        const { message, adminName } = req.body;
        
        if (!message || !adminName) {
            return res.status(400).json({ message: 'Reply message and admin name are required' });
        }
        
        const support = await Support.findById(req.params.id);
        
        if (!support) {
            return res.status(404).json({ message: 'Support request not found' });
        }
        
        // Update the support request with admin reply
        support.adminReply = {
            message,
            repliedAt: new Date(),
            adminName
        };
        support.status = 'replied';
        
        await support.save();
        
        res.status(200).json({ 
            message: 'Reply sent successfully', 
            data: support 
        });
    } catch (error) {
        res.status(500).json({ 
            message: 'Error sending reply', 
            error: error.message 
        });
    }
};

module.exports = {
    createSupportRequest,
    getAllSupportRequests,
    getSupportRequestById,
    updateSupportRequest,
    deleteSupportRequest,
    replyToSupportRequest
};
