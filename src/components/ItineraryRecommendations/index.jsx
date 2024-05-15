import React from 'react'
import './styles.css'
import lake from '../../assets/lake.png'
import { ItineraryDays } from './ItineraryDays'
import { AzureKeyCredential, OpenAIClient } from '@azure/openai'

export const ItineraryRecommendations = ({ selectedHolidayType, country, selectedMonth, selectedDuration, selectedItems, selectedBudget }) => {

  const endpoint = process.env.REACT_APP_AZURE_OPENAI_ENDPOINT;
  const azureApiKey = process.env.REACT_APP_AZURE_OPENAI_API_KEY;

  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the users choices. You need to give two itinerary recommendations based on the user's country, place, duration, budget, interests, holiday type and month. Please provide the response in the following JSON format:
    [
      {
        "place": "Place 1",
        "nights": "Number of nights 1",
        "accomodation": "Star rating of accomodation 1",
        "priceRange": "Price range per person 1",
      }, 
      {
        "place": "Place 2",
        "nights": "Number of nights 2",
        "accomodation": "Star rating of accomodation 2",
        "priceRange": "Price range per person 2",
      }
    ]`,
  };


  const handleItineraryRecommendationsRequest = async () => {
    const userMessage = {
      role: 'user',
      content: `The user has selected a ${selectedHolidayType} in ${country} for ${selectedDuration}. They want to go in the month of ${selectedMonth} with a budget of ${selectedBudget} and they are interested in the following: ${selectedItems.join(', ')}. Please provide a place in the selected country that follows the user requirements, stating how many nights, the accommodation star rating, and price range per person for this holiday. the response in the following JSON format:
    [
      {
        "place": "Place 1",
        "nights": "Number of nights 1",
        "accomodation": "Star rating of accomodation 1",
        "priceRange": "Price range per person 1",
      }, 
      {
        "place": "Place 2",
        "nights": "Number of nights 2",
        "accomodation": "Star rating of accomodation 2",
        "priceRange": "Price range per person 2",
      }
    ]`,
    }

    try {
      const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
      const deploymentId = 'gpt4';
      console.log('User selection sent to the AI');
      const messages = [systemPrompt, userMessage];
      const result = await client.getChatCompletions(deploymentId, messages);
      const itineraryRecommendations = result.choices[0].message.content;
      console.log('Itinerary Recommendations:', itineraryRecommendations)
    } catch (error) {
      console.error('Error:', error);
    }
  
  }


  return (
    <div className='itineraryRecommendationContainer'>
      <img src={lake}></img>
      <h2 className='itineraryRecommendationCountry'>{`${country}`}</h2>
      <h2 className='itineraryRecommendationPlace'>{`${selectedHolidayType}`}</h2>
      <div className='itineraryRecommendationInformation'>
        <p className='itineraryRecommendationInformationText'>Nights</p>
        <p className='itineraryRecommendationInformationText'>Star..accomodation</p>
        <p className='itineraryRecommendationInformationText'>Price range pp</p>
      </div>
      <div className='amountSavedText'>Save up to X amount of Money</div>
      <div className='itineraryText'>
        <button onClick={handleItineraryRecommendationsRequest}></button>
        <ItineraryDays />
      </div>
    </div>
  )
}
