import React, { useState, useEffect, useRef } from 'react';
import './styles.css';
import { DropdownMonth } from 'components/DropdownMonth';
import { Destinations } from 'components/Destinations';
import { CountrySelection } from 'components/CountrySelection';
import { HolidayTypes } from 'components/HolidayTypes';
import { ItineraryHeading } from 'components/ItineraryHeading';
import { JournalistCard } from 'components/JournalistCard';
import { journalists } from 'components/Destinations/constants';  
import { Loading } from 'components/Loading'; 
// import { OpenAIComponent } from 'components/OpenAIComponent';
import axios from 'axios';
import { TimesChat } from 'components/TimesChat';
import { Chat } from 'components/Chat';

export const ParentComponent = () => {
  const [selectedMonth, setSelectedMonth] = useState('May');
  const [selectedBudget, setSelectedBudget] = useState('');
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
  const countryHeadingRef = useRef(null);

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
      content: `The user has selected ${selectedCountry} as their destination in the month of ${selectedMonth} with a budget of ${selectedBudget} and they are interested in the following: ${selectedItems.join(', ')}. Please suggest 5 different types of holidays that would be suitable for this country, along with a brief description of each holiday type in 15 words. Please provide the response in the following JSON format:

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
      const response = await axios.post('http://localhost:5000/api/chat', { messages });
      const aiResponse = response.data.aiResponse;
      const holidayTypes = JSON.parse(aiResponse);
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

  const handleHolidaySelection = (holidayType, recommendationData) => {
    setSelectedHolidayType(holidayType);
    setRecommendationData(recommendationData);
  };

  const handleItinerarySelect = (itinerary) => {
    setSelectedItinerary(itinerary);
  };

  return (
    <div className='wholePageContainer'>
      {/* <OpenAIComponent /> */}
      <TimesChat />
      <Chat />
      <DropdownMonth
        selectedMonth={selectedMonth}
        setSelectedMonth={setSelectedMonth}
        selectedBudget={selectedBudget}
        setSelectedBudget={setSelectedBudget}
        selectedDuration={selectedDuration}
        setSelectedDuration={setSelectedDuration}
        selectedItems={selectedItems}
        setSelectedItems={setSelectedItems}
        aiResponse={aiResponse}
        setAiResponse={setAiResponse}
        setShowDestinations={setShowDestinations}
      />
      {showDestinations && (
        <Destinations
          selectedMonth={selectedMonth}
          selectedBudget={selectedBudget}
          selectedDuration={selectedDuration}
          selectedItems={selectedItems}
          aiResponse={aiResponse}
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
          selectedBudget={selectedBudget}
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
              selectedBudget={selectedBudget}
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
        <Chat />
        </div>
        </div>
    
      )}
      {isHolidayTypesLoading && <Loading />}
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
  );
};