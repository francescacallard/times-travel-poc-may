import React from 'react';
import './styles.css';
import { ItineraryRecommendations } from 'components/ItineraryRecommendations';

export const ItineraryHeading = ({ selectedHolidayType }) => {
  return (
    <div className='itineraryHeadingContainer'>
      <h3 className='itineraryHeadingText'>{`AI Response for ${selectedHolidayType}`}</h3>
      <p className='itineraryHeadingDescription'>
        This is a description of the AI response where it will talk about the itineraries of the trip chosen
      </p>
      <div className='itineraryRecommendationsSide'>
      <ItineraryRecommendations />
      <ItineraryRecommendations />
     </div>
    </div>

  );
};