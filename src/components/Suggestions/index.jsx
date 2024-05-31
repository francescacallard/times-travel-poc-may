import React from 'react'
import './styles.css';
import timeTick from '../../assets/timeTick.svg';

export const Suggestions = () => {
  return (
    <div className='iconContainerSuggestion'>
          <img
          src={timeTick}
          className='timesFavicon'
          alt='The Times Favicon'
          style={{ width: '16px', height: '16px' }}
        />
          Suggestions created through sources from The Times and Sunday Times Journalists
        </div>
  )
}

