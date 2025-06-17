// src/pages/instructor/UpdateQuiz.jsx
import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import '../../App.css';

const UpdateQuiz = () => {
  const { id } = useParams();           // grab quiz ID from URL
  const navigate = useNavigate();       // for redirect after update

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

  // 1️⃣ Fetch existing quiz on mount
  useEffect(() => {
    axios
      .get(`http://localhost:5000/api/quizzes/${id}`)
      .then((res) => {
        // convert timeLimit to HTML5 datetime-local format
        const quiz = res.data;
        const formattedQuiz = {
          ...quiz,
          timeLimit: quiz.timeLimit
            ? new Date(quiz.timeLimit).toISOString().slice(0, 16)
            : "",
        };
        setQuizData(formattedQuiz);
      })
      .catch((err) => console.error("Fetch quiz error:", err));
  }, [id]);

  // 2️⃣ Handlers (same as AddQuiz)
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      setQuizData({ ...quizData, allowMultipleAttempts: checked });
    } else {
      setQuizData({ ...quizData, [name]: value });
    }
  };

  const handleQuestionChange = (i, field, val) => {
    const qs = [...quizData.questions];
    if (field.startsWith("option")) {
      const key = field.split("_")[1];
      qs[i].options[key] = val;
    } else {
      qs[i][field] = val;
    }
    setQuizData({ ...quizData, questions: qs });
  };

  const addQuestion = () => {
    setQuizData({
      ...quizData,
      questions: [
        ...quizData.questions,
        { questionText: "", marks: "", options: { A: "", B: "", C: "", D: "" }, correctAnswer: "" },
      ],
    });
  };

  const removeQuestion = (i) => {
    const qs = quizData.questions.filter((_, idx) => idx !== i);
    setQuizData({ ...quizData, questions: qs });
  };

  // 3️⃣ Submit PUT request
  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/quizzes/${id}`, quizData);
      
      navigate("/quizlist", { state: { updated: true } });  // back to list
    } catch (err) {
      console.error("Update error:", err);
      alert("Failed to update quiz.");
    }
  };

  return (
    <>
      {/* Breadcrumb */}
      <div className="px-7 py-3" style={{ paddingLeft: "100px" }}>
        <nav aria-label="breadcrumb">
          <ol className="breadcrumb mb-0">
            <li className="breadcrumb-item"><Link to="/">Home</Link></li>
            <li className="breadcrumb-item active" aria-current="page">Update Quiz</li>
          </ol>
        </nav>
      </div>

      {/* Container */}
      <div className="container my-5 p-4 border rounded"
           style={{ borderColor: "#FFFBFB", boxShadow: "0px 2px 8px rgba(5,5,5,0.05)" }}>

        {/* Heading */}
        <div className="mb-4">
          <h2 className="fw-bold" style={{ color: "#7AC144" }}>Update Quiz</h2>
        </div>

        {/* Form */}
        <div className="p-4 border rounded mb-5">
          <div className="row g-3">
            {/* Title */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Quiz Title:</label>
              <input
                name="title"
                value={quizData.title}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Type here"
              />
            </div>
            {/* Availability */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Availability:</label>
              <input
                name="availability"
                value={quizData.availability}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Type here"
              />
            </div>
            {/* Time Limit */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Time Limit:</label>
              <input
                type="datetime-local"
                name="timeLimit"
                value={quizData.timeLimit}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            {/* Total Marks */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Total Marks:</label>
              <input
                type="number"
                name="totalMarks"
                value={quizData.totalMarks}
                onChange={handleInputChange}
                className="form-control"
                placeholder="Type here"
              />
            </div>
            {/* Multiple Attempts */}
            <div className="col-md-6">
              <label className="form-label fw-bold">Allow Multiple Attempts:</label><br />
              <input
                type="checkbox"
                name="allowMultipleAttempts"
                checked={quizData.allowMultipleAttempts}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        {/* Questions Section */}
        <div>
          <h5 className="mb-3">Add Question</h5>
          {quizData.questions.map((q, i) => (
            <div key={i} className="p-4 border rounded mb-4 position-relative">
              {/* Remove button */}
              <button
                className="btn btn-sm btn-danger position-absolute top-0 end-0"
                onClick={() => removeQuestion(i)}
                style={{ transform: "translate(50%,-50%)" }}>
                &times;
              </button>

              {/* Question Text */}
              <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-2 fw-bold" style={{ minWidth: "123px" }}>
                  Question {i + 1}:
                </label>
                <input
                  className="form-control"
                  placeholder="Type here"
                  value={q.questionText}
                  onChange={(e) => handleQuestionChange(i, "questionText", e.target.value)}
                />
              </div>

              {/* Marks */}
              <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-2 fw-bold" style={{ minWidth: "123px" }}>Marks:</label>
                <input
                  type="number"
                  className="form-control"
                  style={{ maxWidth: "500px" }}
                  placeholder="Type here"
                  value={q.marks}
                  onChange={(e) => handleQuestionChange(i, "marks", e.target.value)}
                />
              </div>

              {/* Options A/B */}
              <div className="row mb-3">
                <div className="col-md-6 d-flex align-items-center">
                  <label className="form-label me-2 fw-bold" style={{ minWidth: "123px" }}>Option A:</label>
                  <input
                    className="form-control"
                    placeholder="Type here"
                    value={q.options.A}
                    onChange={(e) => handleQuestionChange(i, "option_A", e.target.value)}
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <label className="form-label me-2 fw-bold" style={{ minWidth: "80px" }}>Option B:</label>
                  <input
                    className="form-control"
                    placeholder="Type here"
                    value={q.options.B}
                    onChange={(e) => handleQuestionChange(i, "option_B", e.target.value)}
                  />
                </div>
              </div>

              {/* Options C/D */}
              <div className="row mb-3">
                <div className="col-md-6 d-flex align-items-center">
                  <label className="form-label me-2 fw-bold" style={{ minWidth: "123px" }}>Option C:</label>
                  <input
                    className="form-control"
                    placeholder="Type here"
                    value={q.options.C}
                    onChange={(e) => handleQuestionChange(i, "option_C", e.target.value)}
                  />
                </div>
                <div className="col-md-6 d-flex align-items-center">
                  <label className="form-label me-2 fw-bold" style={{ minWidth: "80px" }}>Option D:</label>
                  <input
                    className="form-control"
                    placeholder="Type here"
                    value={q.options.D}
                    onChange={(e) => handleQuestionChange(i, "option_D", e.target.value)}
                  />
                </div>
              </div>

              {/* Correct Answer */}
              <div className="mb-3 d-flex align-items-center">
                <label className="form-label me-2 fw-bold" style={{ minWidth: "120px" }}>Correct Answer:</label>
                <input
                  className="form-control"
                  style={{ maxWidth: "500px" }}
                  placeholder="Type here"
                  value={q.correctAnswer}
                  onChange={(e) => handleQuestionChange(i, "correctAnswer", e.target.value)}
                />
              </div>
            </div>
          ))}

          {/* Add Question & Update Button */}
          <div className="d-flex justify-content-between align-items-center">
            <button
              type="button"
              className="btn btn-success fw-bold"
              onClick={addQuestion}
              style={{ backgroundColor: '#7AC144', border: 'none', padding: '10px 25px' }}
            >
              + Add More Question
            </button>

            <button
              type="button"
              className="btn btn-success fw-bold"
              onClick={handleUpdate}
              style={{ backgroundColor: '#7AC144', border: 'none', padding: '10px 25px' }}
            >
              Update
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateQuiz;
