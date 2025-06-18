import React, {useState, useRef} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import {useDropzone} from 'react-dropzone';
import { Alert, Spinner } from 'react-bootstrap';

const SupportForm = () => {
    const [formData, setFormData] = useState({
        lectureID: '',
        lectureName: '',
        email: '',
        contactNumber: '',
        issue: '',
        photo: null,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState('');
    const errorRef = useRef(null);
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value});
    };

    const onDrop = (acceptedFiles) => {
        setFormData({...formData, photo: acceptedFiles[0]});
    };

    const {getRootProps, getInputProps, isDragActive} = useDropzone({
        onDrop,
        accept: {
            'image/*': [],
        },
        multiple: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        setIsSubmitting(true);
        const data = new FormData();
        for (let key in formData) {
            data.append(key, formData[key]);
        }

        try{
            const response = await axios.post('http://localhost:5000/api/instructor/support', data);
            await new Promise(resolve => setTimeout(resolve, 1500));

            if(response.data){
                navigate('/support-request/success', {
                    state: {
                        lectureName: formData.lectureName,
                        requestId: response.data.data_id
                    }
                });
            }
        } catch (error) {
            setError(error.response?.data?.message || 'Error submitting support request');
            setIsSubmitting(false);
        }
    };

    return(
        <>
        {isSubmitting && (
            <div className="position-fixed top-0 start-0 w-100 h-100 d-flex flex-column justify-content-center align-items-center bg-white bg-opacity-75" style={{ zIndex: 1050 }}>
                <Spinner animation="border" variant="primary" role="status" style={{ width: '3rem', height: '3rem' }} />
                <div className="mt-3 text-primary fw-medium">Submitting your request...</div>
            </div>
        )}

            <div className="container my-5">
            <div className="mx-auto p-4 bg-white rounded shadow" style={{ maxWidth: "900px" }}>
                <h2  style={{ color: '#55B649' }}>Submit Support Request</h2>
                <p style={{ fontSize: "0.9rem" }}>Fields marked with <span className="text-danger fw-bold">*</span> are required</p>

        {error && (
            <Alert ref={errorRef} variant="danger" onClose={() => setError('')} dismissible>
                {error}
            </Alert>
        )}

        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <div className="row">
                <div className="col-md-6 mb-3">
                <div className="form-floating">
                    <input
                    id="lectureID"
                    name="lectureID"
                    className="form-control"
                    placeholder=" "
                    onChange={handleChange}
                    value={formData.lectureID}
                    disabled={isSubmitting}
                    required
                    />
                    <label htmlFor="lectureID">Lecture ID <span className="text-danger fw-bold">*</span></label>
                </div>
                </div>

                <div className="col-md-6 mb-3">
                    <div className="form-floating">
                        <input
                        id="lectureName"
                        name="lectureName"
                        className="form-control"
                        placeholder=" "
                        onChange={handleChange}
                        value={formData.lectureName}
                        disabled={isSubmitting}
                        required
                        />
                        <label htmlFor="lectureName">Lecture Name <span className="text-danger fw-bold">*</span></label>
                    </div>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-6 mb-3">
                    <div className="form-floating">
                        <input
                        type="email"
                        id="email"
                        name="email"
                        className="form-control"
                        placeholder=" "
                        onChange={handleChange}
                        value={formData.email}
                        disabled={isSubmitting}
                        required
                        />
                        <label htmlFor="email">Email <span className="text-danger fw-bold">*</span></label>
                    </div>
                    </div>

                    <div className="col-md-6 mb-3">
                    <div className="form-floating">
                        <input
                        id="contactNumber"
                        name="contactNumber"
                        className="form-control"
                        placeholder=" "
                        onChange={handleChange}
                        value={formData.contactNumber}
                        disabled={isSubmitting}
                        required
                        />
                        <label htmlFor="contactNumber">Contact Number <span className="text-danger fw-bold">*</span></label>
                    </div>
                    </div>
                </div>

                <div className="mb-4">
                    <div className="form-floating">
                    <textarea
                        id="issue"
                        name="issue"
                        className="form-control"
                        placeholder=" "
                        onChange={handleChange}
                        value={formData.issue}
                        disabled={isSubmitting}
                        style={{ height: "120px" }}
                        required
                    ></textarea>
                    <label htmlFor="issue">What's the issue? <span className="text-danger fw-bold">*</span></label>
                    </div>
                </div>

                <div className="mb-4">
                    <label className="form-label">Upload Image (Optional)</label>
                    <div
                    {...getRootProps()}
                    className={`border border-2 border-secondary rounded p-3 text-center bg-light ${isSubmitting ? 'opacity-50' : 'hover border-primary bg-white'}`}
                    style={{ cursor: isSubmitting ? 'not-allowed' : 'pointer' }}
                    >
                    <input {...getInputProps()} disabled={isSubmitting} />
                    {isDragActive ? (
                        <p className="mb-0">Drop the image here ...</p>
                    ) : formData.photo ? (
                        <p className="mb-0">{formData.photo.name}</p>
                    ) : (
                        <p className="mb-0">Drag & drop an image here, or click to choose one</p>
                    )}
                    </div>
                </div>

                <div className="d-flex justify-content-end mt-4">
                    <button
                    type="submit"
                    className="btn btn-success px-4 py-2 fw-semibold"
                    disabled={isSubmitting}
                    >
                    {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                </div>
                </form>
            </div>
            </div>

        </>
    );
};

export default SupportForm;