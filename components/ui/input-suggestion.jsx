import React from "react";

const InputSuggestion = ({ suggestion, onClick }) => {
  return (
    <div className="cursor-pointer" onClick={onClick}>
      {suggestion.description}
    </div>
  );
};

export default InputSuggestion;
