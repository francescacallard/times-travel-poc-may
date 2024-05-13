import React, { useState, useRef, useEffect } from 'react';
import './styles.css';
import { DestinationCards } from 'components/DestinationCards';
import { JournalistCard } from 'components/JournalistCard';
import timesFavicon from '../../assets/timesFavicon.svg';
import { destinations, journalists } from './constants';
import { GenerateButton } from 'components/GenerateButton';
import { CountrySelection } from 'components/CountrySelection';

export const Destinations = ({ selectedMonth }) => {
  const [selectedCountry, setSelectedCountry] = useState(null);
  const countrySelectionRef = useRef(null);
  const [ showHolidayTypes, setShowHolidayTypes ] = useState(false)

  useEffect(() => {
    if (selectedCountry) {
      countrySelectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [selectedCountry]);

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);
  };

  const handleTransportButtonClick = () => {
    setShowHolidayTypes(true)
  }

  return (
    <>
      <div className='destinationContainer'>
        <h2 className='destinationHeading'>
          {`Great! Here are some amazing destinations for a relaxing trip in ${selectedMonth}`}
        </h2>
        <h3 className='destinationSubHeading'>
          Select any of the below destinations that are of interest to you to refine your trip, you can save your progress for later!
        </h3>
        <div className='destinationSuggestionContainer'>
          {destinations.map((destination, index) => (
            <DestinationCards
              key={index}
              continent={destination.continent}
              country={destination.country}
              image={destination.image}
              onSelect={handleCountrySelect}
            />
          ))}
        </div>
      </div>
      <div className='suggestionMessage'>
        <img
          src={timesFavicon}
          className='timesFavicon'
          alt='The Times Favicon'
          style={{ width: '24px', height: '24px' }}
        />
        <h3 className='suggestionHeading'>
          Suggestions created through sources from The Times and Sunday Times Journalists
        </h3>
      </div>
      <div className='journalistCardContainer'>
        {journalists.map((journalist, index) => (
          <JournalistCard
            key={index}
            name={journalist.name}
            title={journalist.title}
            image={journalist.image}
          />
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