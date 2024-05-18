import React from 'react';
import './styles.css';
import lake from '../../assets/lake.png';
import night from '../../assets/night.svg';
import star from '../../assets/star.svg';
import price from '../../assets/price.svg';

export const ItineraryRecommendations = ({
  country,
  place,
  nights,
  accommodation,
  priceRange,
  itinerary,
  onSelect
}) => {

  const handleItinerarySelect = () => { 
    console.log('Itinerary Selected');
    onSelect({ place, nights, accommodation, priceRange, itinerary });
  };

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
      <div className='itineraryDaysContainer'>
      {itinerary && itinerary.map((day, index) => (
        <div key={index} className='itineraryText'>
          <h3 className='itineraryDayText'>{day.day}</h3>
          <h2 className='itineraryTitleText'>{day.titleOfDay}</h2>
          <p className='itineraryDescriptionText'>{day.descriptionOfDay}</p>
        </div>
      ))}
    
      </div>
      <button className='itinerarySelectButton' onClick={handleItinerarySelect}>Select</button>
       </div>
  );
};