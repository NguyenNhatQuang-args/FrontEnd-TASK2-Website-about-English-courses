import { useState } from 'react';
import './SentenceBuilder.css';

type Word = {
  id: number;
  text: string; 
};

const initialWords: Word[] = [
  { id: 1, text: 'I' },
  { id: 2, text: 'am' },
  { id: 3, text: 'learning' },
  { id: 4, text: 'English' },
];

export default function SentenceBuilder() {
  const [availableWords, setAvailableWords] = useState<Word[]>(initialWords);
  const [selectedWords, setSelectedWords] = useState<Word[]>([]);

  const handleSelectWord = (word: Word) => {
    setSelectedWords(prev => [...prev, word]);
    setAvailableWords(prev => prev.filter(w => w.id !== word.id));
  };

  const handleRemoveWord = (word: Word) => {
    setSelectedWords(prev => prev.filter(w => w.id !== word.id));
    setAvailableWords(prev => [...prev, word]);
  };

  return (
    <div className="sentence-builder">
      <h2>Sentence Builder</h2>

      {/* Selected sentence */}
      <div className="sentence-row">
        {selectedWords.length === 0 && (
          <span className="placeholder">Click words below to build a sentence</span>
        )}

        {selectedWords.map(word => (
          <button
            key={word.id}
            className="word selected"
            onClick={() => handleRemoveWord(word)}
          >
            {word.text}
          </button>
        ))}
      </div>

      {/* Available words */}
      <div className="word-list">
        {availableWords.map(word => (
          <button
            key={word.id}
            className="word"
            onClick={() => handleSelectWord(word)}
          >
            {word.text}
          </button>
        ))}
      </div>
    </div>
  );
}
