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
  const [isFinished, setIsFinished] = useState(false)

  const currentQuestion = QUESTIONS[currentIndex]

  const handleSelectWord = (word: string) => {
    setSelectedWords(prev => [...prev, word])
  }

  const handleCheck = () => {
    const answer = selectedWords.join(' ')

    if (answer === currentQuestion.correctAnswer) {
      alert('✅ Correct!')

      if (currentIndex < QUESTIONS.length - 1) {
        setCurrentIndex(prev => prev + 1)
        setSelectedWords([])
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

      <div className="answer-box">
        {selectedWords.join(' ')}
      </div>

      <div className="word-list">
        {currentQuestion.words.map(word => (
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
