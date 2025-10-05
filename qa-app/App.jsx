const { useState, useEffect } = React;

// Main App Component
function App() {
  const [view, setView] = useState('user'); // 'user' or 'admin'
  const [questions, setQuestions] = useState([]);
  const [newQuestion, setNewQuestion] = useState('');
  const [deleteModal, setDeleteModal] = useState({ show: false, questionId: null });
  const [toast, setToast] = useState({ show: false, message: '' });

  // Load data from localStorage on mount
  useEffect(() => {
    const storedQuestions = localStorage.getItem('qa_questions');
    if (storedQuestions) {
      setQuestions(JSON.parse(storedQuestions));
    }
  }, []);

  // Save questions to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('qa_questions', JSON.stringify(questions));
  }, [questions]);

  // Show toast notification
  const showToast = (message) => {
    setToast({ show: true, message });
    setTimeout(() => setToast({ show: false, message: '' }), 3000);
  };

  // Add new question (Admin)
  const addQuestion = () => {
    if (!newQuestion.trim()) {
      showToast('Please enter a question');
      return;
    }
    const question = {
      id: Date.now(),
      text: newQuestion,
      answers: [],
      createdAt: new Date().toISOString()
    };
    setQuestions([...questions, question]);
    setNewQuestion('');
    showToast('Question added successfully!');
  };

  // Delete question (Admin)
  const deleteQuestion = (id) => {
    setQuestions(questions.filter(q => q.id !== id));
    setDeleteModal({ show: false, questionId: null });
    showToast('Question deleted successfully!');
  };

  // Submit answer (User)
  const submitAnswer = (questionId, answerText) => {
    if (!answerText.trim()) {
      showToast('Please enter an answer');
      return;
    }
    const answer = {
      id: Date.now(),
      text: answerText,
      submittedAt: new Date().toISOString()
    };
    setQuestions(questions.map(q => 
      q.id === questionId 
        ? { ...q, answers: [...q.answers, answer] }
        : q
    ));
    showToast('Answer submitted successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
              Q&A Platform
            </h1>
            <div className="flex gap-2 sm:gap-3">
              <button
                onClick={() => setView('user')}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  view === 'user'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                User View
              </button>
              <button
                onClick={() => setView('admin')}
                className={`px-4 sm:px-6 py-2 sm:py-2.5 rounded-full font-medium transition-all duration-300 transform hover:scale-105 ${
                  view === 'admin'
                    ? 'bg-indigo-600 text-white shadow-lg'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                Admin View
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {view === 'admin' ? (
          <AdminView
            questions={questions}
            newQuestion={newQuestion}
            setNewQuestion={setNewQuestion}
            addQuestion={addQuestion}
            setDeleteModal={setDeleteModal}
          />
        ) : (
          <UserView
            questions={questions}
            submitAnswer={submitAnswer}
          />
        )}
      </main>

      {/* Delete Confirmation Modal */}
      {deleteModal.show && (
        <DeleteModal
          onConfirm={() => deleteQuestion(deleteModal.questionId)}
          onCancel={() => setDeleteModal({ show: false, questionId: null })}
        />
      )}

      {/* Toast Notification */}
      {toast.show && (
        <Toast message={toast.message} />
      )}
    </div>
  );
}

// Admin View Component
function AdminView({ questions, newQuestion, setNewQuestion, addQuestion, setDeleteModal }) {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      addQuestion();
    }
  };

  return (
    <div className="space-y-8">
      {/* Add Question Form */}
      <div className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl">
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Add New Question
        </h2>
        <div className="space-y-4">
          <textarea
            value={newQuestion}
            onChange={(e) => setNewQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Enter your question here... (Ctrl/Cmd + Enter to submit)"
            className="w-full h-32 px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 resize-none placeholder-gray-400"
          />
          <button
            onClick={addQuestion}
            className="w-full sm:w-auto px-8 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Add Question
          </button>
        </div>
      </div>

      {/* Questions Dashboard */}
      <div>
        <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
          Questions Dashboard
        </h2>
        {questions.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
            <div className="text-gray-400 mb-4">
              <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <p className="text-gray-500 text-lg">No questions yet. Add your first question above!</p>
          </div>
        ) : (
          <div className="space-y-6">
            {questions.map((question) => (
              <div
                key={question.id}
                className="bg-white rounded-2xl shadow-lg p-6 sm:p-8 transition-all duration-300 hover:shadow-xl"
              >
                <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-4 mb-6">
                  <div className="flex-1">
                    <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2">
                      {question.text}
                    </h3>
                    <p className="text-sm text-gray-500">
                      Created: {new Date(question.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <button
                    onClick={() => setDeleteModal({ show: true, questionId: question.id })}
                    className="px-5 py-2 bg-red-500 text-white font-medium rounded-xl hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg self-start"
                  >
                    Delete
                  </button>
                </div>

                {/* Answers Section */}
                <div className="border-t-2 border-gray-100 pt-6">
                  <h4 className="text-base sm:text-lg font-semibold text-gray-700 mb-4">
                    Answers ({question.answers.length})
                  </h4>
                  {question.answers.length === 0 ? (
                    <p className="text-gray-400 italic text-sm sm:text-base">No answers yet.</p>
                  ) : (
                    <div className="space-y-4">
                      {question.answers.map((answer) => (
                        <div
                          key={answer.id}
                          className="bg-gray-50 rounded-xl p-4 sm:p-5 border border-gray-200 hover:border-indigo-200 transition-all duration-300"
                        >
                          <p className="text-gray-700 mb-2 text-sm sm:text-base">{answer.text}</p>
                          <p className="text-xs sm:text-sm text-gray-500">
                            Submitted: {new Date(answer.submittedAt).toLocaleString()}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// User View Component
function UserView({ questions, submitAnswer }) {
  const [answers, setAnswers] = useState({});

  const handleSubmit = (questionId) => {
    const answerText = answers[questionId] || '';
    submitAnswer(questionId, answerText);
    setAnswers({ ...answers, [questionId]: '' });
  };

  const handleKeyPress = (e, questionId) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      handleSubmit(questionId);
    }
  };

  return (
    <div>
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-4 sm:mb-6">
        Answer Questions
      </h2>
      {questions.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-lg p-8 sm:p-12 text-center">
          <div className="text-gray-400 mb-4">
            <svg className="w-16 h-16 sm:w-20 sm:h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <p className="text-gray-500 text-lg">No questions available yet. Check back soon!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {questions.map((question) => (
            <div
              key={question.id}
              className="bg-white rounded-2xl shadow-lg p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 flex flex-col"
            >
              <h3 className="text-lg font-semibold text-gray-800 mb-4 flex-grow">
                {question.text}
              </h3>
              <div className="space-y-3">
                <input
                  type="text"
                  value={answers[question.id] || ''}
                  onChange={(e) => setAnswers({ ...answers, [question.id]: e.target.value })}
                  onKeyPress={(e) => handleKeyPress(e, question.id)}
                  placeholder="Type your answer... (Ctrl/Cmd + Enter to submit)"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300 placeholder-gray-400 text-sm sm:text-base"
                />
                <button
                  onClick={() => handleSubmit(question.id)}
                  className="w-full px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
                >
                  Submit Answer
                </button>
              </div>
              <p className="text-xs text-gray-400 mt-3 text-center">
                {question.answers.length} {question.answers.length === 1 ? 'answer' : 'answers'}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

// Delete Confirmation Modal Component
function DeleteModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white rounded-2xl shadow-2xl p-6 sm:p-8 max-w-md w-full animate-slideUp">
        <div className="flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 mx-auto mb-4 bg-red-100 rounded-full">
          <svg className="w-6 h-6 sm:w-8 sm:h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>
        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 text-center mb-2">
          Delete Question?
        </h3>
        <p className="text-gray-600 text-center mb-6 sm:mb-8 text-sm sm:text-base">
          This will permanently delete the question and all its answers. This action cannot be undone.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onCancel}
            className="flex-1 px-6 py-3 bg-gray-200 text-gray-800 font-medium rounded-xl hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 px-6 py-3 bg-red-600 text-white font-medium rounded-xl hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-lg"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

// Toast Notification Component
function Toast({ message }) {
  return (
    <div className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 animate-slideInRight">
      <div className="bg-gray-900 text-white px-6 py-4 rounded-xl shadow-2xl flex items-center gap-3 max-w-sm">
        <div className="flex-shrink-0">
          <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        <p className="font-medium text-sm sm:text-base">{message}</p>
      </div>
    </div>
  );
}

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));

// Add custom animations to Tailwind
const style = document.createElement('style');
style.textContent = `
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
  @keyframes slideUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(100px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  .animate-fadeIn {
    animation: fadeIn 0.2s ease-out;
  }
  .animate-slideUp {
    animation: slideUp 0.3s ease-out;
  }
  .animate-slideInRight {
    animation: slideInRight 0.3s ease-out;
  }
`;
document.head.appendChild(style);