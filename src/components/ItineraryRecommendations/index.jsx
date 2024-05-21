import React, { useState } from 'react';
import './styles.css';
import lake from '../../assets/lake.png';
import night from '../../assets/night.svg';
import star from '../../assets/star.svg';
import price from '../../assets/price.svg';
import { OpenAIClient, AzureKeyCredential } from '@azure/openai';
import { Loading } from 'components/Loading';

export const ItineraryRecommendations = ({
  country,
  place,
  nights,
  accommodation,
  priceRange,
  itinerary,
  onSelect,
  setIsItineraryLoading
}) => {
  const [recommendationData, setRecommendationData] = useState([]);

  const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;

  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the user's choices. You need to give to summarise the itinerary a user has chosen based on the user's country, place, duration, budget, interests, holiday type, and month. Please provide the response in the following JSON format using double quotes for both property names and values, with no other text at all:

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

  const handleItinerarySelect = async () => {
    console.log('Itinerary Selected');
    setIsItineraryLoading(true);

    const userMessage = {
      role: 'user',
      content: `The user has selected ${place}, for ${nights}, in ${accommodation} ${priceRange}. You need to summarise this itinerary in a list of bullet points. The response should be in the JSON format provided in the system prompt.`,
    };

    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      console.log('User selection sent to the AI');
      const messages = [systemPrompt, userMessage];
      const result = await client.getChatCompletions(deploymentId, messages);
      const itinerarySummary = result.choices[0].message.content;
      console.log('This is the itinerary Summary', itinerarySummary);
      const parsedRecommendations = JSON.parse(itinerarySummary);
      setRecommendationData(parsedRecommendations);
      onSelect({ place, nights, accommodation, priceRange, itinerary, recommendationData: parsedRecommendations });
      setIsItineraryLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
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