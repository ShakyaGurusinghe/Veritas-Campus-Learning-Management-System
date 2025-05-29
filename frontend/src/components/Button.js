import React from "react";

const Button = ({ text, onClick }) => {
  return (
    <button
      className="btn btn-success fw-bold"
      style={{
        width: "150px",
        height: "30px",
        fontSize: "15px",
        fontFamily: "'Poppins', sans-serif",
        backgroundColor: "#95C436",
        color: "white",
        border: "1px solid #3E9355",
        borderRadius: "6px"
      }}
      onClick={onClick}
    >
      Sample Button 
    </button>
  );
};

export default Button;
