import React from 'react';
import './styles.css';
import image from '../../assets/rural.png';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';


export const HolidayTypes = ({
  country,
  holidayType,
  description,
  onSelect,
  selectedBudget,
  selectedDuration,
  selectedItems = [],
  selectedMonth,
}) => {
  const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;

  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the user's choices. You need to give two itinerary recommendations based on the user's country, place, duration, budget, interests, holiday type, and month. Please provide the response in the following JSON format using double quotes for both property names and values, with no other text at all:
  
  [
    {
      "place": "Place 1",
      "nights": "Number of nights 1",
      "accommodation": "Star rating of accommodation 1",
      "priceRange": "Price range per person 1",
      "itinerary": [
        {
          "day": "Day 1",
          "titleOfDay": "Title of Day 1",
          "descriptionOfDay": "Description of Day 1"
        },
        {
          "day": "Day 2",
          "titleOfDay": "Title of Day 2",
          "descriptionOfDay": "Description of Day 2"
        }
      ]
    },
    {
      "place": "Place 2",
      "nights": "Number of nights 2",
      "accommodation": "Star rating of accommodation 2",
      "priceRange": "Price range per person 2",
      "itinerary": [
        {
          "day": "Day 1",
          "titleOfDay": "Title of Day 1",
          "descriptionOfDay": "Description of Day 1"
        },
        {
          "day": "Day 2",
          "titleOfDay": "Title of Day 2",
          "descriptionOfDay": "Description of Day 2"
        }
      ]
    }
  ]
  
  Please provide the itinerary for each place based on the number of days the user has selected.`,
  };
  
  const handleItineraryRecommendationsRequest = async () => {
    console.log('This is the duration the user has selected:', selectedDuration); 
    const userMessage = {
      role: 'user',
      content: `The user has selected a ${holidayType} in ${country} for ${selectedDuration}. They want to go in the month of ${selectedMonth} with a budget of ${selectedBudget} and they are interested in the following: ${selectedItems.join(', ')}. Please provide two places in the selected country that follow the user requirements. If the user selects 14 days, the nights need to match this duration they have chosen. You need to provide the accommodation star rating and price range per person for this holiday from their chosen budget. A day-by-day itinerary for each place needs to be based on the number of days the user has selected. For nights, put the number then "nights" after, for star rating put number then "star accommodation", and for price range, put "Between" priceRange "pp". If the trip duration is 4-5 days or 7 days you need to provide an itinerary for each day. If the duration is 14 days or more, you need to provide a 7 day itinerary but by doing every other day. The response should be in the JSON format provided in the system prompt.`,

    };
  
    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      console.log('User selection sent to the AI');
      const messages = [systemPrompt, userMessage];
      const result = await client.getChatCompletions(deploymentId, messages);
      const itineraryRecommendations = result.choices[0].message.content;
      console.log('Itinerary Recommendations:', itineraryRecommendations);
      const parsedRecommendations = JSON.parse(itineraryRecommendations);
      onSelect(holidayType, parsedRecommendations);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleRegenerate = () => {
    handleItineraryRecommendationsRequest();
  }

  return (
    <div className='textImageContainerCountry'>
      <img src={image} alt={holidayType} />
      <div className='holidayTypesTextContainer'>
        <h3 className='countryHeading'>{country}</h3>
        <h2 className='holidayTypesHeading'>{holidayType}</h2>
        <p className='holidayTypesDescription'>{description}</p>
        <button className='holidayTypesButton' onClick={handleItineraryRecommendationsRequest}>
          Select
        </button>
      </div>
    </div>
   
  );
};