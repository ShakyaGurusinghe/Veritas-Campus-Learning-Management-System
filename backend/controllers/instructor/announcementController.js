const Announcement = require('../../models/Announcement');
const path = require('path');
const fs = require('fs');

exports.addAnnouncement = async (req, res) => {
    try {
        const { title, date, message, visibility } = req.body;
        let fileUrl = '';
        let fileName = '';
        if (req.file) {
            fileUrl = `/uploads/${req.file.filename}`;
            fileName = req.file.originalname;
        }

        const announcementDate = new Date(date);
        
        const announcement = new Announcement({
            title,
            date,
            message,
            fileUrl,
            fileName,
            visibility
        });
        await announcement.save();
        res.status(201).json({ message: 'Announcement added successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllAnnouncements = async (req, res) => {
    try {
        const announcements = await Announcement.find().sort({ date: -1 });
        res.json(announcements);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.downloadFile = async (req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement || !announcement.fileUrl) {
            return res.status(404).json({ error: 'File not found' });
        }
        const filePath = path.join(__dirname, '../../', announcement.fileUrl);
        res.download(filePath, announcement.fileName || 'file.pdf');
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.deleteAnnouncement = async (req, res) => {
    try {
        const announcement = await Announcement.findByIdAndDelete(req.params.id);
        if (announcement && announcement.fileUrl) {
            const filePath = path.join(__dirname, '../../', announcement.fileUrl);
            fs.unlink(filePath, () => {});
        }
        res.json({ message: 'Deleted' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAnnouncementById = async(req, res) => {
    try {
        const announcement = await Announcement.findById(req.params.id);
        if (!announcement) {
            return res.status(404).json({ error: 'Announcement not found' });
        }
        res.json(announcement);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.updateAnnouncement = async (req, res) => {
    try {
        const { title, date, message, visibility } = req.body;
        let fileUrl = undefined;
        let fileName = undefined;
        if (req.file) {
            fileUrl = `/uploads/${req.file.filename}`;
            fileName = req.file.originalname;
        }
        const updateFields = {
            title,
            date,
            message,
            visibility
        };
        if (fileUrl !== undefined) updateFields.fileUrl = fileUrl;
        if (fileName !== undefined) updateFields.fileName = fileName;
        const announcement = await Announcement.findByIdAndUpdate(
            req.params.id,
            updateFields,
            { new: true }
        );
        if (!announcement) {
            return res.status(404).json({ error: 'Announcement not found' });
        }
        res.json({ message: 'Announcement updated successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};