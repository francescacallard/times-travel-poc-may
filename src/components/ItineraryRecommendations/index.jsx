import React from 'react';
import './styles.css';
import lake from '../../assets/lake.png';
import night from '../../assets/night.svg';
import star from '../../assets/star.svg';
import price from '../../assets/price.svg';
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
        <div className='itineraryRecommendationInformationItem'>
          <img src={night} alt='nights' />
          <p className='itineraryRecommendationInformationText'>{nights}</p>
        </div>
        <div className='itineraryRecommendationInformationItem'>
          <img src={star} alt='Star' />
          <p className='itineraryRecommendationInformationText'>{accommodation}</p>
        </div>
        <div className='itineraryRecommendationInformationItem'>
          <img src={price} alt='Price Range' />
          <p className='itineraryRecommendationInformationText'>{priceRange}</p>
        </div>
      </div>
      <div className='amountSavedText'>Save up to X amount of Money</div>
      <div className='itineraryText'>
        <ItineraryDays />
      </div>
    </div>
  );
};