import React, { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaDownload, FaEdit, FaTrash, FaFilePdf } from 'react-icons/fa';
import '../css/AddedAnnouncement.css';

const AddedAnnouncement = () => {
    const [announcements, setAnnouncements] = useState([]);
    const [filter, setFilter] = useState('');
    const [expandedDescriptions, setExpandedDescriptions] = useState({});
    const [overflowingDescriptions, setOverflowingDescriptions] = useState({});
    const descriptionRefs = useRef({});
    const navigate = useNavigate();

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState(null);
    const [success, setSuccess] = useState('');

    useEffect(() => {
        fetch('http://localhost:5000/addedannouncement')
            .then(res => res.json())
            .then(data => {
                if (Array.isArray(data)) {
                    const sortedData = [...data].sort((a, b) => {
                        const timestampA = parseInt(a._id.substring(0, 8), 16) * 1000;
                        const timestampB = parseInt(b._id.substring(0, 8), 16) * 1000;
                        return timestampB - timestampA;
                    });

                    const dataWithIndex = sortedData.map((item, index) => ({
                        ...item,
                        originalIndex: index + 1
                    }));
                    setAnnouncements(dataWithIndex);
                } else {
                    setAnnouncements([]);
                }
            });
    }, []);

    const checkOverflow = () => {
        const newOverflowing = {};
        Object.keys(descriptionRefs.current).forEach(id => {
            const element = descriptionRefs.current[id];
            if (element) {
                const isOverflowing = element.scrollHeight > element.clientHeight;
                newOverflowing[id] = isOverflowing;
            }
        });
        setOverflowingDescriptions(newOverflowing);
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            checkOverflow();
        }, 100);

        return () => clearTimeout(timeoutId);
    }, [announcements]);

    useEffect(() => {
        const handleResize = () => {
            checkOverflow();
        };

        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    const handleDownload = (id, hasFile) => {
        if (hasFile) {
            window.open(`http://localhost:5000/download/${id}`, '_blank');
        }
    };

    const openDeleteModal = (id) => {
        setDeleteId(id);
        setShowDeleteModal(true);
    };

    const handleDeleteConfirmed = async (id) => {
       await fetch(`http://localhost:5000/announcement/${deleteId}`, { method: 'DELETE' });
       setAnnouncements(announcements.filter(a => a._id !== deleteId));
       setShowDeleteModal(false);
       setSuccess('Deleted Announcement Successfully');
       setTimeout(() => setSuccess(''), 5000);
    };

    const toggleDescription = (id) => {
        setExpandedDescriptions(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    const handleEdit = (id) => {
        navigate(`/updateannouncement/${id}`);
    };

    const filtered = Array.isArray(announcements)
        ? announcements.filter(a => a.title && a.title.toLowerCase().includes(filter.toLowerCase()))
        : [];

    return (
        <div className="added-announcement-container">
            <h2>Added Announcement for BM3010 - Introduction to Management</h2>
            <button onClick={() => navigate('/addannouncement')} className="add-btn">
                Add Announcement
            </button>
            <input
                type="text"
                placeholder="Filter by title"
                value={filter}
                onChange={e => setFilter(e.target.value)}
                style={{ margin: '1em 0', padding: '0.5em' }}
            />
            
            <table>
                <thead>
                    <tr>
                        <th className="center-align">Announcement ID</th>
                        <th>Announcement</th>
                        <th>Title</th>
                        <th>Description</th>
                        <th>Attached File</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {filtered.length === 0 ? (
                        <tr>
                            <td colSpan="6" style={{ textAlign: 'center', color: '#888' }}>
                                No Announcements found.
                            </td>
                        </tr>
                    ) : (
                        filtered.map((a) => (
                            <tr key={a._id}>
                                <td className="center-align">{a.originalIndex}</td>
                                <td>Announcement {a.originalIndex}</td>
                                <td>{a.title}</td>
                                <td>
                                    <div className="description-container">
                                        <div 
                                            ref={el => descriptionRefs.current[a._id] = el}
                                            className={`description-text ${expandedDescriptions[a._id] ? 'expanded' : ''}`}
                                        >
                                            {a.message}
                                        </div>
                                        {overflowingDescriptions[a._id] && (
                                            <button 
                                                className="see-more-btn"
                                                onClick={() => toggleDescription(a._id)}
                                            >
                                                {expandedDescriptions[a._id] ? 'See less' : 'See more...'}
                                            </button>
                                        )}
                                    </div>
                                </td>
                                <td className="file-column">
                                    {a.fileName ? (
                                        <div className="file-container">
                                            <FaFilePdf className="pdf-icon" />
                                            <div className="file-name">{a.fileName}</div>
                                        </div>
                                    ) : (
                                        <span className="no-file">-</span>
                                    )}
                                </td>
                                <td className="actions-column">
                                    <button 
                                        onClick={() => handleDownload(a._id, !!a.fileName)} 
                                        title="Download"
                                        className={!a.fileName ? 'disabled' : ''}
                                    >
                                        <FaDownload className="fa-download" />
                                    </button>
                                    <button 
                                        className="edit-btn" 
                                        onClick={() => handleEdit(a._id)}
                                        title="Edit"
                                    >
                                        <FaEdit className="fa-edit" />
                                    </button>
                                    <button onClick={() => openDeleteModal(a._id)} title="Delete">
                                        <FaTrash className="fa-trash" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>

            {success && (
                <div className="custom-success-message">
                    <span className="success-icon">
                        <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                            <circle cx="16" cy="16" r="16" fill="white"/>
                            <path d="M10 17L15 22L22 13" stroke="#388e3c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                    </span>
                    <span className="success-text">{success}</span>
                </div>
            )}

            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="modal-content">
                        <p style={{ fontSize: '1.3rem',marginBottom: 32 }}>
                            Are you want to Delete Announcement {announcements.find(a => a._id === deleteId)?.originalIndex}?
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'center', gap: 24 }}>
                            <button
                                className="modal-btn no-btn"
                                onClick={() => setShowDeleteModal(false)}
                            >
                                No
                            </button>
                            <button
                                className="modal-btn yes-btn"
                                onClick={handleDeleteConfirmed}
                            >
                                Yes
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AddedAnnouncement;