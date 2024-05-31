import React from 'react';
import timesChat from '../../assets/timesChat.svg';
import './styles.css';

export const JournalistCard = ({ name, title, image, country }) => {
  return (
    <div className='journalistCard'>
      <div className='journalistIconContainer'>
        <img className='journalistTickIcon' src={timesChat} alt='Tick Icon' />
        <h3 className='travelGuideText'>{`${country} travel guide`}</h3>
      </div>
      <div className='journalistHeadshotContainer'>
        <img src={image} alt={name} style={{ width: '44px', height: '44px' }} />
        <h3 className='journalistName'>
          {name}, {title}
        </h3>
      </div>
    </div>
  );
};