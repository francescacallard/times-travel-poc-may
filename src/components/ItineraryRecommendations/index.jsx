import React, { useState } from 'react';
import './styles.css';
import lake from '../../assets/lake.png';
import night from '../../assets/night.svg';
import star from '../../assets/star.svg';
import price from '../../assets/price.svg';
import greeceTrip from '../../assets/greeceTrip.jpeg';
import greeceTripTwo from '../../assets/greeceTripTwo.jpeg';
import axios from 'axios';

const images = [greeceTrip, greeceTripTwo];

export const ItineraryRecommendations = ({
  country,
  place,
  nights,
  accommodation,
  priceRange,
  itinerary,
  onSelect,
  setIsItineraryLoading,
  index
}) => {
  const [recommendationData, setRecommendationData] = useState([]);
  const [isClicked, setIsClicked] = useState(false);


  const handleItinerarySelect = async () => {
    setIsClicked(true);
    const systemPrompt = {
      role: 'system',
      content: `You are a travel agent that takes information based on the user's choices. You need to give to summarise the itinerary a user has chosen based on the user's country, place, duration, interests, holiday type, and month. Please provide the response in the following JSON format using double quotes for both property names and values, with no other text at all:
  
      [
        {
          "flights": "flight information 1",
          "transfers": "transfer information 1",
          "accommodation": "hotel/accommodation information 1",
          "inclusive": "accommodation is inclusive information 1 or accommodation is not inclusive information 1",
          "activities": "activities information 1",
          "fees": "fees information 1",
          "savings": "savings information 1"
        }
      ]`
    };
    setIsItineraryLoading(true);

    const userMessage = {
      role: 'user',
      content: `The user has selected ${place}, for ${nights}, in ${accommodation} ${priceRange}. You need to summarise this itinerary in a list of bullet points. The response should be in the JSON format provided in the system prompt.`,
    };

    try {
      const messages = [systemPrompt, userMessage];
      const response = await axios.post('http://localhost:5000/api/chat/destinations', { messages });
      const aiResponse = response.data.recommendations;
      console.log('This is the itinerary Summary', aiResponse);
      setRecommendationData(aiResponse);
      onSelect({ place, nights, accommodation, priceRange, itinerary, recommendationData: aiResponse });
      setIsItineraryLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='itineraryRecommendationContainer'>
      <img className='itineraryImages' src={images[index]} alt='Lake' />
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
      <button         className={`itinerarySelectButton ${isClicked ? 'clicked' : ''}`}
 onClick={handleItinerarySelect}>Select</button>
       </div>
       
  );
};