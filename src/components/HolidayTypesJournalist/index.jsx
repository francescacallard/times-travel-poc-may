import React from 'react'
import timesChat from '../../assets/timesChat.svg';
import './styles.css';

export const HolidayTypesJournalist = ({journalist, articleTitle }) => {
  return (
    <div className='journalistCardTwo'>
      <div className='journalistIconContainerTwo'>
        <img className='journalistTickIconTwo' src={timesChat} alt='Tick Icon' />
        <h3 className='travelGuideTextTwo'>{`${articleTitle} `}</h3>
      </div>
      <div className='journalistHeadshotContainerTwo'>
      <h3 className='journalistNameTwo'>
  {`${journalist}, travel writer for the Times.`}
  </h3>
      </div>
    </div>
  );
};

