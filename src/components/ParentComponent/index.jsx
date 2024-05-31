import React, { useState, useEffect, useRef } from 'react';
import { useAppState } from 'useAppState';
import AppContext from 'AppContext'
import './styles.css';
import { DropdownMonth } from 'components/DropdownMonth';
import { Destinations } from 'components/Destinations';
import { CountrySelection } from 'components/CountrySelection';
import { HolidayTypes } from 'components/HolidayTypes';
import { ItineraryHeading } from 'components/ItineraryHeading';
import { JournalistCard } from 'components/JournalistCard';
import { journalists } from 'components/Destinations/constants';  
import { Loading } from 'components/Loading'; 
import axios from 'axios';
import { TimesChat } from 'components/TimesChat';
import { Chat } from 'components/Chat';

export const ParentComponent = () => {
  const {
    selectedMonth,
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
  } = useAppState();

  const countryHeadingRef = useRef(null);

  console.log("app context", AppContext)
  console.log("use app state", useAppState)
  useEffect(() => {
    // Parse the aiResponse and update the destinations array
    if (aiResponse) {
      setIsLoading(true);
      const countryRegex = /\b(Afghanistan|Albania|Algeria|Andorra|Angola|Antigua and Barbuda|Argentina|Armenia|Australia|Austria|Azerbaijan|Bahamas|Bahrain|Bangladesh|Barbados|Belarus|Belgium|Belize|Benin|Bhutan|Bolivia|Bosnia and Herzegovina|Botswana|Brazil|Brunei|Bulgaria|Burkina Faso|Burundi|Cabo Verde|Cambodia|Cameroon|Canada|Central African Republic|Chad|Chile|China|Colombia|Comoros|Congo|Costa Rica|Croatia|Cuba|Cyprus|Czech Republic|Denmark|Djibouti|Dominica|Dominican Republic|Ecuador|Egypt|El Salvador|Equatorial Guinea|Eritrea|Estonia|Eswatini|Ethiopia|Fiji|Finland|France|Gabon|Gambia|Georgia|Germany|Ghana|Greece|Grenada|Guatemala|Guinea|Guinea-Bissau|Guyana|Haiti|Honduras|Hungary|Iceland|India|Indonesia|Iran|Iraq|Ireland|Israel|Italy|Jamaica|Japan|Jordan|Kazakhstan|Kenya|Kiribati|Kosovo|Kuwait|Kyrgyzstan|Laos|Latvia|Lebanon|Lesotho|Liberia|Libya|Liechtenstein|Lithuania|Luxembourg|Madagascar|Malawi|Malaysia|Maldives|Mali|Malta|Marshall Islands|Mauritania|Mauritius|Mexico|Micronesia|Moldova|Monaco|Mongolia|Montenegro|Morocco|Mozambique|Myanmar|Namibia|Nauru|Nepal|Netherlands|New Zealand|Nicaragua|Niger|Nigeria|North Korea|North Macedonia|Norway|Oman|Pakistan|Palau|Palestine|Panama|Papua New Guinea|Paraguay|Peru|Philippines|Poland|Portugal|Qatar|Romania|Russia|Rwanda|Saint Kitts and Nevis|Saint Lucia|Saint Vincent and the Grenadines|Samoa|San Marino|Sao Tome and Principe|Saudi Arabia|Senegal|Serbia|Seychelles|Sierra Leone|Singapore|Slovakia|Slovenia|Solomon Islands|Somalia|South Africa|South Korea|South Sudan|Spain|Sri Lanka|Sudan|Suriname|Sweden|Switzerland|Syria|Taiwan|Tajikistan|Tanzania|Thailand|Timor-Leste|Togo|Tonga|Trinidad and Tobago|Tunisia|Turkey|Turkmenistan|Tuvalu|Uganda|Ukraine|United Arab Emirates|United Kingdom|United States|Uruguay|Uzbekistan|Vanuatu|Vatican City|Venezuela|Vietnam|Yemen|Zambia|Zimbabwe)\b/gi;
      const continentRegex = /\b(Europe|South America|Africa|North America|Asia|Oceania)\b/gi;

      const countryMatches = aiResponse.match(countryRegex);
      const continentMatches = aiResponse.match(continentRegex);

      const countries = countryMatches ? countryMatches.slice(0, 5) : [];
      const continents = continentMatches ? continentMatches.slice(0, 5) : [];

      const newDestinations = countries.map((country, index) => ({
        country,
        continent: continents[index],
      }));

      setDestinations(newDestinations);
      setIsLoading(false);
    }
  }, [aiResponse]);
  

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
  };

  const handleHolidayTypesAiRequest = async () => {
    setIsLoading(true);
    const systemPrompt = {
      role: 'system',
      content: `You are a travel agent that takes information based on the users choices. You need to suggest 5 different types of holidays that would be suitable for ${selectedCountry}, along with a brief description of each holiday type in 15 words.`,
    };

    const userMessage = {
      role: 'user',
      content: `The user has selected ${selectedCountry} as their destination in the month of ${selectedMonth} and they are interested in the following: ${selectedItems.join(', ')}. Please suggest 5 different types of holidays that would be suitable for this country, along with a brief description of each holiday type in 15 words. Please provide the response in the following JSON format:

    [
      {
        "holidayType": "Holiday Type 1",
        "description": "Description of Holiday Type 1"
      },
      {
        "holidayType": "Holiday Type 2",
        "description": "Description of Holiday Type 2"
      },
      {
        "holidayType": "Holiday Type 3",
        "description": "Description of Holiday Type 3"
      },
      {
        "holidayType": "Holiday Type 4",
        "description": "Description of Holiday Type 4"
      },
      {
        "holidayType": "Holiday Type 5",
        "description": "Description of Holiday Type 5"
      }
    ]`,
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
       //here i am making the holiday Types empty but should be error message
        holidayTypes = []; //set a default empty array or handle the error as needed
      }
    
      const formattedHolidayTypes = holidayTypes.map((holidayType, index) => ({
        id: index + 1,
        holidayType: holidayType.holidayType,
        description: holidayType.description,
      }));
      setHolidayTypes(formattedHolidayTypes);
      setIsLoading(false);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  const handleHolidaySelection = (holidayType, country, selectedDuration, selectedMonth, selectedItems) => {
    setSelectedHolidayType(holidayType);
    setSelectedCountry(country);
    setSelectedDuration(selectedDuration);
    setSelectedMonth(selectedMonth);
    setSelectedItems(selectedItems);
    setShowChat(true);
  };

  const handleItinerarySelect = (itinerary) => {
    setSelectedItinerary(itinerary);
  };

  const handleChatCompletion = (updatedRecommendationData) => {
    setRecommendationData(updatedRecommendationData); // Update the recommendation data
    // Trigger the display of the itinerary heading or perform any other necessary actions
  };

  return (
    <AppContext.Provider value={{
      selectedMonth,
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
    }}>
    <div className='wholePageContainer'>
      <DropdownMonth
        setShowDestinations={setShowDestinations}
      />
      {showDestinations && (
        <Destinations
          onCountrySelect={handleCountrySelect}
          onContinentSelect={handleContinentSelect}
          destinations={destinations}
        />
      )}
      {selectedCountry && (
        <>
        <CountrySelection
          country={selectedCountry}
          selectedMonth={selectedMonth}
          selectedDuration={selectedDuration}
          selectedItems={selectedItems}
          // selectedBudget={selectedBudget}
          onHolidayTypesRequest={handleHolidayTypesAiRequest}
        />
        {isLoading && <Loading />}
        </>
      )}
      {holidayTypes.length > 0 && (
        
        <div className='holidayTypesContainer'>
          {holidayTypes.map((holidayType) => (
            <HolidayTypes
              key={holidayType.id}
              country={selectedCountry}
              holidayType={holidayType.holidayType}
              description={holidayType.description}
              onSelect={handleHolidaySelection}
              selectedDuration={selectedDuration}
              selectedItems={selectedItems}
              selectedMonth={selectedMonth}
              setIsHolidayTypesLoading={setIsHolidayTypesLoading}
            />
          ))}
        </div>
      )}

      {holidayTypes.length > 0 && (
        <div className='chatContainer'>
        <div className='journalistCardContainer'>
          {journalists.map((journalist) => (
            <JournalistCard
              key={journalist.id}
              country={selectedCountry}
              name={journalist.name}
              title={journalist.title}
              image={journalist.image}
            />
          ))}
        </div>
        <div className='chatContainerInput'>
          {showChat && (
         <Chat
         selectedDuration={selectedDuration}
         selectedCountry={selectedCountry}
         selectedItems={selectedItems}
         selectedMonth={selectedMonth}
         selectedHolidayType={selectedHolidayType}
         onChatCompletion={handleChatCompletion}
       />
      )}
        </div>
        </div>
    
      )}
      {selectedHolidayType && (
        <ItineraryHeading
          selectedHolidayType={selectedHolidayType}
          country={selectedCountry}
          recommendationData={recommendationData}
          onItinerarySelect={handleItinerarySelect}
          selectedItinerary={selectedItinerary}
          setIsItineraryLoading={setIsItineraryLoading}
          />
      )}
      {isItineraryLoading && <Loading />}
    </div>
    </AppContext.Provider>
  );
};