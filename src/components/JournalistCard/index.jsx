import React from 'react';
import tickIcon from '../../assets/tickIcon.svg';
import './styles.css';

export const JournalistCard = ({ name, title, image }) => {
  return (
    <div className='journalistCard'>
      <div className='journalistIconContainer'>
        <img src={tickIcon} alt='Tick Icon' />
        <h3 className='travelGuideText'>Italy travel guide</h3>
      </div>
      <div className='journalistHeadshotContainer'>
        <img src={image} alt={name} style={{ width: '24px', height: '24px' }} />
        <h3 className='journalistName'>
          {name}, {title}
        </h3>
      </div>
    </div>
  );
};