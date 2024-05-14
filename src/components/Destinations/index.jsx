import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { DestinationCards } from 'components/DestinationCards';
import { JournalistCard } from 'components/JournalistCard';
import timesFavicon from '../../assets/timesFavicon.svg';
import { journalists } from './constants';
import { GenerateButton } from 'components/GenerateButton';
import { CountrySelection } from 'components/CountrySelection';

export const Destinations = ({ selectedMonth, aiResponse }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [destinations, setDestinations] = useState([]);
  const countrySelectionRef = useRef(null);

  useEffect(() => {
    if (aiResponse) {
      const countryRegex = /\b(France|Germany|Spain|Italy|Greece|Portugal|United Kingdom|Ireland|Netherlands|Belgium|Switzerland|Austria|Denmark|Sweden|Norway|Finland|Poland|Czech Republic|Hungary|Croatia|Romania|Bulgaria|Turkey|Egypt|Morocco|South Africa|United States|Canada|Mexico|Brazil|Argentina|Chile|Peru|Colombia|Australia|New Zealand|Japan|China|India|Thailand|Indonesia|Malaysia|Singapore|Philippines|Vietnam)\b/gi;
      const continentRegex = /\b(Europe|South America|Africa|North America|Asia|Oceania)\b/gi;

      const countryMatches = aiResponse.match(countryRegex);
      const continentMatches = aiResponse.match(continentRegex);

      const countries = countryMatches ? countryMatches.slice(0, 5) : [];
      const continents = continentMatches ? continentMatches.slice(0, 5) : [];

      const destinations = countries.map((country, index) => ({
        country,
        continent: continents[index],
      }));

      setDestinations(destinations);
    }
  }, [aiResponse]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  return (
    <>
      <div className='destinationContainer'>
        <div className='destinationHeadingContainer'>
          <h2 className='destinationHeading'>
            {`Great! Here are some amazing destinations for a relaxing trip in ${selectedMonth}`}
          </h2>
          <h3 className='destinationSubHeading'>
            Select any of the below destinations that are of interest to you to refine your trip, you can save your progress for later!
          </h3>
        </div>
        <div className='destinationSuggestionContainer'>
          {destinations.map((destination, index) => (
            <DestinationCards
              key={index}
              continent={destination.continent}
              country={destination.country}
              onSelect={handleCountrySelect}
            />
          ))}
        </div>
      </div>
      <div className='suggestionMessage'>
        <img src={timesFavicon} className='timesFavicon' alt='The Times Favicon' style={{ width: '16px', height: '16px' }} />
        <h3 className='suggestionHeading'>
          Suggestions created through sources from The Times and Sunday Times Journalists
        </h3>
      </div>
      <div className='journalistCardContainer'>
        {journalists.map((journalist, index) => (
          <JournalistCard key={index} name={journalist.name} title={journalist.title} image={journalist.image} />
        ))}
      </div>
      <div className='generateSaveContainer'>
        <GenerateButton />
      </div>
      <div className='selectedCountryHeadingContainer' ref={countrySelectionRef}>
        {selectedCountry && <CountrySelection country={selectedCountry} />}
      </div>
    </>
  );
};