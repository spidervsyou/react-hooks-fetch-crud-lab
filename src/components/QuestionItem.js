// src/components/QuestionItem.js
import React from "react";

function QuestionItem({ question, onDelete }) {
  return (
    <li>
      <p>{question.prompt}</p>
      <ul>
        {question.answers.map((answer, index) => (
          <li key={index}>{answer}</li>
        ))}
      </ul>
      <button onClick={() => onDelete(question.id)}>Delete Question</button>
    </li>
  );
}

export default QuestionItem;
