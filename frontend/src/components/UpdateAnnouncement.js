import React, { useState, useRef, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import '../css/AddAnnouncement.css';

const UpdateAnnouncement = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: '',
    date: null,
    hour: '',
    minute: '',
    ampm: '',
    message: '',
    visibility: 'Public',
    file: null,
  });
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef();

  useEffect(() => {
    if (success) {
      const timer = setTimeout(() => {
        setSuccess('');
      }, 5000);
      setForm({
        title: '',
        date: null,
        hour: '',
        minute: '',
        ampm: '',
        message: '',
        visibility: 'Public',
        file: null,
      });
      setFileName('');
      return () => clearTimeout(timer);
    }
  }, [success]);

  useEffect(() => {
    const fetchAnnouncementDetails = async () => {
      try {
        setLoading(true);
        const response = await fetch(`http://localhost:5000/updateannouncement/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch announcement details');
        }
        const data = await response.json();
        
        if (data) {
          // Create a new date object from the UTC date string
          const announcementDate = new Date(data.date);
          
          // Check if the date has a specific time set
          const hasTime = announcementDate.getUTCHours() !== 0 || announcementDate.getUTCMinutes() !== 0;
          
          let hour = '';
          let minute = '';
          let ampm = '';
          
          if (hasTime) {
            // Get hours and minutes in UTC
            let hours = announcementDate.getUTCHours();
            const minutes = announcementDate.getUTCMinutes();
            
            // Convert to 12-hour format
            ampm = hours >= 12 ? 'PM' : 'AM';
            hours = hours % 12;
            hours = hours ? hours : 12;
            hour = hours.toString().padStart(2, '0');
            minute = minutes.toString().padStart(2, '0');
          } else {
            // Set default time to 12.00 AM if no time is set
            hour = '12';
            minute = '00';
            ampm = 'AM';
          }

          // Create a new date object for the date picker
          const localDate = new Date(announcementDate.getUTCFullYear(), 
                                  announcementDate.getUTCMonth(), 
                                  announcementDate.getUTCDate());

          setForm({
            title: data.title || '',
            date: localDate,
            hour: hour,
            minute: minute,
            ampm: ampm,
            message: data.message || '',
            visibility: data.visibility || 'Public',
            file: null,
          });
          setFileName(data.fileName || '');
        }
      } catch (err) {
        console.error('Fetch error:', err);
        setError('Failed to load announcement details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAnnouncementDetails();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      setForm((prev) => ({
        ...prev,
        [name]: files[0],
      }));
      setFileName(files[0]?.name || '');
    } else {
      setForm((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileBoxClick = () => {
    fileInputRef.current.click();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setForm((prev) => ({
        ...prev,
        file: file,
      }));
      setFileName(file.name);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const validateTimeFields = () => {
    const { hour, minute, ampm } = form;
    if (hour || minute || ampm) {
      if (!hour || !minute || !ampm) {
        setError('Please fill in all time fields');
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateTimeFields()) {
      return;
    }

    setLoading(true);
    setSuccess('');
    setError('');
    const formData = new FormData();

    let combinedDate = form.date;

    if (form.date) {
      const date = new Date(form.date);
      if (form.hour && form.minute && form.ampm) {
        let hour = parseInt(form.hour, 10);
        if (form.ampm === 'PM' && hour !== 12) hour += 12;
        if (form.ampm === 'AM' && hour === 12) hour = 0;

        // Create UTC date to avoid timezone issues
        const utcDate = new Date(Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          hour,
          parseInt(form.minute, 10),
          0,
          0
        ));
        
        combinedDate = utcDate.toISOString();
      } else {
        // Set to midnight UTC when no time is selected
        const utcDate = new Date(Date.UTC(
          date.getFullYear(),
          date.getMonth(),
          date.getDate(),
          0,
          0,
          0,
          0
        ));
        combinedDate = utcDate.toISOString();
      }
    }

    formData.append('title', form.title);
    formData.append('date', combinedDate || '');
    formData.append('message', form.message);
    formData.append('visibility', form.visibility);
    if (form.file) formData.append('file', form.file);

    try {
      const res = await fetch(`http://localhost:5000/updateannouncement/${id}`, {
        method: 'PUT',
        body: formData,
      });

      let data = null;
      try {
        const text = await res.text();
        data = text ? JSON.parse(text) : null;
      } catch (jsonErr) {
        data = null;
      }

      if (res.ok && data && data.message) {
        setSuccess(data.message);
      } else if (data && data.error) {
        setError(data.error);
      } else if (!res.ok) {
        setError(`Server error: ${res.status}`);
      } else {
        setError('Something went wrong');
      }
    } catch (err) {
      setError('Network error');
    }

    setLoading(false);
  };

  const handleCancelFile = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setForm(prev => ({
      ...prev,
      file: null
    }));
    setFileName('');
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="add-announcement-container">
      <div className="add-announcement-title">
        Update Announcement for <span className="course-title">BM3010 - Introduction to Management</span>
      </div>
      <form className="add-announcement-form" onSubmit={handleSubmit} encType="multipart/form-data">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          name="title"
          id="title"
          value={form.title}
          onChange={handleChange}
          required
          placeholder="Type here"
        />

        <div className="date-time-row">
          <div className="date-picker-group">
            <label htmlFor="date">Date</label>
            <DatePicker
              selected={form.date}
              onChange={date => setForm(prev => ({ ...prev, date }))}
              dateFormat="yyyy-MM-dd"
              placeholderText="Select date"
              className="custom-datepicker"
              calendarClassName="calendar-popup"
              minDate={new Date()}
            />
          </div>
          <div className="time-picker-group">
            <label htmlFor="time" className="time-label">Time</label>
            <div className="time-picker-row">
              <select
                name="hour"
                value={form.hour}
                onChange={handleChange}
                className="time-picker-select"
              >
                <option value="">HH</option>
                {Array.from({ length: 12 }, (_, i) => {
                  const hour = (i + 1).toString().padStart(2, '0');
                  return <option key={hour} value={hour}>{hour}</option>;
                })}
              </select>
              <span className="time-separator">.</span>
              <select
                name="minute"
                value={form.minute}
                onChange={handleChange}
                className="time-picker-select"
              >
                <option value="">MM</option>
                {Array.from({ length: 60 }, (_, i) => {
                  const min = i.toString().padStart(2, '0');
                  return <option key={min} value={min}>{min}</option>;
                })}
              </select>
              <select
                name="ampm"
                value={form.ampm}
                onChange={handleChange}
                className="time-picker-select ampm-select"
              >
                <option value="">AM/PM</option>
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>
          </div>
        </div>

        <label htmlFor="message">Message</label>
        <textarea
          name="message"
          id="message"
          value={form.message}
          onChange={handleChange}
          required
          placeholder="Type here"
        />

        <label>Upload File</label>
        <div
          className="file-upload-box"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
        >
          <label
            className="file-upload-label"
            style={{ cursor: 'pointer' }}
          >
            <input
              ref={fileInputRef}
              name="file"
              type="file"
              style={{ display: 'none' }}
              onChange={handleChange}
            />
            <span className="file-upload-plus">+</span>
            {fileName ? (
              <div className="file-name-container">
                <span>{fileName}</span>
                <button
                  type="button"
                  className="cancel-file-btn"
                  onClick={handleCancelFile}
                >
                  ×
                </button>
              </div>
            ) : (
              <>
                <span>Select a file</span>
                <span className="file-upload-or">or Drag and drop a file here</span>
              </>
            )}
          </label>
        </div>

        <label className="visibility-label">Visibility</label>
        <div className="visibility-options">
          <label>
            <input
              type="radio"
              name="visibility"
              value="Public"
              checked={form.visibility === 'Public'}
              onChange={handleChange}
            /> Public
          </label>
          <label>
            <input
              type="radio"
              name="visibility"
              value="Private"
              checked={form.visibility === 'Private'}
              onChange={handleChange}
            /> Private
          </label>
        </div>

        <div className="button-container">
          <button 
            type="submit" 
            disabled={loading}
            className="save-publish-btn"
          >
            {loading ? 'Updating...' : 'Update'}
          </button>
        </div>        
        {success && (
          <div className="custom-success-message">
            <span className="success-icon">
              <svg width="20" height="20" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="16" fill="white" />
                <path d="M10 17L15 22L22 13" stroke="#388e3c" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </span>
            <span className="success-text">Updated Announcement Successfully</span>
          </div>
        )}
        {error && <div className="error-message">{error}</div>}
      </form>
    </div>
  );
};

export default UpdateAnnouncement; 