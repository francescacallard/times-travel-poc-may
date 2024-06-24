import React, { useState, useEffect, useRef } from 'react';
import { useApp } from 'AppContext';
import './styles.css';
import { DropdownMonth } from 'components/DropdownMonth';
import { Destinations } from 'components/Destinations';
import { CountrySelection } from 'components/CountrySelection';
import { HolidayTypes } from 'components/HolidayTypes';
import { ItineraryHeading } from 'components/ItineraryHeading';
import { HolidayTypesJournalist} from 'components/HolidayTypesJournalist';
import { Loading } from 'components/Loading'; 
import axios from 'axios';
import { Chat } from 'components/Chat';
import { IconGenerateButton } from 'components/IconGenerateButton';

export const ParentComponent = () => {
  const {
    selectedMonth,
    setSelectedMonth,
    selectedDuration,
    setSelectedDuration,
    selectedItems,
    setSelectedItems,
    aiResponse,
    showDestinations,
    setShowDestinations,
    selectedCountry,
    setSelectedCountry,
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
    setIsHolidayTypesLoading,
    isItineraryLoading,
    setIsItineraryLoading,
    showChat,
    setShowChat,
    handleSubmitCountry
  } = useApp();

  const [aiResponseReceived, setAiResponseReceived] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const chatContainerRef = useRef(null);
  const buildTripRef = useRef(null);
  const itineraryRef = useRef(null);


  useEffect(() => {
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
    handleHolidayTypesAiRequest(country);
   
  };

  const handleContinentSelect = (continent) => {
    setSelectedContinent(continent);
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
        setErrorMessage('Sorry, we encountered an error processing the response. Please try again.');
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
      setErrorMessage('');
      setTimeout(() => {
        scrollToCountryContainer();
      }, 0);
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
    scrollToChatContainer();
  };

  const handleItinerarySelect = (itinerary) => {
    setSelectedItinerary(itinerary);
   
  };

  const handleChatCompletion = (updatedRecommendationData) => {
    setRecommendationData(updatedRecommendationData);
    setAiResponseReceived(true);
    setTimeout(() => {
      scrollToItineraryContainer();
    }, 0);
  };

  const scrollToCountryContainer = () => {
    if (buildTripRef.current) {
      buildTripRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToItineraryContainer = () => {  
    if (itineraryRef.current) {
      itineraryRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }

  const scrollToChatContainer = () => {
    if (chatContainerRef.current) {
      const yOffset = -260; 
      const y = chatContainerRef.current.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({top: y, behavior: 'smooth'});
    }
  };

  return (
    <div className='wholePageContainer'>
      <DropdownMonth
        setShowDestinations={setShowDestinations}
        handleSubmitCountry={handleSubmitCountry}
      />
      {showDestinations && (
        <Destinations
          onCountrySelect={handleCountrySelect}
          onContinentSelect={handleContinentSelect}
          destinations={destinations}
          onRegenerate={handleSubmitCountry}
        />
      )}
      {selectedCountry && (
        <>
        <CountrySelection useRef={buildTripRef}
          country={selectedCountry}
          selectedMonth={selectedMonth}
          selectedDuration={selectedDuration}
          selectedItems={selectedItems}
        />
        {isLoading && <Loading />}
        </>
      )}
      {errorMessage && (
  <div className="error-message">
    <p>{errorMessage}</p>
    <button className="errorMessageButton" onClick={() => setErrorMessage('')}>Close</button>
  </div>
)}
      {holidayTypes.length > 0 && (
        
        <div className='holidayTypesContainer' ref={buildTripRef} >
          {holidayTypes.map((holidayType, index) => (
            
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
              selectedHolidayType={selectedHolidayType}
              setSelectedHolidayType={setSelectedHolidayType}
              index={index}
            />
          ))}
        </div>
      )}

      {holidayTypes.length > 0 && (
        
        <div className='chatContainer' ref={chatContainerRef}>
        <div className='journalistCardContainer'>
        {holidayTypes.slice(1).map((holidayType, index) => (
        <HolidayTypesJournalist
          // key={journalist.id}
          country={holidayType.country}
          // name={journalist.name}
          // title={journalist.title}
          // image={journalist.image}
          journalist={holidayType.journalist}
          articleTitle={holidayType.articleTitle}
        />
))}

        </div>
        <IconGenerateButton />
        <div className='chatContainerInput'>
          {showChat && (
         <Chat
         selectedDuration={selectedDuration}
         selectedCountry={selectedCountry}
         selectedItems={selectedItems}
         selectedMonth={selectedMonth}
         selectedHolidayType={selectedHolidayType}
         onChatCompletion={handleChatCompletion}
         setIsItineraryLoading={setIsItineraryLoading}
       />
      )}
        </div>
        </div>
    
      )}
      {/* {isItineraryLoading && <Loading />} */}
      <>
      <div ref={itineraryRef}>
      {aiResponseReceived && (
        <ItineraryHeading
          useRef={itineraryRef}
          selectedHolidayType={selectedHolidayType}
          country={selectedCountry}
          recommendationData={recommendationData}
          onItinerarySelect={handleItinerarySelect}
          selectedItinerary={selectedItinerary}
          setIsItineraryLoading={setIsItineraryLoading}
          />
      )}
      </div>
      </>
      {isItineraryLoading && <Loading />}
    </div>
  );
};