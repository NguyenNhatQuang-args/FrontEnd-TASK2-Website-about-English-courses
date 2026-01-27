import { useState, useEffect, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { exerciseService, type Question } from '@/api';
import { CheckCircle, XCircle, ArrowRight, RotateCcw, Trophy, Loader2 } from 'lucide-react';
import './WorkBank.css';

// Word item with unique ID to handle duplicates
interface WordItem {
  id: string;
  text: string;
  originalIndex: number;
}

// Props for component
interface WorkBankProps {
  // Optional: pass questions directly instead of fetching
  questions?: Question[];
  onComplete?: (score: number, total: number) => void;
}

export default function WorkBank({ questions: propQuestions, onComplete }: WorkBankProps) {
  const { lessonId } = useParams<{ lessonId: string }>();
  const navigate = useNavigate();
  
  // Questions state
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Current question state
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answerArea, setAnswerArea] = useState<WordItem[]>([]);
  const [wordBank, setWordBank] = useState<WordItem[]>([]);
  
  // Result state
  const [isChecked, setIsChecked] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // Fetch questions on mount
  useEffect(() => {
    const fetchQuestions = async () => {
      if (propQuestions) {
        setQuestions(propQuestions);
        setLoading(false);
        return;
      }

      if (!lessonId) {
        setError('Không tìm thấy bài học');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const response = await exerciseService.getByLesson(lessonId);
        
        if (response.success && response.data) {
          // Filter only word_bank questions
          const wordBankQuestions = response.data
            .flatMap(section => section.questions || [])
            .filter(q => q.questionType === 'word_bank');
          
          if (wordBankQuestions.length === 0) {
            setError('Không có câu hỏi Word Bank trong bài học này');
          } else {
            setQuestions(wordBankQuestions);
          }
        } else {
          setError('Không thể tải câu hỏi');
        }
      } catch (err) {
        console.error('Error fetching questions:', err);
        setError('Đã xảy ra lỗi khi tải câu hỏi');
      } finally {
        setLoading(false);
      }
    };

    fetchQuestions();
  }, [lessonId, propQuestions]);

  // Initialize word bank when question changes
  useEffect(() => {
    if (questions.length > 0 && currentIndex < questions.length) {
      initializeWordBank(questions[currentIndex]);
    }
  }, [questions, currentIndex]);

  // Initialize word bank for a question
  const initializeWordBank = useCallback((question: Question) => {
    const words = question.wordBank || [];
    const wordItems: WordItem[] = words.map((word, index) => ({
      id: `word-${index}-${word.id}`,
      text: word.name,
      originalIndex: index,
    }));
    
    // Shuffle the words
    const shuffled = [...wordItems].sort(() => Math.random() - 0.5);
    
    setWordBank(shuffled);
    setAnswerArea([]);
    setIsChecked(false);
    setIsCorrect(false);
  }, []);

  // Handle clicking a word in the word bank (move to answer area)
  const handleWordBankClick = (wordItem: WordItem) => {
    if (isChecked) return; // Don't allow changes after checking
    
    setWordBank(prev => prev.filter(w => w.id !== wordItem.id));
    setAnswerArea(prev => [...prev, wordItem]);
  };

  // Handle clicking a word in the answer area (move back to word bank)
  const handleAnswerAreaClick = (wordItem: WordItem) => {
    if (isChecked) return; // Don't allow changes after checking
    
    setAnswerArea(prev => prev.filter(w => w.id !== wordItem.id));
    setWordBank(prev => {
      // Insert back at original position for better UX
      const newBank = [...prev, wordItem];
      return newBank.sort((a, b) => a.originalIndex - b.originalIndex);
    });
  };

  // Check the answer
  const handleCheck = () => {
    if (answerArea.length === 0) return;
    
    const currentQuestion = questions[currentIndex];
    const userAnswer = answerArea.map(w => {
      // Find the original word ID from wordBank
      const originalWord = currentQuestion.wordBank?.find(wb => wb.name === w.text);
      return originalWord?.id;
    }).filter(Boolean);
    
    const correctAnswer = currentQuestion.correctWordIds || [];
    
    // Check if arrays are equal
    const correct = 
      userAnswer.length === correctAnswer.length &&
      userAnswer.every((id, index) => id === correctAnswer[index]);
    
    setIsCorrect(correct);
    setIsChecked(true);
    
    if (correct) {
      setScore(prev => prev + (currentQuestion.points || 1));
    }
  };

  // Move to next question
  const handleNext = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setIsFinished(true);
      onComplete?.(score + (isCorrect ? questions[currentIndex].points || 1 : 0), questions.length);
    }
  };

  // Reset current question
  const handleReset = () => {
    if (questions[currentIndex]) {
      initializeWordBank(questions[currentIndex]);
    }
  };

  // Restart all questions
  const handleRestart = () => {
    setCurrentIndex(0);
    setScore(0);
    setIsFinished(false);
    if (questions[0]) {
      initializeWordBank(questions[0]);
    }
  };

  // Loading state
  if (loading) {
    return (
      <div className="work-bank work-bank--loading">
        <Loader2 className="animate-spin" size={48} />
        <p>Đang tải câu hỏi...</p>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="work-bank work-bank--error">
        <XCircle size={48} className="text-red-500" />
        <p>{error}</p>
        <button onClick={() => navigate(-1)} className="btn btn--secondary">
          Quay lại
        </button>
      </div>
    );
  }

  // Finished state
  if (isFinished) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="work-bank work-bank--finished">
        <div className="finished-content">
          <Trophy size={64} className={percentage >= 70 ? 'text-yellow-500' : 'text-gray-400'} />
          <h2>🎉 Hoàn thành!</h2>
          <div className="score-display">
            <span className="score-number">{score}</span>
            <span className="score-divider">/</span>
            <span className="score-total">{questions.length}</span>
          </div>
          <p className="score-percentage">
            {percentage >= 70 ? 'Xuất sắc!' : percentage >= 50 ? 'Tốt lắm!' : 'Cố gắng thêm nhé!'}
          </p>
          <div className="finished-actions">
            <button onClick={handleRestart} className="btn btn--secondary">
              <RotateCcw size={18} />
              Làm lại
            </button>
            <button onClick={() => navigate(-1)} className="btn btn--primary">
              Tiếp tục
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentIndex];

  return (
    <div className="work-bank">
      {/* Header */}
      <div className="work-bank__header">
        <div className="question-progress">
          <span>Câu {currentIndex + 1} / {questions.length}</span>
          <div className="progress-bar">
            <div 
              className="progress-fill" 
              style={{ width: `${((currentIndex) / questions.length) * 100}%` }}
            />
          </div>
        </div>
        <div className="score-badge">
          Điểm: {score}
        </div>
      </div>

      {/* Question */}
      <div className="work-bank__question">
        <p>{currentQuestion?.questionText || 'Sắp xếp các từ thành câu hoàn chỉnh:'}</p>
      </div>

      {/* Answer Area - Top row */}
      <div className={`work-bank__answer-area ${isChecked ? (isCorrect ? 'correct' : 'incorrect') : ''}`}>
        <div className="answer-label">Câu trả lời của bạn:</div>
        <div className="answer-words">
          {answerArea.length === 0 ? (
            <div className="answer-placeholder">
              Click vào các từ bên dưới để xếp câu...
            </div>
          ) : (
            answerArea.map((wordItem, index) => (
              <button
                key={wordItem.id}
                className={`word-btn word-btn--answer ${isChecked ? 'disabled' : ''}`}
                onClick={() => handleAnswerAreaClick(wordItem)}
                disabled={isChecked}
              >
                <span className="word-index">{index + 1}</span>
                {wordItem.text}
              </button>
            ))
          )}
        </div>
        
        {/* Feedback after checking */}
        {isChecked && (
          <div className={`answer-feedback ${isCorrect ? 'correct' : 'incorrect'}`}>
            {isCorrect ? (
              <>
                <CheckCircle size={20} />
                <span>Chính xác!</span>
              </>
            ) : (
              <>
                <XCircle size={20} />
                <span>Chưa đúng. Đáp án đúng: {
                  currentQuestion.correctWordIds
                    ?.map(id => currentQuestion.wordBank?.find(w => w.id === id)?.name)
                    .filter(Boolean)
                    .join(' ')
                }</span>
              </>
            )}
          </div>
        )}
      </div>

      {/* Word Bank - Bottom row */}
      <div className="work-bank__word-bank">
        <div className="word-bank-label">Ngân hàng từ:</div>
        <div className="word-bank-words">
          {wordBank.map((wordItem) => (
            <button
              key={wordItem.id}
              className={`word-btn word-btn--bank ${isChecked ? 'disabled' : ''}`}
              onClick={() => handleWordBankClick(wordItem)}
              disabled={isChecked}
            >
              {wordItem.text}
            </button>
          ))}
          {wordBank.length === 0 && answerArea.length > 0 && !isChecked && (
            <div className="word-bank-empty">
              Tất cả từ đã được chọn
            </div>
          )}
        </div>
      </div>

      {/* Actions */}
      <div className="work-bank__actions">
        {!isChecked ? (
          <>
            <button 
              onClick={handleReset} 
              className="btn btn--secondary"
              disabled={answerArea.length === 0}
            >
              <RotateCcw size={18} />
              Làm lại
            </button>
            <button 
              onClick={handleCheck} 
              className="btn btn--primary"
              disabled={answerArea.length === 0}
            >
              Kiểm tra
              <CheckCircle size={18} />
            </button>
          </>
        ) : (
          <button onClick={handleNext} className="btn btn--primary">
            {currentIndex < questions.length - 1 ? 'Câu tiếp theo' : 'Hoàn thành'}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
