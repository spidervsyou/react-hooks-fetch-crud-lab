import React, { useState, useEffect } from 'react';
import QuestionList from './QuestionList';

const App = () => {
  const [questions, setQuestions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = () => {
    fetch('http://localhost:4000/questions')
      .then(response => response.json())
      .then(data => {
        setQuestions(data);
        setIsLoading(false);
      })
      .catch(error => console.error('Error fetching questions:', error));
  };

  const handleNewQuestionSubmit = (formData) => {
    fetch('http://localhost:4000/questions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    })
    .then(response => response.json())
    .then(newQuestion => {
      setQuestions(prevQuestions => [...prevQuestions, newQuestion]);
    })
    .catch(error => console.error('Error adding new question:', error));
  };

  const handleDeleteQuestion = (questionId) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: 'DELETE'
    })
    .then(() => {
      setQuestions(prevQuestions => prevQuestions.filter(question => question.id !== questionId));
    })
    .catch(error => console.error('Error deleting question:', error));
  };

  const handleCorrectIndexChange = (questionId, correctIndex) => {
    fetch(`http://localhost:4000/questions/${questionId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ correctIndex })
    })
    .then(() => {
      setQuestions(prevQuestions => {
        return prevQuestions.map(question => {
          if (question.id === questionId) {
            return { ...question, correctIndex };
          }
          return question;
        });
      });
    })
    .catch(error => console.error('Error updating correct index:', error));
  };

  return (
    <div>
      <h1>Quiz App</h1>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <QuestionList
          questions={questions}
          onDeleteQuestion={handleDeleteQuestion}
          onCorrectIndexChange={handleCorrectIndexChange}
        />
      )}
      {/* Render other components like NewQuestionForm */}
    </div>
  );
};

export default App;
