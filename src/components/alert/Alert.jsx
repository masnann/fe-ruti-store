import React from "react";

const Alert = ({ color, message, onClose }) => {
  return (
    <div
      className={`bg-${color}-100 border-${color}-400 text-${color}-700 border rounded p-3 mb-4`}
    >
      <p>{message}</p>
      <button onClick={onClose} className={`text-${color}-700 float-right`}>
        X
      </button>
    </div>
  );
};

export default Alert;
