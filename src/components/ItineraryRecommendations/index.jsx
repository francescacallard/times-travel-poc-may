import React from 'react';
import './styles.css';
import lake from '../../assets/lake.png';
import { ItineraryDays } from './ItineraryDays';

export const ItineraryRecommendations = ({
  selectedHolidayType,
  country,
  place,
  nights,
  accommodation,
  priceRange,
}) => {
  return (
    <div className='itineraryRecommendationContainer'>
      <img src={lake} alt='Lake' />
      <h2 className='itineraryRecommendationCountry'>{country}</h2>
      <h2 className='itineraryRecommendationPlace'>{place}</h2>
      <div className='itineraryRecommendationInformation'>
        <p className='itineraryRecommendationInformationText'>{nights}</p>
        <p className='itineraryRecommendationInformationText'>{accommodation}</p>
        <p className='itineraryRecommendationInformationText'>{priceRange}</p>
      </div>
      <div className='amountSavedText'>Save up to X amount of Money</div>
      <div className='itineraryText'>
        <ItineraryDays />
      </div>
    </div>
  );
};