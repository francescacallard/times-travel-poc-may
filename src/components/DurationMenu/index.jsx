import React, { useState } from 'react';
import './styles.css';

export const DurationMenu = ({ onDurationChange }) => {
  const [selectedDuration, setSelectedDuration] = useState(null);

  const handleDurationClick = (duration) => {
    setSelectedDuration(duration);
    onDurationChange(duration);
  };

  return (
    <div className='buttonContainer'>
      <button
        className={`button ${selectedDuration === '4 - 5 days' ? 'active' : ''}`}
        onClick={() => handleDurationClick('4 - 5 days')}
      >
        4 - 5 days
      </button>
      <button
        className={`button ${selectedDuration === '7 days' ? 'active' : ''}`}
        onClick={() => handleDurationClick('7 days')}
      >
        7 days
      </button>
      <button
        className={`button ${selectedDuration === '14 days' ? 'active' : ''}`}
        onClick={() => handleDurationClick('14 days')}
      >
        14 days
      </button>
      <button
        className={`button ${selectedDuration === 'More' ? 'active' : ''}`}
        onClick={() => handleDurationClick('More')}
      >
        More
      </button>
    </div>
  );
};