import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../App.css';

const AddQuiz = () => {
  const [quizData, setQuizData] = useState({
    title: "",
    availability: "",
    timeLimit: "",
    totalMarks: "",
    allowMultipleAttempts: false,
    questions: [
      {
        questionText: "",
        marks: "",
        options: { A: "", B: "", C: "", D: "" },
        correctAnswer: "",
      },
    ],
  });

  const navigate = useNavigate(); 

  const [isPopupVisible, setIsPopupVisible] = useState(false); 

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setQuizData({ ...quizData, [name]: value });
  };

  const handleCheckboxChange = () => {
    setQuizData({ ...quizData, allowMultipleAttempts: !quizData.allowMultipleAttempts });
  };

  const handleQuestionChange = (index, field, value) => {
    const updatedQuestions = [...quizData.questions];
    if (field.startsWith("option")) {
      const optionKey = field.split("_")[1];
      updatedQuestions[index].options[optionKey] = value;
    } else {
      updatedQuestions[index][field] = value;
    }
    setQuizData({ ...quizData, questions: updatedQuestions });
  };
  

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        {
          questionText: "",
          marks: "",
          options: { A: "", B: "", C: "", D: "" },
          correctAnswer: "Enter A, B, C, or D",
        },
      ],
    });
  };

  const handleSubmit = async () => {
    // Form Validation: Check if necessary fields are filled
    if (!quizData.title || !quizData.totalMarks || quizData.questions.some(q => !q.questionText || !q.marks || !q.correctAnswer || !q.options.A || !q.options.B || !q.options.C || !q.options.D)) {
      alert("Please fill in all the required fields before submitting.");
      return; // Prevent the form submission
    }
  
    try {
      const res = await axios.post("http://localhost:5000/api/quizzes", quizData);
      
      console.log("Response:", res.data);
  
      // Reset form after successful submission
      setQuizData({
        title: "",
        availability: "",
        timeLimit: "",
        totalMarks: "",
        allowMultipleAttempts: false,
        questions: [
          {
            questionText: "",
            marks: "",
            options: { A: "", B: "", C: "", D: "" },
            correctAnswer: "",
          },
        ],
      });

      navigate("/quizlist");
  
    } catch (err) {
      console.error("Error saving quiz:", err);
      alert("Failed to save quiz.");
    }
  };
  
  

  const handlePublish = () => {
    setIsPopupVisible(true); // Show the popup
  };

  const handlePopupConfirm = () => {
    setIsPopupVisible(false); // Close the popup
    handleSubmit(); // Directly call handleSubmit without passing the event
  };
  

  const handlePopupCancel = () => {
    setIsPopupVisible(false); // Close the popup without submitting
  };

  return (
    <>
      {/* Breadcrumb Section */}
      <div className="px-7 py-3" style={{paddingLeft: "100px" }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item">
              <Link to="/">Home</Link>
            </li>
            <li className="breadcrumb-item active" aria-current="page">
              Add Quiz
            </li>
          </ol>
        </nav>
      </div>

      {/* Main Container */}
      <div className="container my-5 p-4 border rounded" style={{ borderColor: "#FFFBFB", boxShadow: "0px 2px 8px rgba(5, 5, 5, 0.05)" }}>

        {/* Page Heading */}
        <div className="mb-4">
          <h2 className="fw-bold" style={{ color: '#7AC144' }}>Add New Quiz</h2>
        </div>

        {/* Quiz Information Section */}
        <div className="p-4 border rounded mb-5">
          <div className="row g-3">
            <div className="col-md-6">
              <label className="form-labe fw-bold">Quiz Title:</label>
              <input type="text" className="form-control" placeholder="Type here" name="title" value={quizData.title} onChange={handleInputChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Availability:</label>
              <input type="text" className="form-control" placeholder="Type here" name="availability" value={quizData.availability} onChange={handleInputChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Time Limit:</label>
              <input type="datetime-local" className="form-control" name="timeLimit" value={quizData.timeLimit} onChange={handleInputChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Total Marks:</label>
              <input type="number" className="form-control" placeholder="Type here" name="totalMarks" value={quizData.totalMarks} onChange={handleInputChange} required />
            </div>
            <div className="col-md-6">
              <label className="form-label fw-bold">Allow Multiple Attempts:</label><br />
              <input type="checkbox" checked={quizData.allowMultipleAttempts} onChange={handleCheckboxChange} />
            </div>
          </div>
        </div>

        {/* Add Question Section */}
        <div>
          <h5 className="mb-3">Add Question</h5>
          {quizData.questions.map((q, idx) => (
            <div key={idx} className="p-4 border rounded mb-4">
              <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-2 fw-bold" style={{ minWidth: "123px" }}>Question {idx + 1} :</label>
                <input
                  type="text"
                  className="form-control"
                  placeholder="Type here"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(idx, "questionText", e.target.value)}
                  required
                />
              </div>
              <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-2 fw-bold" style={{ minWidth: "123px" }}>Marks      :</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ maxWidth: "500px" }}
                  placeholder="Type here"
                  value={q.marks}
                  onChange={(e) => handleQuestionChange(idx, "marks", e.target.value)}
                  required
                />
              </div>
              <div className="row mb-3">
                {/* Option A */}
                <div className="col-md-6 d-flex align-items-center">
                    <label className="form-label me-2 fw-bold" style={{ minWidth: "123px" }}>Option A :</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Type here"
                    value={q.options['A']}
                    onChange={(e) => handleQuestionChange(idx, "option_A", e.target.value)}
                    required
                    />
                </div>

                {/* Option B */}
                <div className="col-md-6 d-flex align-items-center">
                    <label className="form-label me-2 fw-bold" style={{ minWidth: "80px" }}>Option B :</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Type here"
                    value={q.options['B']}
                    onChange={(e) => handleQuestionChange(idx, "option_B", e.target.value)}
                    required
                    />
                </div>
                </div>

                <div className="row mb-3">
                {/* Option C */}
                <div className="col-md-6 d-flex align-items-center">
                    <label className="form-label me-2 fw-bold" style={{ minWidth: "123px" }}>Option C :</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Type here"
                    value={q.options['C']}
                    onChange={(e) => handleQuestionChange(idx, "option_C", e.target.value)}
                    required
                    />
                </div>

                {/* Option D */}
                <div className="col-md-6 d-flex align-items-center">
                    <label className="form-label me-2 fw-bold" style={{ minWidth: "80px" }}>Option D :</label>
                    <input
                    type="text"
                    className="form-control"
                    placeholder="Type here"
                    value={q.options['D']}
                    onChange={(e) => handleQuestionChange(idx, "option_D", e.target.value)}
                    required
                    />
                </div>
                </div>

              <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-2 fw-bold" style={{ minWidth: "120px" }}>Correct Answer:</label>
                <input
                  type="text"
                  className="form-control"
                  style={{ maxWidth: "500px" }}
                  placeholder="Enter A, B, C, or D"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(idx, "correctAnswer", e.target.value.toUpperCase())}
                  required // Convert to uppercase to ensure consistency
                />
              </div>

            </div>
          ))}

          <div className="mb-5 text-left">
            <button type="button" onClick={addQuestion} className="btn btn-success fw-bold" style={{ backgroundColor: '#7AC144', border: 'none', padding: '10px 25px' }}>
              + Add More Question
            </button>
          </div>

          <div className="d-flex justify-content-end">
            <button type="submit" onClick={handlePublish} className="btn btn-success fw-bold" style={{ backgroundColor: '#7AC144', border: 'none', padding: '10px 25px' }}>
              Save & Publish
            </button>
          </div>
        </div>

      </div>

      {/* Popup Confirmation */}
      {isPopupVisible && (
        <div className="popup-overlay">
          <div className="popup">
            <h3>Publish the Quiz?</h3>
            <div>
              <button className="btn btn-light" onClick={handlePopupCancel}>No</button>
              <button className="btn btn-success" onClick={handlePopupConfirm}>Yes</button>
            </div>
          </div>
        </div>
      )}

    </>
  );
};

export default AddQuiz;
