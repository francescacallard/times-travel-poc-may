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
    content: `You are a travel agent that takes information based on the users choices. You need to give two itinerary recommendations based on the user's country, place, duration, budget, interests, holiday type and month. Please provide the response in the following JSON format using double quotes for both property names and values, with no other text at all:
    [
      {
        "place": "Place 1",
        "nights": "Number of nights 1",
        "accommodation": "Star rating of accommodation 1",
        "priceRange": "Price range per person 1"
      },
      {
        "place": "Place 2",
        "nights": "Number of nights 2",
        "accommodation": "Star rating of accommodation 2",
        "priceRange": "Price range per person 2"
      }
    ]`,
  };

  const handleItineraryRecommendationsRequest = async () => {
    const userMessage = {
      role: 'user',
      content: `The user has selected a ${holidayType} in ${country} for ${selectedDuration}. They want to go in the month of ${selectedMonth} with a budget of ${selectedBudget} and they are interested in the following: ${selectedItems.join(', ')}. Please provide a place in the selected country that follows the user requirements, stating how many nights, the accommodation star rating, and price range per person for this holiday. The response should be in the following JSON format:
      [
        {
          "place": "Place 1",
          "nights": "Number of nights 1",
          "accommodation": "Star rating of accommodation 1",
          "priceRange": "Price range per person 1"
        },
        {
          "place": "Place 2",
          "nights": "Number of nights 2",
          "accommodation": "Star rating of accommodation 2",
          "priceRange": "Price range per person 2"
        }
      ]`,
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