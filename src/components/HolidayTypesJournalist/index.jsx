import React from 'react'
import timesChat from '../../assets/timesChat.svg';
import './styles.css';

export const HolidayTypesJournalist = ({ name, title, image, country, journalist, articleTitle }) => {
  return (
    <div className='journalistCard'>
      <div className='journalistIconContainer'>
        <img className='journalistTickIcon' src={timesChat} alt='Tick Icon' />
        <h3 className='travelGuideText'>{`${country} travel guide`}</h3>
      </div>
      <div className='journalistHeadshotContainer'>        <h3 className='journalistName'>
          {journalist}, {title}
        </h3>
        <p className='articleTitle'>{articleTitle}</p>
      </div>
    </div>
  );
};
