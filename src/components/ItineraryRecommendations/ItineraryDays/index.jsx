import React, { useState } from 'react';
import './styles.css';
import { AzureKeyCredential, OpenAIClient } from '@azure/openai';

export const ItineraryDays = ({ country, place, nights, accommodation, priceRange }) => {
  const [itineraryDays, setItineraryDays] = useState([]);

  const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;

  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the users choices. You need to give an itinerary based on the user's country, place, duration, budget, interests, holiday type and month. Please provide the response in a valid JSON format without any additional text.`
  };

  const handleItineraryRequest = async () => {
    const userMessage = {
      role: 'user',
      content: `The user has selected a holiday in the country of ${country} in the place of ${place} for ${nights}. They are interested in the following accommodation: ${accommodation} and have a budget of ${priceRange}. Please provide an itinerary for this holiday. The response should be in the following JSON format and should not include any other text:
      [
        {
          "Day": "Day 1",
          "Title of Day": "Title of Day 1",
          "Description of Day": "Description of Day 1"
        },
        {
          "Day": "Day 2",
          "Title of Day": "Title of Day 2",
          "Description of Day": "Description of Day 2"
        },
        {
          "Day": "Day 3",
          "Title of Day": "Title of Day 3",
          "Description of Day": "Description of Day 3"
        }
      ]
      Depending on how many days the user has selected, you will need to provide the same format for each day.`
    };

    console.log('From the Itinerary section', country, place, nights, accommodation, priceRange);

    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      const messages = [systemPrompt, userMessage];
      const result = await client.getChatCompletions(deploymentId, messages);
      const itineraryRecommendation = result.choices[0].message.content;
      console.log('Itinerary Recommendations:', itineraryRecommendation);

      // Parse the JSON response and update the state variable
      const parsedItineraryDays = JSON.parse(itineraryRecommendation);
      setItineraryDays(parsedItineraryDays);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className='itineraryDaysContainer'>
      {itineraryDays.map((day, index) => (
        <div key={index} className='itineraryContentContainer'>
          <h3 className='itineraryDayText'>{day.Day}</h3>
          <h2 className='itineraryTitleText'>{day['Title of Day']}</h2>
          <p className='itineraryDescriptionText'>{day['Description of Day']}</p>
        </div>
      ))}
      <div>
        <button className='itinerarySelectButton' onClick={handleItineraryRequest}>
          Select
        </button>
      </div>
    </div>
  );
};