import { useState } from 'react'
import './WorkBank.css'

type Question = {
  id: number
  words: string[]
  correctAnswer: string
}

const QUESTIONS: Question[] = [
  {
    id: 1,
    words: ['I', 'am', 'learning', 'English'],
    correctAnswer: 'I am learning English',
  },
  {
    id: 2,
    words: ['She', 'likes', 'coffee'],
    correctAnswer: 'She likes coffee',
  },
]

export default function WorkBank() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedWords, setSelectedWords] = useState<string[]>([])
  const [availableWords, setAvailableWords] = useState<string[]>(
    QUESTIONS[0].words
  )
  const [isFinished, setIsFinished] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]

  // chọn từ: dưới -> trên
  const handleSelectWord = (word: string) => {
    setSelectedWords(prev => [...prev, word])
    setAvailableWords(prev => prev.filter(w => w !== word))
  }

  // gỡ từ: trên -> dưới
  const handleRemoveWord = (word: string) => {
    setSelectedWords(prev => prev.filter(w => w !== word))
    setAvailableWords(prev => [...prev, word])
  }

  const handleCheck = () => {
    const answer = selectedWords.join(' ')

    if (answer === currentQuestion.correctAnswer) {
      alert('✅ Correct!')

      if (currentIndex < QUESTIONS.length - 1) {
        const nextIndex = currentIndex + 1
        setCurrentIndex(nextIndex)
        setSelectedWords([])
        setAvailableWords(QUESTIONS[nextIndex].words)
      } else {
        setIsFinished(true)
      }
    } else {
      alert('❌ Wrong, try again')
    }
  }

  if (isFinished) {
    return <h2>🎉 You have completed this lesson!</h2>
  }

  return (
    <div className="work-bank">
      <h2>
        Question {currentIndex + 1}/{QUESTIONS.length}
      </h2>

      {/* Hàng trên: câu trả lời */}
      <div className="answer-box">
        {selectedWords.map(word => (
          <button key={word} onClick={() => handleRemoveWord(word)}>
            {word}
          </button>
        ))}
      </div>

      {/* Hàng dưới: danh sách từ */}
      <div className="word-list">
        {availableWords.map(word => (
          <button key={word} onClick={() => handleSelectWord(word)}>
            {word}
          </button>
        ))}
      </div>

      <button className="check-btn" onClick={handleCheck}>
        Check
      </button>
    </div>
  )
}
