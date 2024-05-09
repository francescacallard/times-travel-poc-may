import React from 'react';
import './styles.css';

export const DurationMenu = ({ onDurationChange }) => {
  const handleDurationClick = (duration) => {
    onDurationChange(duration);
  };

  return (
    <div className='buttonContainer'>
      <button className='button' onClick={() => handleDurationClick('4 - 5 days')}>
        4 - 5 days
      </button>
      <button className='button' onClick={() => handleDurationClick('7 days')}>
        7 days
      </button>
      <button className='button' onClick={() => handleDurationClick('14 days')}>
        14 days
      </button>
      <button className='button' onClick={() => handleDurationClick('More')}>
        More
      </button>
    </div>
  );
};