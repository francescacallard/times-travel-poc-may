import React from 'react';
import './styles.css';

export const ItineraryDays = () => {
  return (
    <div className='itineraryDaysContainer'>
      <div className='itineraryContentContainer'>
        <h3 className='itineraryDayText'>Days</h3>
        <h2 className='itineraryTitleText'>Title</h2>
        <p className='itineraryDescriptionText'>Description</p>
      </div>
      <div>
      <button className='itinerarySelectButton'>Select</button>
    </div>
    </div>
  );
};