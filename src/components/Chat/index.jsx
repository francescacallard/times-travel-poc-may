import React, { useState, useRef } from 'react';
import pen from '../../assets/pen.svg';
import { SetPrompts } from 'components/SetPrompts';
import './styles.css';
import axios from 'axios';
import { IoArrowUpCircle } from "react-icons/io5";


export const Chat = ({
  selectedDuration,
  selectedCountry,
  selectedItems,
  selectedMonth,
  selectedHolidayType,
  onChatCompletion,
  onSelect,
  setIsItineraryLoading,
}) => {

    const [userMessage, setUserMessage] = useState('');
    const [displayMessage, setDisplayMessage] = useState('');
    const [question, setQuestion] = useState('');
    const inputRef = useRef(null);

  // const handleInputChange = (event) => {
  //   setUserMessage(event.target.value);
  // };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const message = event.target.elements.userMessage?.value || '';
    setUserMessage(message);
    setDisplayMessage(message);
    setQuestion(message);
  
    const systemPrompt = {
      role: 'system',
      content: `You are a travel agent for the Sunday Times. Your job is to curate two itineraries for the user based on their preferences. On the website, the users can click through a series of options to choose the month, the country, the duration, their interests (items) and the type of holiday they are interested in. They are now able to type in an input field if they want to refine their trip. You need to curate two itineraries based on the user input. For example if the user chose "May", "14 days", "France" "Solo, Hiking, Nature and Scenery", "Rural Retreat", but then refined their trip to say they want to go to Italy instead, you need to curate the itineraries based on Italy and all the other user preferences such as "May", "14 days", "Solo, Hiking, Nature and Scenery", "Rural Retreat", "Italy". The place you recommend needs to be the place in the country, such as "London" or "Lake Como" etc. The nights needs to be the duration the user has selected plus the word "nights" after. The accommodation needs to be a star rating for accommodation with the words "star accommodation" after, and the priceRange needs to be in '£' with pp after the number.  All the information you give has to come specifically from The Times travel content (can be found here: https://www.thetimes.com/travel ). Please provide the response in the following JSON format using double quotes for both property names and values, with no other text at all:
      
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
        
        Please provide the itinerary for each place based on the number of days the user has selected. If the user has selected "14 days", the itinerary needs to be made for every other day, for example it would be "Day 1", "Day 3", "Day 5", "Day7", "Day 9", "Day 11", "Day 13".`,
    };
  
    try {
      const userMessageContent = {
        role: 'user',
        content: `The user has selected ${selectedHolidayType} in ${selectedCountry} for ${selectedDuration} in ${selectedMonth}. They are interested in ${
          selectedItems?.join(', ') || ''
        }. The user has refined their trip with the following input: ${message || 'No additional input provided'}. Please provide the updated itineraries based on the user's preferences and the refined input.`,
      };
  
      const messages = [systemPrompt, userMessageContent];

  
      if (inputRef.current) {
        inputRef.current.value = '';
      }

      setIsItineraryLoading(true); 
  
      const response = await axios.post('http://localhost:5000/api/chat', { messages });
      const aiResponse = response.data.aiResponse;
      const updatedRecommendationData = JSON.parse(aiResponse);
      onChatCompletion(updatedRecommendationData);
      setIsItineraryLoading(false);
      console.log('updated', updatedRecommendationData);
    } catch (error) {
      console.error('Error:', error);
      setIsItineraryLoading(false);
    }
  };

  return (
    <>
    
      <div className="userChatContainer">
        <div className="userMessageShowContainer">
          <p>{displayMessage}</p>
          <img className="penIcon" src={pen} alt="Pen Icon" />
        </div>
      </div>
      <SetPrompts />
      <div className="userInputContainer">
        <form className="userChatForm" onSubmit={handleSubmit}>
          <input
            className="userChatInput"
            type="text"
            name="userMessage"
            placeholder="Refine your trip"
            ref={inputRef}
          />
          <button  className="userSendButton" type='submit'>
          <IoArrowUpCircle size={48} color="#7D7D7D"/>
          </button>
        </form>
      </div>
      <div className="whiteBox"></div>
    </>
  );
};