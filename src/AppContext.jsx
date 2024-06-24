import React, { useState, useContext, createContext } from "react";
import axios from "axios";

const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedDuration, setSelectedDuration] = useState('');
  const [selectedItems, setSelectedItems] = useState([]);
  const [aiResponse, setAiResponse] = useState('');
  const [showDestinations, setShowDestinations] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState('');
  const [selectedContinent, setSelectedContinent] = useState('');
  const [destinations, setDestinations] = useState([]);
  const [holidayTypes, setHolidayTypes] = useState([]);
  const [selectedHolidayType, setSelectedHolidayType] = useState(null);
  const [recommendationData, setRecommendationData] = useState([]);
  const [selectedItinerary, setSelectedItinerary] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isHolidayTypesLoading, setIsHolidayTypesLoading] = useState(false);
  const [isItineraryLoading, setIsItineraryLoading] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleSubmitCountry = async (event) => {
    setIsLoading(true);
    const systemPrompt = {
      role: 'system',
      content: `You are a travel agent that takes information based on the users choices. You have to give 5 examples of country and continent the user could go to based on the information the user provides. You do not need to write anything else other than "1: Country, Continent 2: Country, Continent 3: Country, Continent 4: Country, Continent 5: Country, Continent"`,
    };

    const userMessage = {
      role: 'user',
      content: `The user wants to go away in the month of ${selectedMonth} for ${selectedDuration}. They are interested in the following: ${selectedItems.join(', ')}. `,
    };
    try {
    const messages = [systemPrompt, userMessage];
    const response = await axios.post('http://localhost:5000/api/chat', { messages });
    const aiResponse = response.data.aiResponse;
    console.log('AI response:', aiResponse);
    setAiResponse(aiResponse);
    setShowDestinations(true);
    setIsLoading(false);
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleHolidayTypesAiRequest = async (country) => {
  setIsLoading(true);
  const systemPrompt = {
    role: 'system',
    content: `You are a travel agent that takes information based on the users choices. You need to suggest 5 different types of holidays that would be suitable for ${country}, along with a brief description of each holiday type in 15 words. The first holiday type tile has to be beach break, but the other four need to be generated from Times Travel content. The description has to come from Times Travel content (can be found here: https://www.thetimes.com/travel) and has to be between 10 and 15 words long. You also need to give the name of the journalist (author of article) and article title where the information has come from. It needs to be only be the author name in the journalist section and article title with no other text at all. Please provide the response in the following JSON format with no other text at all:

    [
      {
        "holidayType": "Beach break",
        "description": "Description of Holiday Type 1",
        "journalist": "Name of Author",
        "articleTitle": "Title of Article",
        "country": "Country Name"
      },
      {
        "holidayType": "holiday type 2",
        "description": "Description of Holiday Type 2"
        "journalist": "Name of Author",
        "articleTitle": "Title of Article",
        "country": "Country Name"
      },
      {
        "holidayType": "holiday type 3",
        "description": "Description of Holiday Type 3",
        "journalist": "Name of Author",
        "articleTitle": "Title of Article",
        "country": "Country Name"
      },
      {
        "holidayType": "holiday type 4",
        "description": "Description of Holiday Type 4",
        "journalist": "Name of Author",
        "articleTitle": "Title of Article",
        "country": "Country Name"
      },
      {
        "holidayType": "holiday type 5",
        "description": "Description of Holiday Type 5",
        "journalist": "Name of Author",
        "articleTitle": "Title of Article",
        "country": "Country Name"
      }
    ]`,
  };

  const userMessage = {
    role: 'user',
    content: `The user has selected ${selectedCountry} as their destination in the month of ${selectedMonth} and they are interested in the following: ${selectedItems.join(', ')}. Please suggest 5 different types of holidays that would be suitable for this country, along with a brief description of each holiday type in 15 words. Your response needs to follow what the system prompt has provided.`,
  };

  try {
    const messages = [systemPrompt, userMessage];
    const response = await axios.post('http://localhost:5000/api/chat/holiday', { messages });
    const aiResponse = response.data.aiResponse;
    console.log('AI Response CHECKING WHERE ITS GOING WRONG:', aiResponse);
    let holidayTypes = [];
  
    try {
      holidayTypes = JSON.parse(aiResponse);
    } catch (parseError) {
      console.error('Error parsing AI response:', parseError);
      // setErrorMessage('Sorry, we encountered an error processing the response. Please try again.');
      setHolidayTypes([]);
      setIsLoading(false);
      return;
    }
  
    const formattedHolidayTypes = holidayTypes.map((holidayType, index) => ({
      id: index + 1,
      holidayType: holidayType.holidayType,
      description: holidayType.description,
      journalist: holidayType.journalist,
      articleTitle: holidayType.articleTitle,
      country: holidayType.country,
    }));
    setHolidayTypes(formattedHolidayTypes);
    setIsLoading(false);
    // // setErrorMessage('');
    // setTimeout(() => {
    //   scrollToCountryContainer();
    // }, 0);
  } catch (error) {
    console.error('Error:', error);
  }
};

const handleSubmitChat = async (event) => {
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
        content: `This is the second/third/fourth time the user has selected these options. Make them relevant to thier choices but pick two new places based on their requirements. The user has selected ${selectedHolidayType} in ${selectedCountry} for ${selectedDuration} in ${selectedMonth}. They are interested in ${
          selectedItems?.join(', ') || ''
        }. The user has refined their trip with the following input: ${'No additional input provided'}. Please provide the updated itineraries based on the user's preferences and the refined input.`,
      };
  
      const messages = [systemPrompt, userMessageContent];
      setIsItineraryLoading(true); 
  
      const response = await axios.post('http://localhost:5000/api/chat', { messages });
      (console.log('hit'))
      const aiResponse = response.data.aiResponse;
      const updatedRecommendationData = JSON.parse(aiResponse);

      setIsItineraryLoading(false);
      console.log('updated', updatedRecommendationData);
    } catch (error) {
      console.error('Error:', error);
      setIsItineraryLoading(false);
    }
  };


    return (
        <AppContext.Provider value={{ selectedMonth,
          setSelectedMonth,
          selectedDuration,
          setSelectedDuration,
          selectedItems,
          setSelectedItems,
          aiResponse,
          setAiResponse,
          showDestinations,
          setShowDestinations,
          selectedCountry,
          setSelectedCountry,
          selectedContinent,
          setSelectedContinent,
          destinations,
          setDestinations,
          holidayTypes,
          setHolidayTypes,
          selectedHolidayType,
          setSelectedHolidayType,
          recommendationData,
          setRecommendationData,
          selectedItinerary,
          setSelectedItinerary,
          isLoading,
          setIsLoading,
          isHolidayTypesLoading,
          setIsHolidayTypesLoading,
          isItineraryLoading,
          setIsItineraryLoading,
          showChat,
          setShowChat,
          handleSubmitCountry,
          handleHolidayTypesAiRequest,
          handleSubmitChat}}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => useContext(AppContext);