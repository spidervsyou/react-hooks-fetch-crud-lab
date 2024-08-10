// src/components/QuestionForm.js
import React, { useState, useEffect } from "react";

function QuestionForm({ onAddQuestion, onUpdateQuestion }) {
  const [formData, setFormData] = useState({
    prompt: "",
    answer1: "",
    answer2: "",
    answer3: "",
    answer4: "",
    correctIndex: 0,
  });

  function handleChange(event) {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    const newQuestion = {
      prompt: formData.prompt,
      answers: [formData.answer1, formData.answer2, formData.answer3, formData.answer4],
      correctIndex: parseInt(formData.correctIndex, 10),
    };

    // Call onAddQuestion if creating a new question
    await fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newQuestion),
    });

    if (onAddQuestion) {
      onAddQuestion(newQuestion);
    }

    // Clear form data after submission
    setFormData({
      prompt: "",
      answer1: "",
      answer2: "",
      answer3: "",
      answer4: "",
      correctIndex: 0,
    });
  }

  async function handleDropdownChange(event) {
    const updatedIndex = parseInt(event.target.value, 10);

    // Update local state
    setFormData({
      ...formData,
      correctIndex: updatedIndex,
    });

    // Send PATCH request to update the server
    await fetch(`http://localhost:4000/questions/${formData.id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ correctIndex: updatedIndex }),
    });

    // Call onUpdateQuestion if provided
    if (onUpdateQuestion) {
      onUpdateQuestion(formData.id, { correctIndex: updatedIndex });
    }
  }

  return (
    <section>
      <h1>New Question</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Prompt:
          <input
            type="text"
            name="prompt"
            value={formData.prompt}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 1:
          <input
            type="text"
            name="answer1"
            value={formData.answer1}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 2:
          <input
            type="text"
            name="answer2"
            value={formData.answer2}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 3:
          <input
            type="text"
            name="answer3"
            value={formData.answer3}
            onChange={handleChange}
          />
        </label>
        <label>
          Answer 4:
          <input
            type="text"
            name="answer4"
            value={formData.answer4}
            onChange={handleChange}
          />
        </label>
        <label>
          Correct Answer:
          <select
            name="correctIndex"
            value={formData.correctIndex}
            onChange={handleDropdownChange}
          >
            <option value="0">{formData.answer1}</option>
            <option value="1">{formData.answer2}</option>
            <option value="2">{formData.answer3}</option>
            <option value="3">{formData.answer4}</option>
          </select>
        </label>
        <button type="submit">Add Question</button>
      </form>
    </section>
  );
}

export default QuestionForm;
