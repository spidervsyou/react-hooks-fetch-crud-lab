// src/components/QuestionList.js
import React, { useState, useEffect } from "react";
import QuestionItem from "./QuestionItem";

function QuestionList({ setQuestions }) {
  const [questions, setLocalQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchQuestions() {
      try {
        const response = await fetch("http://localhost:4000/questions");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setLocalQuestions(data);
        setQuestions(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchQuestions();
  }, [setQuestions]);

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:4000/questions/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete question");
      }

      setLocalQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
      setQuestions((prevQuestions) =>
        prevQuestions.filter((question) => question.id !== id)
      );
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  }

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>
        {questions.map((question) => (
          <QuestionItem
            key={question.id}
            question={question}
            onDelete={handleDelete}
          />
        ))}
      </ul>
    </section>
  );
}

export default QuestionList;
