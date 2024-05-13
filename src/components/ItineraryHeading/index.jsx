import React from 'react';
import './styles.css';

export const ItineraryHeading = ({ selectedHolidayType }) => {
  return (
    <div className='ItineraryHeadingContainer'>
      <h3 className='ItineraryHeadingText'>{`AI Response for ${selectedHolidayType}`}</h3>
      <p className='ItineraryHeadingDescription'>
        This is a description of the AI response where it will talk about the itineraries of the trip chosen
      </p>
    </div>
  );
};